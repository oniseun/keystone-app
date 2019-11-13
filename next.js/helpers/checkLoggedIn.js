import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query currentUser{
          authenticatedUser{
          id,
            name
          }
        }
      `,
    })
    .then( ({ data } )=> {

      alert(JSON.stringify(data));

      return { loggedInUser: data.authenticatedUser }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })

    /**
     * {"authenticatedUser":{"id":"1","name":"Admin","__typename":"User"}}
     */