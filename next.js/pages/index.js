
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
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (loggedInUser.id) {
    redirect(context, '/addresses')
  }

  return {}
}

export default withApollo(IndexPage);