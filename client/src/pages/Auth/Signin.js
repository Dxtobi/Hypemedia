import React, { Component } from 'react'
import { loginUser } from '../../actions/authActions'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

export class Signin extends Component {

    state = {
        email: "",
        password: "",
        redirect:false
    }

  

    
    componentDidMount() {
        this.setState({ redirect: this.props.auth.isAuthenticated })
        console.log(this.props.auth.isAuthenticated)
    }
    
    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <div className='Home_container'>
                <div className="login_client">
                <div className='auth_ind_text'>
                        <h1>Sign In</h1>
                        <div>Welcome Back</div>
                </div>
                <input className="login_input" type="email" placeholder="enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                />
                <input className="login_input" type="password" placeholder="enter password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <button onClick={(e) => {
                    e.preventDefault();
                    const data = {
                        password: this.state.password,
                        email: this.state.email,
                    }
                    this.props.loginUser(data)
                    }} className="login_input_button" >Login</button>
                     <Link className='reg_log_link' to='/signup'>No Account Yet?</Link>
                </div>
                
               
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth:state.auth
})

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
