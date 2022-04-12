import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRelatedPost } from '../../../actions/postsActions';

import NewsList from '../components/NewsList'




export class Related extends Component {
    state = {
        skip: 0,
        currentTag: "all",
    }
    componentWillMount() {
        this.props.getRelatedPost(this.props.tagID)
    }






    render() {
     return (
            <div className="Related_container">
                <div className="post_list_holder">
                    {this.props.related.map((p, i) => {
                        return <NewsList key={i} post={p}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
   // auth: state.auth,
    related: state.post.related,

})



export default connect(mapStateToProps, {getRelatedPost})(Related)
