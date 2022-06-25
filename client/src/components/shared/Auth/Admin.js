import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

const Admin = ({ component: Component, auth, ...res }) =>{
console.log(auth.isAdmin)
return    (
  <Route
    { ...res }
    render = { props =>
      auth.isAdmin ? (
        <Component { ...props } />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);}



const mapStateToProps = state => ({
  auth: state.auth
})

export default connect( mapStateToProps )( Admin )
