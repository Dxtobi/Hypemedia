import React from 'react'
import { connect } from 'react-redux'
import { EnterComent } from './EnterComent'

export const Comments = ({comments, postId, addComment}) => {
    return (
        <div>
            <div>
                {comments.map((c, i)=>{
                    return (
                        <div key={i } className="comment-box">
                            <div className="comment-name">{c.name}</div>
                            <div className="comment-text">{c.text}</div>
                        </div>
                    )
                })}
            </div>
            <EnterComent addComment={ addComment} postId={ postId}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
