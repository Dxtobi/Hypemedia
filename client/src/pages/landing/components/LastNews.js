import React from 'react'
import { connect } from 'react-redux'
import { FiClock } from 'react-icons/fi';
import LoadMore from '../../../components/shared/LoadingMore'
import { Carousel } from 'react-responsive-carousel';


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
   
   
    if (post === undefined) {
       return <LoadMore/>
    }
    const img = `${post.postImage[0].toString().replace("\\", "/")}`;
    console.log(backurl + img)
    return (
        <div className='img_holder'>
            <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} showStatus={false}>
              
                <div className="last_news" style={{ backgroundImage: 'URL("/salese.jfif")' }}>
                <div className="content-display-first-post">
                    <div className="last_post_header ">ADVERTISE WITH US</div>
                </div>
                </div>
                <div className="last_news" style={{ backgroundImage: 'URL("/sales.jfif")' }}>
                <div className="content-display-first-post">
                    <div className="last_post_header ">You have something to sell sell with Us</div>
                </div>
                </div>
                <div className="last_news" style={{ backgroundImage: `url(${backurl +'/'+ img})` }}>
                    <div className="content-display-first-post">
                        <div className="last_post_header ">{post.header}</div>
                        <div>
                            <div><FiClock /> {post.date}</div>
                        </div>
                        <div
                            //dangerouslySetInnerHTML={createMarkup()}
                        >  {truncate(post.text, 300)}  
                        </div>
                    </div>
                </div>
                <div className="last_news" style={{ backgroundImage: 'URL("/sale.jfif")' }}>
                <div className="content-display-first-post">
                    <div className="last_post_header ">Visit our communities</div>
                </div>
            </div>
            </Carousel>
           
           
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LastNews)
