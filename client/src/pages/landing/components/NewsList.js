import React from 'react'
import { connect } from 'react-redux'
import { FiClock } from 'react-icons/fi';
import Link from 'react-router-dom/Link';

export const NewsList = ({post}) => {
    //console.log(post.text)
    const truncate = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num)+"..."
        } else {
            return str;
        }
    }
    const returnDate = (d) => {
        const months = [
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
        ]
       /* const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]*/
        const nd = new Date(d)
        const date =nd.getDate()
        const y= nd.getFullYear()
        const m = nd.getMonth()
        //const dw = nd.getDay()
        const h = nd.getHours()
        const min = nd.getMinutes()
        const mt = `${date} ${months[m]} ${y} ${h}:${min}`
        return mt
    }
    return (
        <div className="post_list_holder_div">
            <div className="news_list">
                <div className="imageHolder"><img className="list_img" src={`/${post.postImage}`} alt="img" /></div>
                <div className="news_list_details">
                    <div className="news_list_details_header">{post.header}</div>
                    <small className="date-align"><FiClock/> {returnDate(post.date)}</small>
                    <div className="news_list_details_header_text">
                        {truncate(post.text, 50)}
                    </div>
                    <Link to={`/news/${post._id}`}  className="readMoreBtn">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)
