import React from 'react'
import { FiSearch, FiUser } from 'react-icons/fi'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'

export const Header = (props) => {
    return (
        <div className="C_header">
            <Link to="/" className="c_brand">
               HYPE TV
            </Link>
            <div className="c_header-left">
                <Link to="/search" className="c_brand_left">
                   
                    <FiSearch />
    
                </Link>
                <Link to="/auth_user" className="c_brand_left">
                   
                  <div className='signinlogin'><FiUser/></div>
    
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)