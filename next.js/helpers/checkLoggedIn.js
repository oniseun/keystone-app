import gql from 'graphql-tag'

export default apolloClient => 
  new Promise((resolve, reject) => { apolloClient
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

      return resolve( { loggedInUser: data.authenticatedUser })
    })
    .catch(() => {
      // Fail gracefully
      return reject({  })
    })
  });

    /**
     * {"authenticatedUser":{"id":"1","name":"Admin","__typename":"User"}}
     */