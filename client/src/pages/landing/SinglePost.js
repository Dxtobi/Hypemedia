import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, addLike } from '../../actions/postsActions'
//import Cheader from './components/Cheader'
//import { LastNews } from './components/LastNews'
import Loading from "../../components/shared/Loading"
import Related from './components/related'
import DOMPurify from 'dompurify'
import { FiClock } from 'react-icons/fi';
import { AiFillEye, AiFillHeart } from 'react-icons/ai'
import { FaTimes} from 'react-icons/fa'
import { Comments } from './components/Comments'
import { addComment } from "../../actions/postsActions";
export class SinglePost extends Component {
   
    state = {
        showFloatNav: true,
        days :[
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        months:[
            'January',
            'February',
            'March',
            'April',
            'May',
            'jun',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        oldId:""
    }

    componentWillMount() {
        this.props.getPost(this.props.match.params.id)
        this.setState({oldId:this.props.match.params.id})
    }

    componentDidUpdate() {
        console.log(this.state.oldId, this.props.match.params.id)
        if (this.state.oldId!==this.props.match.params.id) {
            window.location.reload()
        }
    }


    returnDate = (d) => {
        const {months, } = this.state
        const nd = new Date(d)
        const date =nd.getDate()
        const y= nd.getFullYear()
        const m = nd.getMonth()
        const h = nd.getHours()
        const min = nd.getMinutes()
        return  `${date} ${months[m]} ${y}-${h}:${min}`;
    }

  

    createMarkup = (html) => {
            return  {
            __html: DOMPurify.sanitize(html)
            }
    }

    render() {

        const { post, loading } = this.props
        //console.log(post)
        if (loading) {
            return <Loading/>
        }
       
        return (
            <div className="Home_container">
                <div>
                   <div className="news_list_details_header">{post.header}</div>
                   <small className="date-align"><FiClock/> {this.returnDate(post.date)}</small>
                </div>
                <div>
                    <img src={`/${post.postImage[0]}`} alt='img' className="single-post-image" />

                </div>
                <div className="tagHolder">
                    {post.tags.length > 0 && post.tags.map((t, i) => {
                        return (
                            <div className="tagDiv" key={i}>
                                {t.name}
                            </div>
                        )
                    })
                       }
                </div>
                 <div dangerouslySetInnerHTML={this.createMarkup(post.htmlText)}>
              
                </div>
                <div className={!this.state.showFloatNav?"base-div":"base-div-nofloat"}>
                   
                    {!this.state.showFloatNav&& <div className="baseBtnHolder">
                        <button onClick={() => {
                            this.setState({showFloatNav:!this.state.showFloatNav})
                        }} className="exitBtnCancil"> <FaTimes /> </button>
                    </div>}
                       
                    <div className="baseBtnHolder ">
                        <button onClick={()=>this.props.addLike(post._id)} className="base-icon red"><AiFillHeart /></button>
                        { post.likes}Likes
                    </div>
                    <div className="baseBtnHolder">
                    <button className="base-icon"><AiFillEye /> </button>{post.views}views
                    </div>
                </div>
                <div>
                <h2>Related</h2>
                { post.tags.length>0 && <Related tagID={post.tags[0]._id}/>}
                </div>
                <div className="comment_area">
                    <Comments addComment={this.props.addComment} comments={post.comments} postId={post._id}/>
                </div>
              
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post.post,
    loading:state.post.loading
    
})



export default connect(mapStateToProps, {getPost, addLike, addComment})(SinglePost)
