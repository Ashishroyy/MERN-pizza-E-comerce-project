import Navigation from "./components/Navigation";
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Home from './pages/Home'
import Products from "./components/Products"
import Cart from './pages/Cart'
import SingleProduct from "./pages/SingleProduct";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { getCart ,storeCart } from "./Helpers";


const App = () => {

  const [cart ,setCart] = useState({});
  useEffect(()=> {
    
    getCart().then((cart => {
      setCart(JSON.parse(cart));
    }))

  },[]);

  useEffect(() => {
    storeCart(JSON.stringify(cart))
  },[cart]);
  return (
    <>
      <Router>
      <CartContext.Provider value={{cart, setCart}}>
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:_id" element={<SingleProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
        </CartContext.Provider>
      </Router>
    </>
  )
}

export default App;
