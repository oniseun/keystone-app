
import gql from 'graphql-tag';
import { useQuery} from '@apollo/react-hooks';

const GET_ADDRESS =  gql`
query GetAddress {
    allUserAddresses{
      street,
      address1,
      address2,
      suburb,
      town
      
    }
  }
`;
const getUserAdresses = () => {


    return new Promise((resolve, reject) => {
      const onCompleted = data => {
        alert(JSON.stringify(data));
    
        return resolve(data.allUserAddresses);
    
      }
    
      const onError = error => {
        alert(JSON.stringify(error));
        return reject(error);
      }
    
      const { loading, error, data } = useQuery(GET_ADDRESS, {
        variables: { },
        onCompleted,
        onError
      });

      loading();
    
    });

 }

export default getUserAdresses;