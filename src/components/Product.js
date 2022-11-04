import { Link } from 'react-router-dom';
import { useContext ,useState} from 'react';
import { CartContext } from '../CartContext';

const Product = (props) => {
 const {product} = props;
 const {cart ,setCart} = useContext(CartContext);

  const [IsAdding ,setIsAdding] = useState(false)
  
  const addtocart = (event ,product) =>{
    event.preventDefault();
    console.log(product);

    // const cart={
    //   items:{
    //   "6360058b91b4bcceb9b2570e"2,
    //   "6360058b91b4bcceb9b2570e"2,

    // },
    // totalItems: 10
      
    // }

    let _cart = {...cart};
    if(!_cart.items){
      _cart.items = {}
    }
    if(_cart.items[product._id]) {
      _cart.items[product._id] += 1;    
    }else{
      _cart.items[product._id] = 1;    

    }

    if(!_cart.totalItems){
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);

    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false)
    }, 1000);

  }
  return (
    <Link to= {`/products/${product._id}`}>
    <div>
   <img className='bg-slate-100	' src={ product.image} alt='pizza' />
    <div className="text-center">
        <h2 className="font-bold text-xl mb-2 py-2">{product.name}</h2>
        <span className="bg-gray-200 text-sm rounded-full py-1 px-4">{product.size}</span>
    </div>
    <div className="mt-4 items-center flex justify-between">
        <span>₹ { product.price }</span>
        <button disabled={ IsAdding } onClick={(e) => {addtocart(e, product)}}
         className={`${IsAdding ? 'bg-green-500':'bg-yellow-500'} rounded-full py-1 px-4 font-bold`}>Add{IsAdding ? 'ed' : ''}</button>
    </div>
    </div>
   </Link>
  )
}

export default Product;