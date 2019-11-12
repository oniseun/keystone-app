
import Layout from '../components/ListLayout';
import Header from '../components/Header';
import { Table } from 'reactstrap';
import fetch from 'isomorphic-unfetch';
import ADDRESS_LIST from '../graphql/user_address_list'
const Addresses = props => (
<Layout>
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

      {props.addressList.map(data => (
          <tr>
          <td>{data.street}</td>
          <td>{data.address1}</td>
          <td>{data.address2}</td>
          <td>{data.suburb}</td>
          <td>{data.town}</td>
        </tr>
      ))}
 
        
        
      </tbody>
    </Table>
</Layout>
);


Addresses.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/admin/api',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ADDRESS_LIST,
    })
  });
  const data = await res.json();

  return {
    addressList: data.data.allUserAddresses
  };
};

export default Addresses;