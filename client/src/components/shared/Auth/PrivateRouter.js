import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

const PrivateRoute = ( { component: Component, auth, ...res } ) =>(
  <Route
    { ...res }
    render = { props =>
      auth.isAuthenticated === true ? (
        <Component { ...props } />
      ) : (
        <Redirect to="/signup" />
      )
    }
  />
);



const mapStateToProps = state => ({
  auth: state.auth
})

export default connect( mapStateToProps )( PrivateRoute )
