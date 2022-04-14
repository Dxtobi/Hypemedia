import React, {
    Component
} from 'react'
import { FiPhoneCall, FiSearch } from 'react-icons/fi';
import { addMessage, getTags, getPostsTagged, getPosts } from '../../actions/postsActions';




import {
    connect
} from 'react-redux'
import Link from 'react-router-dom/Link';

class Footer extends Component {

    state = {
        adsText:`Well Noting Much To see here We just love Entertaining You.`,
        message: "",
        phone: "",
        skip:0
    };

    getTaggedPostF = (typeid) => {
       // console.log(newTag)
        const { skip } = this.state
       
            //console.log("same")
            this.props.getPostsTagged(typeid, skip)
            
            return
        
    }
    componentDidMount() {
        this.props.getTags()
    }
    

    sendMessage = () => {
        const {message, phone} = this.state
        if (message.length < 1 || phone.toString().length < 9) {
            console.log(message.length, phone.length )
            return
        }
        console.log("don")
        this.props.addMessage({ message, phone })
        this.setState({message:"", phone:""})
    }


    render() {
        const { tags } = this.props
       // console.log(tags)
        return (
            <div className='Footer-page'>
                <div className="footer_container2">
                    <div className="footer-sec">
                        <div className="footer-header-text">Tags</div>
                        <div className="footer-tags-holder">{
                                tags.map((t, i) => {
                                    return <button key={i}
                                        className="footer-tags-btn"
                                        onClick={() => {
                                            this.getTaggedPostF(t._id)
                                        }}
                                    >{t.name}</button>
                                })
                        }
                       
                        </div>
                    </div>
                    <div>
                        <div className="footer-header-text">About Us</div>
                        <div className="footer-text">
                            {this.state.adsText}
                        </div>
                    </div>
                </div>
                <div className="footer_container2">
                    <div className="footer-sec">
                    <div className="footer-header-text">Looking For some thing?</div>
                        <Link to="/search" className="footer-search">
                            <input placeholder="Nike" className="footer-search-input" />
                            <FiSearch/>
                        </Link>
                        <div className="footer-contact-section">
                            <div className="footer-header-text">Send us a message</div>
                            <div className="footer-search">
                                <input onChange={(e) => {
                                    this.setState({phone:e.target.value})

                            }} value={this.state.phone} type="number" placeholder="WHATSAPP Number" className="footer-search-input" />
                            <FiPhoneCall/>
                        </div>
                            <textarea onChange={(e) => {
                                    this.setState({message:e.target.value})
                            }} value={this.state.message} className="footer-contact-textarea" placeholder="want to advertise?" />
                            
                         <button onClick={this.sendMessage} className="footer-btn">Send</button>
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
    tags:state.post.tags
});

export default connect(mapStateToProps, { addMessage, getTags, getPostsTagged, getPosts})(Footer);