import React, {
    Component
} from 'react'




import {
    connect
} from 'react-redux'
import Header from './components/Header';
import SideBar from './components/sideBar';
import Editor from "./components/EditorMain"
import SelectImg from './components/SelectImg';
import TitleHeader from './components/TitleHeader';
import { getGlobalInfo } from '../../actions/authActions';
import { getPost } from '../../actions/postsActions';
import { EditorState } from 'draft-js';
class EditPost extends Component {

    state = {
        postHeader: "",
        imgs: [],
        display:[],
        PostVideoLink: "",
        contentState: {
            blocks:[]
        },
        text:"",
        tags: [],
        error: false,
        editorState:EditorState.createEmpty()
    };

    componentDidMount() {
        this.props.getGlobalInfo()
        this.props.getPost(this.props.match.params.id)
    }

    componentDidUpdate(np) {
        console.log(np)
    }

    onContentStateChangePass = (contentState) => {
        this.setState({
            contentState: contentState,
            error:false
        });
    };
    normalText = (e) => {
        this.setState({
           text: e,
        });
    }
    onChangeImage = (e) => {
        let imgs = [];
        let display = [];
        for (let index = 0; index <  e.target.files.length; index++) {
            imgs.push(e.target.files[index])
            display.push( URL.createObjectURL(e.target.files[index]))
        }
        
        if (imgs.length > 0 || display.length>0) {
            this.setState({
                imgs: imgs,
                display:display
            })
        }

        console.log(imgs, display)
      };


    onSend = () => {
        let formObj = new FormData();
        const {text }= this.state.contentState.blocks[0]
        const {imgs,  postHeader, tags, PostVideoLink}=this.state

        if ((text === undefined || text === null) || postHeader.length < 3) {
            return this.setState({error:true})
        }
      
        for (let index = 0; index <  imgs.length; index++) {
            formObj.append('postImageData', imgs[index]);
           // imgs.push( URL.createObjectURL(e.target.files[index]))
        }
        
        formObj.append("tags", tags);
        formObj.append("header", postHeader);
        formObj.append("videoLink", PostVideoLink)
        formObj.append("text", text)

        this.props.addPost(formObj)

    }

    onchangeHeader = (e) => {
        this.setState({
            postHeader:e.target.value
        })
    }
    select = (e) => {
        const {tags}=this.state
        let i = this.checkArr(e, tags)
        if (i) {
           return this.remove(e)
        }
        return this.setState({ tags: [...this.state.tags, e] })
       
    }
    remove = (e) => {
       // const { tags } = this.state

    }
    checkArr = (e) => {
        const {tags}=this.state
        const val =tags.some( (marked) => {  console.log(marked, e);
            if(marked === e){
                return true
            } else {
                return false
            }
        })
        return val
    }
    render() {
        const { contentState, postHeader } = this.state;
        const { tags } = this.props.auth.global;
        return (
            <div className='NewPost-page' >
                 <Header/>
                 <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container">
                        <TitleHeader onChange={this.onchangeHeader} value={postHeader} placeholder="Post Header"/>
                        <SelectImg onChangeImage={this.onChangeImage}/>
                        <Editor contentState={contentState}
                            onContentStateChangePass={this.onContentStateChangePass}
                            normalText={this.normalText}
                            editorStateAsProps
                        />
                        <div className="tag-container">
                            {
                                tags.map((t, i) => {
                                    return (
                                        <div className={`tag ${this.checkArr(t.name)&&'selected-bg'}`} onClick={() => {
                                            this.select(t.name)
                                        }} key={i}>{t.name}</div>
                                    )
                                })
                            }
                        </div>
                        <button onClick={this.onSend} className="storeBtn">STORE</button>
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

export default connect(mapStateToProps, {getGlobalInfo, getPost})(EditPost);