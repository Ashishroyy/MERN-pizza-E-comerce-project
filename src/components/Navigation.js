import React from "react";
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { CartContext } from "../CartContext";


const Navigation = () =>{

  const cartstyle={
    background: "rgb(251 191 36)",
    display: "flex",
    borderRadius: "37%",
    padding: "2px"
  }
 const {cart} = useContext(CartContext);

    return (
        <>
          <nav className="container mx-auto flex items-center justify-between">
            <Link to ="/">
                <img style={{height: 90}} src="/images/pizza-logo.png" alt="logo"/>
            </Link>

            <ul className="flex items-center ">
            <li><Link to = '/' className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"> Home</Link></li>
            <li className="ml-4"><Link to = '/products' 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Products</Link></li>
            <li className="ml-4">

            <Link to ='/cart'>
              <div style={cartstyle}>
              <span className="	mt-2 font-bold  ml-1">{cart.totalItems ? cart.totalItems : 0}</span>
             <img style={{height: 45}} className="shadow-xl	ml-2" src="/images/add-cart.png" alt="icons" />
              </div>
            </Link>
            
            </li>
            </ul>
          </nav>
        
        </>
    )
}

export default Navigation;