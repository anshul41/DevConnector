import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import { registerUser } from '../../action/auth';
import PropTypes from 'prop-types';


const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    if (password !== password2) setAlert('password dont match', 'danger');
    else {
      const newUser = { name ,email, password };
      try {
        await registerUser(newUser);
      
        console.log(newUser, 'sucess');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const { name, email, password, password2 } = formData;
  if(isAuthenticated)
  {
      return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => register(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            onChange={(e) => onChange(e)}
            value={name}
            name='name'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            onChange={(e) => onChange(e)}
            value={email}
            name='email'
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='Submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.prototypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired
}

const mapStateToProps = state=>({
  isAuthenticated : state.auth.isAuthenticated
})  

export default connect(mapStateToProps, { setAlert,registerUser })(Register);
