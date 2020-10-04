import React from 'react';
import Menu from './Menu';
// import Footer from './Footer';
import { Link } from 'react-router-dom';




const ForbiddenPage = () => {

  return (
    <div className='ForbiddenPage'>
      <Menu />
      <div className="Forbidden">
        <div class="error-main">
          <h1>Oops!</h1>
          <div class="error-heading">403</div>
          <p>You do not have permission to access this page that you requested. Please back to  <Link to="/signin">Signin</Link> </p>

        </div>
      </div>


    </div>
  )
}

export default ForbiddenPage
