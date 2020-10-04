import React from 'react';
import Menu from '../core/Menu';
import Signup from './Signup'
import Signin from './Signin';
import reg from '../img/log.svg'
import log from '../img/register.svg'


const RegisterOrLogin = () => {

  const register = () => {
    document.querySelector(".auth-container").classList.add("sign-up-mode");
  }
  const login = () => {
    document.querySelector(".auth-container").classList.remove("sign-up-mode")
  }

  return (
    <div>
      <Menu />
      <div className="RegisterOrLogin">
        <div className="auth-container">
          <div className="forms-container">
            <div className="signin-signup">
              <Signin />
              <Signup />
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="contents">
                <h1>New here ?</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                  ex ratione. Aliquid!
          </p>
                <button onClick={register} className="bTn transparent" id="sign-up-btn">
                  Sign up
          </button>
              </div>
              <img src={reg} className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="contents">
                <h1>One of us ?</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                  laboriosam ad deleniti.
          </p>
                <button onClick={login} className="bTn transparent" id="sign-in-btn">
                  Sign in
          </button>
              </div>
              <img src={log} className="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterOrLogin;
