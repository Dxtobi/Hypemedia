
import React, {useState, useEffect} from 'react'
import { FiSearch } from 'react-icons/fi'
import { connect } from 'react-redux'
import { search, clearPost } from "../../actions/postsActions";
import LoadingMore from '../../components/shared/LoadingMore';
import { NewsList } from './components/NewsList';


export const Search = (props) => {
    const [searchV, setSearch] = useState("")
    const setSearcF = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        props.clearPost()
    }, [])

    useEffect(() => {
        //console.log(props.post)
    }, [props.post])

    
    const getSearchedValues = () => {
        props.search(searchV)
    }
    
    return (
        <div className="Home_container">
           <div className="__search">
                <input
                    value={searchV}
                    placeholder="eg: 'Nike'"
                    className="__search_input"
                    onChange={setSearcF}
                />
                <button onClick={getSearchedValues} className="search-icon"> <FiSearch/></button>
            </div>

            <div className="post_list_holder">
                {props.post.loading && <LoadingMore />}
                {props.post.posts.length < 1&& !props.post.loading && <div className="not-found-search">Search Not Found.</div>}
                {
                    props.post.posts.map((p, i) => {
                        return <NewsList key={i} post={ p}/>
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    post:state.post
})



export default connect(mapStateToProps, {search, clearPost})(Search)