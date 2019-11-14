import { Button } from 'reactstrap';
import { useApolloClient} from '@apollo/react-hooks';
import cookie from 'cookie';
import redirect from 'nextjs-redirect'



const LogoutBar = (props) => {

    const client = useApolloClient();
    
    const signOut = () => {
  
    
        document.cookie = cookie.serialize('token', '', {
          maxAge: -1, 
        });
        
        client.clearStore().then(() => {

          redirect( `/index?logout=${Date.now()}`)
        })

      }

      return (
        <p className="bg-dark clearfix" style={{ padding: '.5rem' }}>                  
        <Button className="btn btn-info float-left">Logged in as: (<strong>{props.username}</strong>)</Button>
        <Button className="btn btn-danger float-right" onClick={signOut}>Sign Out</Button> 
     </p>   
    )

}

export default LogoutBar;