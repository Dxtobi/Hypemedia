import React, {
    Component
} from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';




import {
    connect
} from 'react-redux'
import { Link } from 'react-router-dom';
import { getPosts, deletePost  } from '../../actions/postsActions';
import Header from './components/Header';
import SideBar from './components/sideBar';
import LoadingMore from '../../components/shared/LoadingMore'

class Posts extends Component {

    state = {
        skip:0
    };

    componentDidMount() {
        // this.props.getTransactions()
        this.props.getPosts(this.state.skip)
    }

    
    loadMore = () => {
        const {skip}=this.state
        this.props.getPosts(skip + 8)
        this.setState({skip:skip+8})
    }
    render() {
        const { posts, loading } = this.props.post
       // console.log(posts)
        return (
            <div className='Posts-page' >
                 <Header/>
                <div className="admin-container">
                    <SideBar />
                    <div className="adm-content-container"> <div >
                      
                      <h2>POSTS</h2>



                      {
                         posts.length > 0
                              ? (
                                  <table>
                          <thead>
                                          <tr>
                                          <th>
                                 s/n
                              </th>
                              <th>
                                  Post Img
                              </th>
                              <th>
                                    Tittle
                              </th>
                              <th>
                                  Edit
                                                </th>
                                                <th>
                                  Delete
                              </th>
                             </tr>
                          </thead>
                         
                             
                                  <tbody>
                                  {posts.map((t, i) => {
                                      return( <tr key={i}>
                                              <td>{i + 1}</td>
                                          <td><img className="lst-post-img-table" src={`/${t.postImage[0]}`} alt="pic"/></td>
                                          <td>{t.header}</td>
                                          <td><Link
                                              className="deleteBtn selected-bg"
                                                 to={`/edit/post/${t._id}`}
                                          ><AiFillEdit /></Link></td>
                                          <td>
                                          <button
                                              className="deleteBtn"
                                                  onClick={() => {
                                                  this.props.deletePost(t._id)
                                                  this.setState({tag:""})
                                                  }}
                                              ><AiFillDelete/></button>
                                          </td>
                                          </tr>)
                                          
                                      })} 
                                  </tbody>
                                 
                          </table>
                              ) :
                              <div className="emptyTable">No Post Yet</div>
                   }
                   {
                    posts.length > 0 && loading &&  <LoadingMore/>
                }
                   <div className="divider-text-holder">
                    <button className="divider-btn" onClick={this.loadMore}>Load More</button>
                </div>

                  </div></div>

                </div>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
});

export default connect(mapStateToProps, {getPosts, deletePost})(Posts);