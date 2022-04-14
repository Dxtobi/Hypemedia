import React from 'react'
import { connect } from 'react-redux'
import { FiClock } from 'react-icons/fi';
import LoadMore from '../../../components/shared/LoadingMore'

const backurl= window.location.href || process.env.BASE_URL

/*import DOMPurify from 'dompurify';
const createMarkup = (html) => {
        return  {
        __html: DOMPurify.sanitize(html)
        }
    }*/
export const LastNews = ({ post }) => {
    const truncate = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num)+"..."
        } else {
            return str;
        }
    }
   
    console.log(post)
    if (post === undefined) {
       return <LoadMore/>
    }
    const img = `${post.postImage[0].toString().replace("\\", "/")}`
    return (
        <div>
            <div className="last_news" style={{backgroundImage:` url(${backurl + img})`, backgroundPosition: 'center'}}>
                <div className="content-display-first-post">
                    <div className="last_post_header">{post.header}</div>
                    <div>
                        <div><FiClock /> {post.date}</div>
                    </div>
                    <div 
                        //dangerouslySetInnerHTML={createMarkup()}
                    >  {truncate(post.text, 300)}  
                    </div>
                </div>
            </div>
           
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LastNews)
