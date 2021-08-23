import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';

const fields = [
  { name: 'Email address', type: 'text' },
  { name: 'Password', type: 'password' },
];

const footer = (
  <p>
    Don't have an account yet?{' '}
    <Link to="/signup" className="link-primary">
      Sign up
    </Link>{' '}
    today!
  </p>
);

const LoginPage = () => (
  <Form
    title={'Login'}
    fields={fields}
    sideText={'Welcome back!'}
    extra={'Forgot password?'}
    footer={footer}
  />
);

export default LoginPage;
