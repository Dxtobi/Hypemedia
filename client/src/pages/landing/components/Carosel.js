import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';


class DemoCarousel extends Component {
    render() {
        return (
            <Carousel renderThumbs={()=>false} autoPlay={true}  infiniteLoop={true}>
                <div >
                    <img className='carousel_img' src="/salese.jfif" alt=''/>
                    <p className="legend">Hot Sales</p>
                </div>
                <div>
                    <img className='carousel_img' src="/sales.jfif" alt='' />
                    <p className="legend">Best Sales Market in Amd Out</p>
                </div>

            </Carousel>
        );
    }
};
export default DemoCarousel