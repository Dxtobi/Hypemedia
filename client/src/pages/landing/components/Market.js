

import React, { useState } from 'react';
import {AiOutlineWhatsApp} from 'react-icons/ai'

export default function MarketItem({e}) {
    const [showfull, setShowFull] = useState(false);
//console.log(e)

    if (showfull) {
        return <DisplayFull phone={ e.user.phone} closeFun={setShowFull} sold={ e.sold} descriptionfull={e.descriptionfull} description={e.description}  price={e.price} img={e.productImage} name={e.name} available={e.available}/>
    }
    return (<div  className='prod_item_con_over'>
                <div onClick={()=>setShowFull(!showfull)}
                        className='prod_item_con'>
                        <img alt='' src={e.productImage} className='prod_item_img' />
                        <div className='prod_item_name'>{e.name} {e.sold}</div>
                        <div className='prod_item_price'>NGN{e.price}</div>
                </div>
    </div>
    )
}

const DisplayFull = ({sold,
    available,
    name,
    img,
    price,
    description,
    descriptionfull,
    closeFun,
    phone
}) => {
    
    return (
        <div className='full-screen-items-detail'>
            <img src={img} alt='' className='fsimg' />
            <div className='fsd'>{name}</div>
            <div className='fsdp'>NGN{price}</div>
            <div className='av-sol'>{sold}/{available}</div>
            <div className='fsdd'>About: {description}</div>
            <div className='fsdd'>MORE DETAILS:</div>
            <div className='fsdf'>{descriptionfull}</div>

            <a className='a_contact_ contact-btn' href={`http://wa.me/234${phone}`}>Whatsapp <AiOutlineWhatsApp size={30} /></a>
           

            <div className='close_btn_' onClick={()=>closeFun(false)}>close</div>
        </div>
    )
}