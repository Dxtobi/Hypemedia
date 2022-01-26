import React, { Component } from 'react'
//import { FiFile, FiUser } from 'react-icons/fi';



import { deleteTags, creatTags, getGlobalInfo} from '../../actions/authActions';
import { connect } from 'react-redux'
import Header from './components/Header';
//import { Link } from 'react-router-dom';
import SideBar from './components/sideBar';
import { TitleHeader } from './components/TitleHeader';

class NweTag extends Component {

    state = {
        tags: [],
        tag:""
        };
   
    componentDidMount() {
     this.props.getGlobalInfo()

    }
    componentWillUpdate(np) {
        console.log(np.auth.global)
    }

    onChangeTag=(e)=>{
        this.setState({
            tag:e.target.value
        })
    }

    render() {
        const {tags}=this.props.auth.global
        return (
            <div className='NweTag-page'>
                <Header/>
                <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container">
                        <div>
                        <TitleHeader
                            onChange={this.onChangeTag}
                            placeholder="New Tag"
                            value={this.state.tag}
                            />
                            <button className="storeBtn" onClick={() => {
                                if(this.state.tag.length>3){
                                    this.props.creatTags({ name: this.state.tag })
                                    this.setState({tag:""})
                                }
                                return
                            }}>
                                Add
                            </button>
                       </div>



                        {
                           tags.length > 0
                                ? (
                                    <table>
                            <thead>
                                            <tr>
                                            <th>
                                   S/N
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Edit
                                </th>
                               </tr>
                            </thead>
                           
                               
                                    <tbody>
                                    {tags.map((t, i) => {
                                        return( <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{t.name}</td>
                                            <td><button
                                                className="deleteBtn"
                                                    onClick={() => {
                                                    this.props.deleteTags(t._id)
                                                    this.setState({tag:""})
                                                    }}
                                                >Delete</button></td>
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

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {deleteTags, creatTags, getGlobalInfo} )( NweTag );
//export default NweTag;