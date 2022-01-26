import React, {useState} from 'react'
import { connect } from 'react-redux'


export const EnterComent = ({postId, addComment}) => {
    
    const [text, setText] = useState("")
    const [name, setName] = useState("Anonymous")
    const [err, setErr] = useState("")


    const addCommentF = () => {
        if (text.length < 3 || text.length > 100 || name.length < 3) {
            //console.log("err")
            return setErr("Max character 100 Min Character 3")
        }
        const data ={ text, name:"Anonymous" }
        addComment(postId, data)
        setErr("")
        setName("")
        setText("")
    }
    return (
        <div>
             <small className="red">{err}</small>
            <input  type="text"
                    placeholder="Name (optional)"
                    className="comment-input-name"
                value={name}
                disabled
                    onChange={(e)=>setName(e.target.value)}
                    />
            <div className="comment_">
                <input type="text"
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    placeholder="Say something.."
                    className="comment-input"
                />
               
            <button disabled={text.length > 100 || name.length > 100 ? true:false} onClick={()=>addCommentF()} className="comment-btn">send</button>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps, {})(EnterComent)
