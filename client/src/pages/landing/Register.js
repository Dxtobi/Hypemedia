import React, { useEffect, useState } from 'react';
//import { useDispatch } from 'react-redux';
import { addProduct } from '../../actions/market';
import { connect } from 'react-redux';


function Register(props) {
    const pt =  [{type:'Jackets'}, {type:'T-shirts'}, {type:'Trousers'},{type:'PHONES'}, {type:'SHOES'}, {type:'AUDIO DEVICES'}, {type:'ELECTRONICS'}, {type:'SNICKERS'}]
    const [name, setName] = useState('')
    const [price, setprice] = useState('')
    const [available, setAvailable] = useState('')
    const [description, setDescription] = useState('')
    const [DescriptionFull, setDescriptionFull] = useState('')
    const [imgs, setImgs] = useState([])
    const [type, setType] = useState('')
    const [loading, set_loading] = useState(false)

  //  let dispatch = useDispatch()
    const setImgPost = (e) => {
        let img = [];
        for (let index = 0; index <  e.target.files.length; index++) {
            img.push(e.target.files[index])
           // display.push( URL.createObjectURL(e.target.files[index]))
        }
        if (img.length > 0 ) {
            setImgs(img)
        }
        console.log(img)
    }

    useEffect(() => {

      setTimeout(() => {
        set_loading(false)
      }, 3000);
      return
    }, [loading])

    const clearForm = () => {
        setName('')
        setType('')
        setImgs([])
        setDescriptionFull('')
        setDescription('')
        setAvailable('')
        setprice('')
    }

    const submitForm = () => {
        set_loading(true)
        if (name===''|| price ===''|| available ===''|| DescriptionFull===''||imgs.length<0|| description===''|| type ==='') {
            return
        }

        let formObj = new FormData();
        formObj.append("name", name);
        formObj.append("price", price);
        formObj.append("descriptionfull", DescriptionFull);
        formObj.append("available", available);
        formObj.append("description", description);
        formObj.append("product", type);
        for (let index = 0; index <  imgs.length; index++) {
            formObj.append('productImage', imgs[index]);
          
        }
        //productImage
        props.addProduct(formObj);

      //  console.log(formObj, imgs)
         clearForm()


    }
  return (
      <div className='Home_container'>
          <form className='input-form-sell-product'>
              
              <h2 className='product-details-header'>Enter Product Details</h2>
              <select className='product-input' onChange={(e)=>setType(e.target.value)} name="types">
                <option value="">Product Type</option>
                  {pt.map((e, i) => {
                      return <option key={i} value={e.type}>{ e.type}</option>
               })}
              </select>
              
            
              <input name='product name' value={name} onChange={(e) => setName(e.target.value)} type='text' className='product-input' placeholder='Product Name' />
              <input name='product price' value={price} onChange={(e)=>setprice(e.target.value)} type='number' className='product-input' placeholder='Product Price' />
              <input name='product available' value={available} onChange={(e)=>setAvailable(e.target.value)} type='number' className='product-input' placeholder='Amount Available' />
              <input name='product description' value={description} onChange={(e)=>setDescription(e.target.value)} type='text' className='product-input' placeholder='Description' />
              <input name='product Description Full' value={DescriptionFull} onChange={(e)=>setDescriptionFull(e.target.value)} type='text' className='product-input' placeholder='Sell Your Market' />
              <input name='productImage' onChange={(e)=>setImgPost(e)} type='file' className='product-input' placeholder='Product-image'/>
          </form>

          <button className='storeBtn' onClick={submitForm}>S E L L</button>
      </div>
      
  )
}


const mapStateToProps = (state) => ({
    error:state.error
})



export default connect(mapStateToProps, {addProduct})(Register)