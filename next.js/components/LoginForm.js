
import Layout from '../components/FormLayout';
import Header from '../components/Header';
import { Button, Form, FormGroup, Label, Input,Alert, Spinner } from 'reactstrap';
import { useRef } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../helpers/redirect'

const LOGIN_QUERY = gql`

mutation AuthUser($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password){
    token,
        item {
        id,
        name
    }
   
   }
}`;


const LoginForm = () => {

  const client = useApolloClient();

  const onCompleted = data => {   

    // Store the token in cookie
    document.cookie = cookie.serialize('token', data.authenticateUserWithPassword.token, {
      sameSite: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    client.cache.reset().then(() => {
      setTimeout(() => {

      redirect({}, '/addresses')
      }, 2000)
    })
  }

  const onError = error => {
    console.error(JSON.stringify(error))
  }

  const [signinUser, { data, error }] = useMutation(LOGIN_QUERY, {
    onCompleted,
    onError,
  })


  const email = useRef(null)
  const password = useRef(null)

  return  (<Layout>
        <Header title="Login Page"/>
        {error && 
            <Alert color="danger">
            Incorrect username or password
          </Alert>}
          {data && 
            <Alert color="success">
            Logged in successfully , please wait... <Spinner color="success" /> 
          </Alert>}
        <Form onSubmit={e => {
            e.preventDefault();

            signinUser({
              variables: {
                email: email.current.value,
                password: password.current.value,
              },
            })
            

            email.current.value = password.current.value = ''
          }}>
        <FormGroup>
            <Label for="bs_email">Email</Label>
            
            <Input innerRef={email} type="email" name="email" id="bs_email" placeholder="" bsSize="lg"  />
          </FormGroup>
          <FormGroup>
            <Label for="bs_pwd">Password</Label>
            <Input innerRef={password} type="password" name="password" id="bs_pwd" placeholder="" bsSize="lg"   />
          </FormGroup>
          <br/>
          <Button size="lg" color="primary" block>Login</Button>
        </Form>
    </Layout>);


}

export default LoginForm;