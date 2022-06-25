import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import AdminHome from './pages/admin/home';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import PrivateRoute from './components/shared/Auth/PrivateRouter';
//import Register from './components/register/Register';
import NotFound from './components/shared/NotFound';


import newAdmin from './pages/admin/newAdmin';
import newPost from './pages/admin/newPost';
import Posts from './pages/admin/Posts';
import Admins from './pages/admin/Admins';
import HomeLanding from './pages/landing/HomeLanding';
import  Login  from './pages/admin/reg/Login';
import NewTag from './pages/admin/NewTag';
import EditPost from './pages/admin/EditPost';
import SinglePost from './pages/landing/SinglePost';
import Messages from './pages/admin/Messages';
import  Search  from './pages/landing/search';
import LoginClient from './pages/landing/Login';
import Market from './pages/landing/Market';
import Register from './pages/landing/Register';
import Admin from './components/shared/Auth/Admin';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';



//Check for token
if( localStorage.blogerman ){
  //Set auth token header auth
  setAuthToken( localStorage.blogerman );
  //Decode token and get user info and export
  const decoded = jwt_decode( localStorage.blogerman );
  //Set user and isAuthenticated
  store.dispatch( setCurrentUser( decoded ) );
  //console.log('not time out')
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if( decoded.exp < currentTime ){
    // Logout user
    console.log('time out')
    store.dispatch( logoutUser() );

    // Clear current profile
    store.dispatch( clearCurrentProfile() );

    // Redirect to login page
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Header/>
            <div className="my-container">
              <Switch>
                <Route exact path="/" component={HomeLanding} />
                <Route exact path="/news/:id" component={SinglePost} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/auth_user" component={LoginClient} />
                <Route exact path="/market" component={Market} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />

                {
                  //  ONLY LOGGED IN  ROUTE
                }

                <PrivateRoute exact path="/sellform" component={Register} />


                {
                  //  ADMIN ROUTE
                }
                <Admin exact path="/create/admin" component={newAdmin} />
                <Admin exact path="/create/tag" component={NewTag} />
                <Admin exact path="/admins/messages" component={Messages} />
                <Admin exact path="/edit/post/:id" component={EditPost} />
                <Admin exact path="/create/post" component={newPost} />
                <Admin exact path="/admin/posts" component={Posts} />
                <Admin exact path="/admins" component={Admins} />
                <Admin exact path="/admin/home" component={AdminHome} />
                <Admin exact path="/adm" component={ AdminHome } />
                <Route  path="" component={ NotFound }/>
              </Switch>
            </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
