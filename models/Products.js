const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**8
 *  {
        product: 'shoes',
        sold: '30',
        available:'20',
        name: 'Jordan Men',
        img:'shear.png',
        price: 11000,
        description: '41, 42, 43, 45',
        descriptionfull: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae consectetur aspernatur dolore culpa rem architecto, facere consequuntur. Ducimus, tenetur! Tempore, velit at. Sed quo cumque beatae quia. Dolore, fugiat quibusdam.',
    },
 */
const ProductsSchema = new Schema({
   user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require:true
    },
   
   
    name: {
        type: String,
        default:''
        },
    price: {
        type: String,
        default:0
    },
    sold: {
        type: Number,
        default:0
        },
    available: {
        type: Number,
        default:0
    },
    descriptionfull: {
        type: String,
        default:''
    },
    
   product: {
        type: String,
        required:true
    },
    likes: {
        type: Number,
        default:0
    },

    productImage: [],
   
    comments: [
        {
            text: {
               type: String,
               required: true
            },
            name: {
                type: String,
               // required: true,
                default: "Anonymous",
                
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },

});


module.exports = Product = mongoose.model('Product', ProductsSchema);