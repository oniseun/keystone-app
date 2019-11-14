import gql from 'graphql-tag'

export default apolloClient => apolloClient
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

      return data.authenticatedUser !== null ? { loggedInUser: data.authenticatedUser } : {};
    })
    .catch(() => {
      return {} ;
    })
  

    /**
     * {"authenticatedUser":{"id":"1","name":"Admin","__typename":"User"}}
     */