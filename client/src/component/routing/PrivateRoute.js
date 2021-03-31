
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Login from '../auth/Login';

const PrivateRoute = (props) => {
    return (
        props.auth.isAuthenticated && !props.auth.loading ? props.children : <Login />
    )
}

PrivateRoute.propTypes = {
    auth:PropTypes.object
}

const mapStateToProps = state=>({
    auth : state.auth
  })  
  
  export default connect(mapStateToProps)(PrivateRoute);