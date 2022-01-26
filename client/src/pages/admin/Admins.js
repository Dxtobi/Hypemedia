import React, {
    Component
} from 'react'

import {AiFillDelete } from "react-icons/ai"
import {getGlobalInfo} from '../../actions/authActions';

import {
    connect
} from 'react-redux'
import Header from './components/Header';
import SideBar from './components/sideBar';

class AdminsTable extends Component {

    state = {};

    componentDidMount() {
        this.props.getGlobalInfo()
   
       }


    render() {
        console.log(this.props.auth.global)
        const {admins}=this.props.auth.global
        return (
            <div className='AdminsTable-page' >
                <Header/>
                <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container">
                      
                        <h2>USERS</h2>



                        {
                           admins.length > 0
                                ? (
                                    <table>
                            <thead>
                                            <tr>
                                            <th>
                                   S/N
                                </th>
                                <th>
                                    Username
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Admin
                                </th>
                                <th>
                                    Edit
                                </th>
                               </tr>
                            </thead>
                           
                               
                                    <tbody>
                                    {admins.map((t, i) => {
                                        return( <tr key={i}>
                                                <td>{i + 1}</td>
                                            <td>{t.username}</td>
                                            <td>{t.email}</td>
                                            <td>{t.admin}</td>
                                            <td><button
                                                className="deleteBtn"
                                                    onClick={() => {
                                                    this.props.deleteTags(t._id)
                                                    this.setState({tag:""})
                                                    }}
                                                ><AiFillDelete/></button></td>
                                            </tr>)
                                            
                                        })} 
                                    </tbody>
                                   
                            </table>
                                ) :
                                <div className="emptyTable">No Tags Yet</div>
                     }
                       
                       

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getGlobalInfo})(AdminsTable);