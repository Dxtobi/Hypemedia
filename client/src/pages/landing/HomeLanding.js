import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getPostsTagged } from '../../actions/postsActions';
import { getGlobalInfo } from '../../actions/authActions'
import Cheader from './components/Cheader'
import { LastNews } from './components/LastNews'
import Loading from "../../components/shared/Loading"

import NewsList from './components/NewsList'
import LoadingMore from '../../components/shared/LoadingMore'



export class Home extends Component {
    state = {
        skip: 0,
        currentTag: "all",
    }
    componentWillMount() {
        //this.props.getGlobalInfo()
        this.props.getPosts(this.state.skip)
    }
    componentDidUpdate() {
    // console.log(this.state)
    }

    loadMore = () => {
        const {skip}=this.state
        this.props.getPosts(skip + 8)
        this.setState({skip:skip+8})
    }

    getTaggedPost = (typeid, newTag) => {
        console.log(newTag)
        const { skip, currentTag } = this.state
        if (typeid === "all") {
            this.setState({ skip: 0, currentTag: "all" })
            this.props.getPosts(0)
            return
        }
        if (newTag === currentTag) {
            console.log("same")
            this.props.getPostsTagged(typeid, skip)
            this.setState({ skip: skip + 8})
            return
        } else {
            this.setState({ skip: 0 , currentTag:newTag})
            this.props.getPostsTagged(typeid, 0)
            return
        }
    }
    
    render() {
        const { posts, loading, tags } = this.props

        if (posts.length === 0 && loading ) {
            return <Loading/>
        }

        return (
            <div className="Home_container">
                <Cheader
                    tags={tags}
                    tagged={this.getTaggedPost}
                    currentTag={this.state.currentTag} />
                <LastNews post={posts[0]} />
                <div className="divider-text-holder">
                    <div className="divider-text">Recent Talks</div>
                </div>

                <div className="post_list_holder">
                    {posts.map((p, i) => {
                        return <NewsList key={i} post={p}/>
                    })}
                </div>
                {
                    posts.length > 0 && loading &&  <LoadingMore/>
                }
                <div className="divider-text-holder">
                    <button className="divider-btn" onClick={this.loadMore}>Load More</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
   // auth: state.auth,
    posts: state.post.posts,
    tags:state.post.tags,
    loading:state.post.loading
    
})



export default connect(mapStateToProps, {getPosts, getPostsTagged, getGlobalInfo})(Home)
