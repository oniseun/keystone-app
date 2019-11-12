import { Jumbotron, Button } from 'reactstrap';
const Header = (props) => (
    <div>
    <Jumbotron>
        <h1 className="display-3">
            <center>
              {props.title}
            </center>
        </h1>  
    </Jumbotron>
  </div>
)

export default Header;