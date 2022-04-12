import React from 'react';
import DOMPurify from 'dompurify';
 
const Preview = ({convertedContent, display, header, videoLink, tags, setPreview}) => {
    const createMarkup = (html) => {
        return  {
        __html: DOMPurify.sanitize(html)
        }
    }
    console.log(header)
    return (
        <div className="preview">
           <button className="storeBtn" onClick={()=>setPreview()}>Cancel</button>
            <div className="preview_container">
            
                <div>
                   <div className="news_list_details_header">{header}</div>
                   <small className="date-align">Mondey 12:30 Jun 2022</small>
                </div>
                <div>
                    <img src={display[0]} alt='img' className="single-post-image" />

                </div>
                <div className="tagHolder">
                    {tags.map((t, i) => {
                        return (
                            <div className="tagDiv" key={i}>
                                {"TAG"+i}
                            </div>
                        )
                    })
                       }
                </div>
                 <div dangerouslySetInnerHTML={createMarkup(convertedContent)}>
              
                </div>
                
            </div>
        </div>
    );
}
 

 
export default Preview;