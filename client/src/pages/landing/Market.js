
import React, {useEffect, useState} from 'react'
//import { FiSearch } from 'react-icons/fi'
import { connect } from 'react-redux'
import { getProducts} from "../../actions/market";
import DemoCarousel from './components/Carosel';
import MarketItem from './components/Market';
import { Carousel } from 'react-responsive-carousel';
//import LoadingMore from '../../components/shared/LoadingMore';
const dataTypes = [{type:'Jackets'}, {type:'T-shirts'}, {type:'Trousers'},{type:'PHONES'}, {type:'SHOES'}, {type:'AUDIO DEVICES'}, {type:'ELECTRONICS'}, {type:'SNICKERS'}]


export const Market = ({market, getProducts}) => {
    const [skip, setSkip] = useState(0);
    const [products, setProducts] = useState([]);
    const getProduct = () => {
        getProducts(skip);
        setSkip(skip+10)
    }
    useEffect(() => {
        getProduct()
    },[])
    useEffect(() => {
       // console.log(market.products)
        setProducts(market.products)
    },[market])
 
    
    return (
        <div className="Home_container">
            <Carousel autoPlay={true} infiniteLoop={true} >
                <div style={{backgroundImage:'URL("/sale.jfif")'}}  className='top-m-img'/>
                <div style={{ backgroundImage: 'URL("/sales.jfif")' }} className='top-m-img' />
                <div style={{backgroundImage:'URL("/salese.jfif")'}}  className='top-m-img'/>
                <div style={{backgroundImage:'URL("/shear.png")'}}  className='top-m-img'/>
            </Carousel>
            <div className='top-div-market'>
               
            </div>
            <div className='product-available'>
                {
                    dataTypes.map((e, i) => {
                        return <button key={i} className='pi-btn active'>{e.type}</button>
                    })
                }
                
            </div>
            <DemoCarousel/>
            <div className='products_'>
                {
                    
                    products.map((e, i) => {
                        return (<MarketItem key={i } e={e} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    market:state.market
})

export default connect(mapStateToProps, { getProducts })(Market)

