
import Layout from '../components/FormLayout';
import Header from '../components/Header';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => (
<Layout>
    <Header title="Login Page"/>
    <Form>
    <FormGroup>
        <Label for="bs_email">Email</Label>
        <Input type="email" name="email" id="bs_email" placeholder="" size="lg"/>
      </FormGroup>
      <FormGroup>
        <Label for="bs_pwd">Password</Label>
        <Input type="password" name="password" id="bs_pwd" placeholder="" size="lg"/>
      </FormGroup>
      <br/>
      <Button size="lg" color="primary" block>Login</Button>
    </Form>
</Layout>
);

export default Login;