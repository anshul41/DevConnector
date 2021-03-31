import PrivateRoute from '../routing/PrivateRoute';
import Experience from './experience';
import Education from './education';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import CreateProfile from './createProfile'
import {GetProfile} from '../../action/user'
import React, { useEffect } from 'react';

const Dashboard = ({user,GetProfile,profile}) => {
  useEffect(() => {
    GetProfile();
  });
  return (
    <PrivateRoute>
      {
      // profile?.id 
      true ? 
      <section className="container">
      <h1 className="large text-primary">
        Dashboard
      </h1>

      <p className="lead"><i className="fas fa-user"></i> Welcome {user?.name}</p>
      <div className="dash-buttons">
        <Link to="editProfile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="addExperience" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="addEducation" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
      </div>

    <Experience />
    <Education />

      

        <div className="my-2">
            <button className="btn btn-danger">
                <i className="fas fa-user-minus"></i>

                Delete My Account
            </button>
          </div>
    </section>: 
    <CreateProfile />
    }
    </PrivateRoute>
  );
};
Dashboard.prototypes={
  user:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  user : state.auth.user,
  profile:state.auth.user
})

export default connect(mapStateToProps,{GetProfile})(Dashboard);
