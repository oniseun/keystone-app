
const ADDRESS_QUERY =   `
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

export default ADDRESS_QUERY;