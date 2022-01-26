import React, { Component } from 'react'
import { connect } from 'react-redux'

class NotFound extends Component {

       state = { 
         };
   
    componentDidMount() {
       // this.props.getTransactions()

   }


    render() {

        return (
            <div className='NotFound-page'>
        
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {  } )( NotFound );