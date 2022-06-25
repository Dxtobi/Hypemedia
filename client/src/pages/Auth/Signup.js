import React, { Component } from 'react'
import { loginUser, registerUser, clearErrors } from '../../actions/authActions'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

export class Signup extends Component {

    state = {
        email: "",
        password: "",
        redirect: false,
        username: '',
        phone: '',
        errors:{}
    }

  

    componentWillUpdate(p){
       // console.log()
    }
       

    componentDidMount() {
        this.setState({ redirect: this.props.auth.isAuthenticated })
        //console.log(this.props.error)
    }
    
    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <div className='Home_container'>
                 
                <div className="login_client">
                <div className='auth_ind_text'>
                        <h1>Sign Up</h1>
                        <div>Create New Account</div>
                    </div>
                   
                <input className="login_input" type="text" placeholder="User Name"
                    onChange={(e) => this.setState({ username: e.target.value })}
                    />
                    
                <input className="login_input" type="tel" placeholder="Phone Number"
                    onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                    {
                        this.props.error.phone && <small className='error__'>{this.props.error.phone}</small>
                    }
                    <small className='reg_log_link'>This number would be use to contact you</small>
                <input className="login_input" type="email" placeholder="enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    />
                     {
                        this.props.error.email && <small className='error__'>{this.props.error.email}</small>
                    }
                <input className="login_input" type="password" placeholder="enter password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <button onClick={(e) => {
                    e.preventDefault();
                    const data = {
                        password: this.state.password,
                        email: this.state.email,
                        username: this.state.username,
                        phone: this.state.phone,
                        admin:false
                    }
                    this.props.registerUser(data, this.props.history)
                    }} className="login_input_button" >Register</button>

                    <Link className='reg_log_link' to='/signin'>Already have an account?</Link>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.errors
})

const mapDispatchToProps = {
    loginUser,
    registerUser,
    clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
