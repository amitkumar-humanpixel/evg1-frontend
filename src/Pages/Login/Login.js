import { useOktaAuth } from '@okta/okta-react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import evSign from '../../assets/images/login_images/EV-sign.jpg';
import Button from '../../components/Button/Button';
import lightELogo from '../../assets/images/login_images/light-ev-logo.svg';
import { useWindowHeight } from '../../hooks/useWindowHeight';

const Login = () => {
  const { oktaAuth } = useOktaAuth();
  const history = useHistory();

  const login = useCallback(async () => {
    localStorage.removeItem('userDetails');
    try {
      await oktaAuth.signInWithRedirect({
        originalUri: `${history?.location?.state?.referrer ?? ''}${history?.location?.state?.search ?? ''}` ?? '/',
      });
    } catch (e) {
      /**/
    }
  }, [oktaAuth]);

  return (
    <div className="login-wrapper" style={{ height: useWindowHeight() }}>
      <div className="login-left-part">
        <div className="login-title">
          <img src={evSign} alt="evg-img" />
          <div className="welcome-title">Welcome to</div>
          <div className="EV-name">Eastern Victoria GP Training</div>
        </div>

        <Button buttonType="primary" title="Log in with OKTA" className="auth-submit-button" onClick={login} />

        <img src={lightELogo} className="auth-evgp-bg-logo" />
      </div>
      <span className="auth-strip bg-secondary" />
      <div className="login-right-part" />
    </div>
  );
};
export default Login;
