import React, { Component } from 'react'
import { FiFile, FiUser } from 'react-icons/fi';



import { getGlobalInfo} from '../../actions/authActions';
import { connect } from 'react-redux'
import Header from './components/Header';
//import { Link } from 'react-router-dom';
import SideBar from './components/sideBar';

class AdminHome extends Component {

    state = {
        lastPost: null,
        posts: 0,
        site: null,
        users: 0
         };
   
    componentDidMount() {
     this.props.getGlobalInfo()

    }
    componentWillUpdate(np) {
        console.log(np.auth.global)
       
    }



    render() {
        const {
             posts, site, users, lastPost
        } = this.props.auth.global

        
        return (
            <div className='AdminHome-page'>
                <Header/>
                <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container">
                        <div className="home-top">
                            <div className="grump">
                                    <div>Admins</div>
                                    <FiUser size={35} />
                                <h3>
                                    {
                                        users
                                    }
                                </h3>
                            </div>

                            <div className="grump">
                                    <div>Posts</div>
                                    <FiFile size={35} />
                                <h3>
                                    {posts}
                                </h3>
                            </div>

                            <div className="grump">
                                    <div>Hits</div>
                                    <FiUser size={35} />
                                <h3>
                                    {
                                        site===null?"--":site.totalSiteHit
                                    }
                                </h3>
                            </div>


                            <div className="grump green-bg">
                                    <div>Rating</div>
                                    <FiUser size={35} />
                                <h3>
                                    {
                                        site===null?"--":site.rating
                                    }
                                </h3>
                            </div>
                        </div>
                        {
                                /*******
     * comments: []
date: "2022-01-16T10:50:10.817Z"
header: "header7"
likes: 0
postImage: ['upload\\1642330210731SL.png']
tags: ",,bad boy,last test"
text: "latest news3"
user: "61e33aec0c0137226831ecf6"
videoLink: "undefined"
views: 0
__v: 0
_id: "61e3f862882fc923c4782d3
     */
}
                        <div className="last-post-container">
                            {
                                lastPost && (
                                    <div className="last-post-container-flex">
                                        <div>
                                        {
                                            lastPost.postImage.length > 0 && (
                                                <img className="lst-post-img" src={`/${lastPost.postImage[0]}`} alt="pic"/>
                                            )
                                        }
                                        <div>
                                            <h2 className="adm-post-header">{lastPost.header}</h2>
                                        </div>
                                        </div>
                                        <div className="last-post-container-flex-right">
                                            <div className="post-grump">{lastPost.views} Views</div>
                                            <div className="post-grump">{lastPost.likes} Likes</div>
                                            <div className="post-grump">{lastPost.comments.length} Comments</div>
                                            <div className="post-grump">{lastPost.date} </div>
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {getGlobalInfo} )( AdminHome );
//export default AdminHome;