import React, { Component } from 'react'
//import { FiFile, FiUser } from 'react-icons/fi';



import { getGlobalInfo} from '../../actions/authActions';
import { connect } from 'react-redux'
import Header from './components/Header';
//import { Link } from 'react-router-dom';
import SideBar from './components/sideBar';


class NewAdmin extends Component {

    state = {
            lastPost: null,
            posts: 0,
            site: null,
            users: 0
         };
   
    componentDidMount() {
     this.props.getGlobalInfo()

    }
    componentWillUpdate(np) {
        console.log(np.auth.global)
       
    }



    render() {

        return (
            <div className='AdminHome-page'>
                <Header/>
                <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container">

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {getGlobalInfo} )( NewAdmin );
//export default AdminHome;