import React from 'react'
import { connect } from 'react-redux'

/**
 * 
 * @param {value, onChange, placeholder} param0 
 * @returns text input element
 */
export const TitleHeader = ({value, onChange, placeholder }) => {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
                className="postHeader_input"
                
                />
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleHeader)
