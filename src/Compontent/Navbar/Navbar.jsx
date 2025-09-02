import React,{useContext} from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoTmg from "../../assets/images/freshcart-logo.svg";
import { AuthContext } from '../../Context/AuthContextProvider';
import { CartContext } from '../../Context/CartContextProvider';



export default function Navbar() {
 let navg = useNavigate()
let {token,setToken,userData} = useContext(AuthContext);
let {numsCartItems} = useContext(CartContext)
   function handleLogout() {
     localStorage.removeItem("token");
     setToken(null)
      navg("/login");
   }

  return (
    <>
      <nav className="bg-white border-gray-200  shadow">
        <div className="max-w-screen-xl flex md:flex-nowrap flex-wrap justify-between items-center mx-auto p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logoTmg} className="h-8" alt="E-commerc" />
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          
          <div className="hidden w-full md:flex justify-between" id="navbar-default">
            
            

            {token ?
             <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0  md:bg-white">
              <li>
                <NavLink
                  to="/"
                  className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                  aria-current="page"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                  aria-current="page"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brand"
                  className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                  aria-current="page"
                >
                  Brand
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                  aria-current="page"
                >
                  category
                </NavLink>
              </li>
             
            </ul> : ''}





           <ul className="font-medium ms-auto flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0  md:bg-white">
              <li>
                  <Link to='https://www.facebook.com' target="_blank"className="text-gray-600 ml-2 hover:text-gray-800">
                          <i className="fab fa-facebook text-2xl px-3" />
                  </Link>
              </li>

              <li>
               
                 <Link to='https://www.instagram.com' target="_blank"className="text-gray-600 ml-2 hover:text-gray-800">
                       <i className="fab fa-instagram text-2xl px-3" />
                 </Link>
              </li>

               <li>
                  <Link to='https://www.twitter.com' target="_blank"className="text-gray-600 ml-2 hover:text-gray-800">
                          <i className="fab fa-twitter text-2xl px-3" />
                  </Link>
              </li>

              <li>
                  <Link to='https://www.youtube.com' target="_blank"className="text-gray-600 ml-2 hover:text-gray-800">
                          <i className="fab fa-youtube text-2xl px-3" />
                  </Link>
              </li>




              {token ? 
              <>
                <NavLink to={'/cart'}>
                  <li className='relative text-active'>
                   <i className='fa-solid fa-cart-shopping block py-3 px-3'></i>
                     <span className='absolute top-0 end-0 -translate-x-1 -translate-y-1'>{numsCartItems}</span>
                 </li>
                </NavLink>
                 


                 <li onClick={handleLogout}>
                <NavLink
                  to="/logout"
                  className={(x) =>
                    x.isActive
                      ? "block py-2 px-3 text-active"
                      : "block py-2 px-3"
                  }
                  aria-current="page"
                >
                  Logout
                </NavLink>
              </li> 


              <li>
                   <span className="block py-2 px-1 text-active">Hello {userData?.name}</span>
              </li>

              </>
              

              :
              <>
               <li>
                <NavLink
                  to="/login"
                  className={(x) =>
                    x.isActive
                      ? "block py-2 px-3 text-active"
                      : "block py-2 px-3"
                  }
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
              
               <li>
                <NavLink
                  to="/register"
                  className={(x) =>
                    x.isActive
                      ? "block py-2 px-3 text-active"
                      : "block py-2 px-3"
                  }
                  aria-current="page"
                >
                  Register
                </NavLink>
              </li>
              </>
              }

               
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
