
import Layout from '../components/ListLayout';
import Header from '../components/Header';
import LogoutBar from '../components/LogoutBar';
import { Table, Alert } from 'reactstrap';
import { withApollo } from '../helpers/apollo'
import redirect from '../helpers/redirect'
import checkLoggedIn from '../helpers/checkLoggedIn'
import gql from 'graphql-tag';
import { useQuery} from '@apollo/react-hooks';

const GET_USER_ADDRESS_LIST =  gql`
query GetAddress ($user_id: ID! ) {
  allUserAddresses(where: {user_id : {id :$user_id} }){
    street,
    address1,
    address2,
    suburb,
    town,
    user_id {
      id
    }
    
  }
}
`

const Addresses = ({loggedInUser}) => {


try {

  let variables = { variables: { user_id: loggedInUser.id }}
  const { loading, error, data } = useQuery(GET_USER_ADDRESS_LIST, variables )
 
  if (loading) console.log('gql Loading...');
  if (error) console.log( 'gql fetch address error', error);

  return( <Layout>
                <LogoutBar username={loggedInUser.name} />               
                <Header title="My Addresses"/>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Street</th>
                      <th>Address1</th>
                      <th>Address2</th>
                      <th>Suburb</th>
                      <th>Town</th>
                    </tr>
                  </thead>
                   <tbody>
                     {
                        data && data.allUserAddresses.length > 0 ?

                            (  data.allUserAddresses.map(details => 
                                (
                                  <tr key={details.id}>
                                    <td>{details.street}</td>
                                    <td>{details.address1}</td>
                                    <td>{details.address2}</td>
                                    <td>{details.suburb}</td>
                                    <td>{details.town}</td>
                                </tr>
                                )  ) 
                            ) : (
                                <tr>
                                  <td colSpan="5"><h4>User Has no addresses in list</h4></td>
                                </tr>
                              )
                        }        
                                                    
                    </tbody>
                </Table>
            </Layout>
);

  } catch(e) {

    return (
      <Layout>
        <Header title="You are Logged Out"/>
            <Alert color="danger">
            Login again here <a href="/index">login page</a>
          </Alert>
      </Layout>
    )
  }
}


Addresses.getInitialProps = async context => {

  const auth = await checkLoggedIn(context.apolloClient)

  if (!auth.hasOwnProperty('loggedInUser')) {

     return redirect(context, `/index?rdr-time=${Date.now()}`);
  } else {

    const { loggedInUser } = auth;
    return { loggedInUser } ;
  }

 
  
};

export default withApollo(Addresses);