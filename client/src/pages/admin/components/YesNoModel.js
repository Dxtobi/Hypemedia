import React from 'react'
import { connect } from 'react-redux'

export const YesNoModel = ({yesFunction, noFunction, message}) => {
    return (
        <div className="adm-model">
            <div className="adm-model-txt">{message}</div>
            <div className="adm-model-btn-holder">
                <button onClick={()=>noFunction()}  className="adm-model-btn green-bg" >Nop</button>
                <button onClick={()=>yesFunction()} className="adm-model-btn red-bg">Yea</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(YesNoModel)
