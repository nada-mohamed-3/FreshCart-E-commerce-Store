import axios from "axios";
import React, {  useContext, useState } from "react";
import MainSlider from "../MainSlider/MainSlider";
import CateorySlider from "../CateorySlider/CateorySlider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";


export default function Home() {

  let [Page, setPage] = useState("1");

  let { addUserCart, setNumsCartItems } = useContext(CartContext)

  function getAllProducts(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${Page}`)
  }
  console.log(getAllProducts());
  
  
 let {data, isLoading, isError, error} = useQuery({
    queryKey: ['products',Page],
    queryFn:getAllProducts,
  })
   

  function getPageNumber(e){
       let page = e.target.getAttribute('page')
       setPage(page)
  }

   if(isError){
     return<h2 className="text-red-600">{error.response}</h2>
   }

   function addCart(id){
      addUserCart(id)
        .then((req)=>{
          console.log(req);
          setNumsCartItems(req.data.numOfCartItems);
          toast.success(req.data.message);
          
        })
        .catch((err)=>{
          console.log(err);
          toast.error(err.response.data.message)
        })
   }

  return (
    <> 
      
     <Helmet>
        <title>Home</title>
      </Helmet>

      <Toaster/>
        {isLoading ?
          <div className="bg-slate-300 flex justify-center items-center h-screen">
        <span className="loader"></span>
         </div> 
      :
       <div className="w-10/12 mx-auto my-6">
        <MainSlider/>
        <CateorySlider/>
       
          <div className="flex flex-wrap">
          {data?.data?.data?.map( (product) => {
            let {_id, title,imageCover,price,category,ratingsAverage} = product;
            let {name} = category;
            return (
                    <div  
                          key={_id}
                          className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-2 mb-3">
                         
                          

                           <div className="item group border hover:border-active p-2 shadow-lg duration-500 overflow-hidden">
                             <Link to={`productdetails/${_id}`}>
                                <img src={imageCover} alt={title} className="w-full" />
                                <h5 className="text-active">{name}</h5>
                                <h2 className="">{title.split(' ').slice(0,2).join(' ')}</h2>
                                <div className="flex justify-between">
                                  <span>{price}EGP</span>
                                  <span>
                                    <i className="fa-solid fa-star text-yellow-300"></i>{ratingsAverage}
                                  </span>
                                </div>
                             </Link>
                            <button onClick={() => addCart(_id)} className="btn mt-3 translate-y-24 group-hover:translate-y-0 duration-500 ">
                                  Add To Cart
                            </button>
                        </div>
                         

                           
                          
                    </div>
            );
          })}
         </div>
     

          <nav aria-label="Page navigation example" className="mt-5 mb-10">
                    <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
                      <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          <span className="sr-only">Previous</span>
                          <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                          </svg>
                        </a>
                      </li>
                       
                       {new Array(data?.data?.metadata?.numberOfPages)
                       .fill(0)
                       .map((el,i)=>{
                         return (
                              <li onClick={getPageNumber} key={el}>
                                    <a 
                                       page={i + 1}
                                       className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                      {i + 1}
                                      </a>
                              </li>
                         )
                       })}
                      

                      <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          <span className="sr-only">Next</span>
                          <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                          </svg>
                        </a>
                      </li>
                    </ul>
          </nav>
        </div>
   }
         
    </>
    
  );
}
