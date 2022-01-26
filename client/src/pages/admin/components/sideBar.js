import React, { Component } from 'react'
import { AiFillMessage } from 'react-icons/ai';
import {  FiUser, FiHome, FiLogOut, FiFilePlus, FiUserPlus, FiFlag, FiFileText } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../../actions/authActions";
import YesNoModel from './YesNoModel';

class SideBar extends Component {
    state = {
         showLogoutModel:false
     }
    render() {
        const {showLogoutModel}=this.state
        return (
            <div className="admin-navigation-bar">
                <div >
                    <div>
                            <Link to="/admin/home" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">HOME</div>
                                    <FiHome size={30} className="adm-navigation-btn-icon"/>
                                </Link>

                        <div className="sidebarDividers">Tables</div>
                        
                                <Link to="/admins" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">ADMINS</div>
                                    <FiUser size={30} className="adm-navigation-btn-icon"/>
                                </Link>
                                <Link to="/admins/messages" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">Messages</div>
                                    <AiFillMessage size={30} className="adm-navigation-btn-icon"/>
                                </Link>
                        
                                <Link to="/admin/posts" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">POSTS</div>
                                    <FiFileText size={30} className="adm-navigation-btn-icon"/>
                                </Link>
                                <Link to="/create/tag" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">TAGS</div>
                                    <FiFlag size={30} className="adm-navigation-btn-icon"/>
                                </Link>
                        
                        <div className="sidebarDividers">Forms</div>
                        
                                <Link to="/create/admin" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">NEW USER</div>
                                    <FiUserPlus size={30} className="adm-navigation-btn-icon"/>
                                </Link>

                                <Link to="/create/post" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">NEW POST</div>
                                    <FiFilePlus size={30} className="adm-navigation-btn-icon"/>
                                </Link>
                    </div>
                    <button onClick={() => {
                       this.setState({showLogoutModel:!showLogoutModel})
                    }} className="adm-navigation-btn nave-section-sidebar-logout">
                            <div className="adm-navigation-btn-text">LOGOUT</div>
                            <FiLogOut size={30} className="adm-navigation-btn-icon"/>
                        </button>
                        </div>

                {
                    showLogoutModel && (
                        <YesNoModel
                            yesFunction={() => {
                                this.props.logoutUser();
                                this.setState({showLogoutModel:!showLogoutModel})
                            }}
                            noFunction={() => {
                                this.setState({showLogoutModel:!showLogoutModel})
                            }}

                            message="Hmm.. You really want to log out"

                        />
                    )
                        }

                    </div>
        )
    }
}
const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)