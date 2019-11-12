import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';


const Layout = props => (
    <Container>
    <Row>
        <Col sm="12" md={{ size: 12 }}>
            <br/><br/><br/>
            {props.children}
        </Col>
    </Row>
  </Container>
);

export default Layout;