import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


export const ImgNav = () => {

    return (
        <div>
             <div className='img-nav__t'>
                    <Link to='/market' className='img-nav-dev__t' >Buy</Link>
                    <Link to='/sellform' className='img-nav-dev__t' >Sell</Link>
                    <Link to='/forum' className='img-nav-dev__t' >Forum</Link>
            </div>
            {/*
            <div className='img-nav'>
                <div className='img-nav-dev' style={{ backgroundImage: `url('/sales.jfif')` }}></div>
                <div className='img-nav-dev' style={{ backgroundImage: `url('/shear.gif')` }}></div>
                <div className='img-nav-dev' style={{backgroundImage:`url('/sale.jfif')`}}></div>
            </div>
           */ }
            
            <div className='img-nav__'>
                <div className='img-nav-dev__' style={{ backgroundImage: `url('/sales.jfif')` }}></div>
                <div className='img-nav-dev__' style={{ backgroundImage: `url('/shear.gif')` }}></div>
                <div className='img-nav-dev__' style={{backgroundImage:`url('/sale.jfif')`}}></div>
            </div>
           
        </div>
    )
}


const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps, {})(ImgNav)
