
import Layout from '../components/ListLayout';
import Header from '../components/Header';
import { Table } from 'reactstrap';
import { withApollo } from '../helpers/apollo'
import redirect from '../helpers/redirect'
import checkLoggedIn from '../helpers/checkLoggedIn'
import gql from 'graphql-tag';
import { useQuery} from '@apollo/react-hooks';

const GET_ADDRESS =  gql`
query GetAddress {
    allUserAddresses{
      id,
      street,
      address1,
      address2,
      suburb,
      town
      
    }
  }
`

const Addresses = () => {
  //let variables = { variables: { user_id: props.loggedInUser.id }}
  const { loading, error, data } = useQuery(GET_ADDRESS )
 
  if (loading) console.log('gql Loading...');
  if (error) console.log( 'gql', error);
  if(data) console.log('gql json data',JSON.stringify(data));

  return( <Layout>
                <p className="bg-info clearfix" style={{ padding: '.5rem' }}>
                  <button className="btn btn-danger float-right">Logout</button>
                </p>                
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

                            (
                              data.allUserAddresses.map(details => 
                                (
                                  <tr key={details.id}>
                                    <td>{details.street}</td>
                                    <td>{details.address1}</td>
                                    <td>{details.address2}</td>
                                    <td>{details.suburb}</td>
                                    <td>{details.town}</td>
                                </tr>
                                )
                              ) 
                            ) :

                              (
                                <tr>
                                  <td colSpan="5"><h4>User Has no addresses in list</h4></td>
                                </tr>
                              )
                        }        
                                                    
                    </tbody>
                </Table>
            </Layout>
);
}


Addresses.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (!loggedInUser.id) {

   // return redirect(context, '/index?rdrfromaddress');


   //const addressList = await getUserAdresses();
    return {
    
    };

  } else {
    //const addressList = await getUserAdresses();
    return {
     //loggedInUser
    };
  }

  
};

export default withApollo(Addresses);