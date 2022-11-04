import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext';

const Cart = () => {

  let Total = 0;
  const { cart , setCart} = useContext(CartContext);
  

  const [products, setproducts] = useState([]);
  const [priceFetched , togglePriceFetched] = useState(false)

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if(priceFetched){
      return;
    }

    fetch('/api/products/cart-items', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) })
    }).then(res => res.json())
      .then(products => {
        setproducts(products);
        togglePriceFetched(true)
      })

  }, [cart ,priceFetched]);

  const getQyt = (productId) => {
    return cart.items[productId];
  }

  const increament = (productId) => {
    const existingQty = cart.items[productId];
    const _cart = {...cart}
    cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart)

  }

  const decreament = (productId) => {
    const existingQty = cart.items[productId];
    if(existingQty === 1) {
      return;
    }
    const _cart = {...cart}
    cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart)

  }

  const getsum = (productId ,price) => {
    const sum = price * getQyt(productId)
    Total += sum; 
    return sum;
  }
  //delete

  const deleteHandler = (productId) => {
    const _cart ={...cart};
    const qyt = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qyt;
    setCart(_cart)

    const updatedProducts = products.filter((product) => product._id !== productId) 
    setproducts(updatedProducts)
  }

  const handleOrderNow = () => {
    window.alert('order sucessfully')
    setproducts([]);
    setCart({});
  }

  return (
    products.length ?
    <div className='container mx-auto pb-24 lg:w-1/2 w-full '>
      <h1 className='font-bold my-7'>Cart Items</h1>
      <ul>
        {
          products.map(product => {
            return (
              <li className="mb-12" key={product._id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img className="h-16" src={product.image} alt="" />
                    <span className="font-bold ml-4 w-48">marghreta{product.name}</span>
                  </div>
                  <div>
                    <button onClick={() => {decreament(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                    <b className="px-4">{getQyt(product._id)}</b>
                    <button onClick={() => {increament(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                  </div>
                  <span>₹ {getsum(product._id , product.price)}</span>
                  <button onClick={() => {deleteHandler(product._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                </div>
              </li>
            )
          })
        }

      </ul>
      <hr className='my-6' />
      <div className='text-right'>
        <b>Grand Total:</b> ₹ {Total}
      </div>
      <div className='text-right mt-6'>
        <button onClick={handleOrderNow} className='bg-yellow-500  px-4 py-2 rounded-full leading-none'>order now</button>
      </div>
    </div>
    :
    <img className='mx-auto mt-12 w-1/2' src='/images/empty.png' alt=''/>
  )
}

export default Cart;