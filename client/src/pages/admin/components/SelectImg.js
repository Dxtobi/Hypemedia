import React from 'react'
import { connect } from 'react-redux'
//import { useEffect } from 'react'

const SelectImg = (props) => {

   


    const onImagPicked = (e) => {
        props.onChangeImage(e)
       
      }
    return (
        <div className="file-input-holder">
           
            <label className="input-img-label">
            <input
                type="file"
                multiple
                onChange={(e) => onImagPicked(e)}
                name="media"
                id="file-upload-button" />
              Select image
            </label>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectImg)
