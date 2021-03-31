import { Fragment, useEffect } from 'react';
import Navbar from './component/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Alert from './component/layout/Alert';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import { loadUser } from './action/auth';
import store from './Store';
import Dashboard from './component/dashboard/dashboard';
import AddExperience from './component/dashboard/addExperience';
import AddEducation from './component/dashboard/addEducation';
import EditProfile from './component/dashboard/editProfile';




const App = () => {
  useEffect(() => {
    if (localStorage.token) {      
      store.dispatch(loadUser());
    }    
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />          
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />              
              <Route exact path='/editProfile' component={EditProfile} />
              <Route exact path='/addExperience' component={AddExperience} />
              <Route exact path='/addEducation' component={AddEducation} />
              
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
