import React, { Component } from 'react'

import { connect } from 'react-redux'
class heder extends Component {

       state = { 
         };
   
    componentDidMount() {
    // this.props.getTransactions()

   }


    render() {

        return (
            <div className='Admin-header'>
                <div className="adm-header-right">
                    <div className="adm-header-brand">BloggerMan</div>
                    <div className="adm-header-txt">Admin</div>
                </div>
               
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {  } )( heder );
//export default heder;