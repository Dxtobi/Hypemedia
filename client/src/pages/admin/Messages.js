import React, {
    Component
} from 'react'




import {
    connect
} from 'react-redux'
import Header from './components/Header';
import SideBar from './components/sideBar';

import { getGlobalInfo } from '../../actions/authActions';
import { getMessage } from '../../actions/postsActions';

class EditPost extends Component {

    state = {
        
    };

    componentDidMount() {
        this.props.getGlobalInfo()
        this.props.getMessage()
    }

    componentDidUpdate(np) {
        console.log(np)
    }

    
    render() {
       
        const { messages } = this.props.post;
        
        console.log(messages)
        return (
            <div className='NewPost-page' >
                 <Header/>
                 <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container">
                        <div className="msg-container">
                            <h2>Messages</h2>
                        {messages.map((m, i) => {
                            return (
                               <div key={i}  className="msg-box">
                                    <div className="msg-phone">{m.phone}</div>
                                    <div className="msg-message">{m.message}</div>
                               </div>
                           )
                       })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    post:state.post
});

export default connect(mapStateToProps, {getGlobalInfo, getMessage})(EditPost);