
import Layout from '../components/FormLayout';
import Header from '../components/Header';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
    alert('Login Successfull')
    alert(JSON.stringify(data))

    // Store the token in cookie
    document.cookie = cookie.serialize('token', data.authenticateUserWithPassword.token, {
      sameSite: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    client.cache.reset().then(() => {
      redirect({}, '/addresses')
    })
  }

  const onError = error => {
    // If you want to send error to external service
    console.error(error)
    alert('on Error')
    alert(error)
  }

  const [signinUser, { error }] = useMutation(LOGIN_QUERY, {
    onCompleted,
    onError,
  })


  const email = useRef(null)
  const password = useRef(null)

  return  (<Layout>
        <Header title="Login Page"/>
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