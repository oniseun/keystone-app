import React from 'react'
import PropTypes from 'prop-types'
import cookie from 'cookie'
import Head from 'next/head'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch';


export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState, { getToken })
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`

    // Add some prop types
    WithApollo.propTypes = {
      // Used for getDataFromTree rendering
      apolloClient: PropTypes.object,
      // Used for client/server rendering
      apolloState: PropTypes.object,
    }
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.apolloClient = initApolloClient(
        {},
        {
          getToken: () => getToken(ctx.req),
        }
      ))

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {}

      // Only on the server
      if (typeof window === 'undefined') { 
        
        if (ctx.res && ctx.res.finished) {
          return {}
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            console.error('Error while running `getDataFromTree`', error)
          }
        }

        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState,
      }
    }
  }

  return WithApollo
}

let apolloClient = null


function initApolloClient(...args) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(...args)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(...args)
  }

  return apolloClient
}

function createApolloClient(initialState = {}, { getToken }) {
  const fetchOptions = {}

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      fetchOptions.agent = new (require('https-proxy-agent'))(
        process.env.https_proxy
      )
    }
  }

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/admin/api', 
    credentials: 'same-origin',
    fetch,
    fetchOptions,
  })

  const authLink = setContext((request, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
  })
}

function getToken(req) {
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie)
  return cookies.token
}
