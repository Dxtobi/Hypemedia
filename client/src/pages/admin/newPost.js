import React, {
    Component
} from 'react'




import {
    connect
} from 'react-redux'
import Header from './components/Header';
import SideBar from './components/sideBar';
import Editor from "./components/EditorMain";
import SelectImg from './components/SelectImg';
import TitleHeader from './components/TitleHeader';
import { getGlobalInfo } from '../../actions/authActions';
import { addPost } from '../../actions/postsActions';

class NewPost extends Component {

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
        cleared: false,
        preview:false
    };

    componentDidMount() {
         this.props.getGlobalInfo()

    }

    componentDidUpdate(np) {
       // console.log(this.state.contentState, this.state.text)
    }

    onContentStateChangePass = (contentState) => {
        this.setState({
            contentState: contentState,
            error: false,
        });

        console.log(contentState)
    };
    
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

       // console.log(imgs, display)
      };
    normalText = (e) => {
        this.setState({
            text: e
        });
       // console.log(e)
      }

    onSend = () => {
        let formObj = new FormData();
        const {__html }= this.state.contentState
        const {imgs,  postHeader, tags, PostVideoLink, text}=this.state

        if ((__html === undefined || __html === null) || postHeader.length < 3) {
            return this.setState({error:true})
        }
      
        for (let index = 0; index <  imgs.length; index++) {
            formObj.append('postImageData', imgs[index]);
          
        }
        
        for (let index = 0; index <  tags.length; index++) {
            formObj.append('tags', tags[index]);
          
        }
     //   console.log(text)
       // formObj.append("tags", tags);
        formObj.append("header", postHeader);
        formObj.append("videoLink", PostVideoLink)
        formObj.append("htmlText", __html)
        formObj.append("text", text)
        this.props.addPost(formObj)
        this.setState({
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
            cleared:true
        })
    }

    onchangeHeader = (e) => {
        this.setState({
            postHeader:e.target.value
        })
    }

    select = (id) => {
        const {tags}=this.state
        let i = this.checkArr(id, tags)
        if (i) {
           return this.remove(id)
        }

        return this.setState({ tags: [...this.state.tags, id] })
    }

    remove = (e) => {
        const { tags } = this.state
       
        
        for (let i = 0; i < tags.length; i++) {
               //const element = tags[i];
               if (tags[i]===e) {
                   tags.splice(i, 1)
                   console.log(tags)
                   return this.setState({tags:tags})
               }
           }
        
        
    }

    checkArr = (e) => {

        const { tags } = this.state
       // console.log(e, tags)
        const val =tags.some( (marked) => {  
            if(marked === undefined || marked !== e){
                return false
            } else {
                return true
            }
        })
        return val
    }

    setCleared = () => {
        this.setState({cleared:false})
    }
    setPreview = () => {
        this.setState({
            preview:!this.state.preview
        })
    }
    render() {
        //console.log(this.state)
        const { contentState, postHeader, cleared } = this.state;
        const { tags } = this.props.auth.global;
        return (
            <div className='NewPost-page' >
                 <Header/>
                 <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container">
                        <div className='post-btn-holder'>
                            <button onClick={this.onSend} className="storeBtn">PUBLISH</button>
                            <button onClick={this.setPreview} className="storeBtn">PREVIEW</button>
                        </div>
                        <TitleHeader onChange={this.onchangeHeader} value={postHeader} placeholder="Post Header"/>
                        <SelectImg onChangeImage={this.onChangeImage}/>
                        <Editor contentState={contentState}
                            onContentStateChangePass={this.onContentStateChangePass}
                            normalText={this.normalText}
                            setCleared={this.setCleared}
                            cleared={cleared}
                            preview={this.state.preview}
                            display={this.state.display}
                            header={this.state.postHeader}
                            videoLink={this.state.videoLink}
                            tags={this.state.tags}
                            setPreview={this.setPreview}
                        />
                        <div className="tag-container">
                            {
                                tags.map((t, i) => {
                                    return (
                                        <div className={`tag ${this.checkArr(t._id)&&'selected-bg'}`} onClick={() => {
                                            this.select(t._id)
                                        }} key={i}>{t.name}</div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getGlobalInfo, addPost})(NewPost);





/***
 * Origins and DiscoveryCD RF
 * What is Lorem Ipsum?
 * Lorem Ipsum
 * Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
 */