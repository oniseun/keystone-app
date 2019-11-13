
import { withApollo } from '../helpers/apollo'
import redirect from '../helpers/redirect'
import checkLoggedIn from '../helpers/checkLoggedIn'
import LoginForm from '../components/LoginForm'

const IndexPage = () => (
  <>
    <LoginForm />
  </>
)


IndexPage.getInitialProps = async context => {
  const auth = await checkLoggedIn(context.apolloClient)

  if (auth.hasOwnProperty('loggedInUser')) {
    return redirect(context, `/addresses?rdr-time=${Date.now()}`);
  }

  return {}

}

export default withApollo(IndexPage);