
import React from 'react'
import { connect } from 'react-redux'

export const Cheader = ({tagged, tags, currentTag}) => {
    console.log(tags)
    return (
        <div className="top_header_btn_holder">
            <button className="top_header_btn" onClick={()=>tagged("all")}>All</button>

            {tags.slice(0, 5).map((t, i) => {
              //  console.log(t)
                return (
                    <button key={i } className={`top_header_btn ${currentTag.toLowerCase()===t.name.toLowerCase()&&"selected-bg"}`} onClick={()=>tagged(t._id, t.name)}>
                        {t.name}
                    </button>
               )
           })}

        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Cheader)
