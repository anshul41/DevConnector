import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../action/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({isAuthenticated, loginUser}) => {

  // useEffect(()=>{
  //   console.log('token cleared');
  //   localStorage.removeItem('token');
  // },[])

  const [formData, setFormData] = useState({    
    email: '',
    password: '',    
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async e => {
    e.preventDefault();         
      try {        
        await loginUser(email, password);
       
        
      } catch (err) {
        console.error(err);
      }
    
  };

  const { email, password } = formData;
  
 //redirect user

 if(isAuthenticated)
 {
   return <Redirect to="/dashboard" />
 }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Enter Credentials
      </p>
      <form className='form' onSubmit={e => login(e)}>
        
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            onChange={(e) => onChange(e)}
            required
            value={email}
            name='email'
          />          
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            required
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>        
        <button type="Submit" className='btn btn-primary'>Login</button>         
        
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{loginUser})(Login);
