import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../../action/auth';
import {connect} from 'react-redux';
export const Navbar = ({logout,isAuthenticated}) => {

  const guestLinks=(
    <ul>
    <li><Link to="/dashboard">Developers</Link></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>    
    </ul>
  )
  const link=isAuthenticated ?  <ul><li><Link onClick={logout} to="#!">Logout</Link></li></ul> : guestLinks ;
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/dashboard"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>                  
          {link}       
      </nav>
    )
}
const mapStateToProps = state=>({
isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout})(Navbar);
