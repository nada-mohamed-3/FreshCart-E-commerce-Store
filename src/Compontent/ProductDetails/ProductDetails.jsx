import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'

export default function ProductDetails() {
  let {id} = useParams()

  let { addUserCart, setNumsCartItems } = useContext(CartContext)

   let {data,isLoading} = useQuery({
  queryKey: ['productDetails', id],
  
  queryFn: function(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  })

  function changeImage(e){
      let imgSrc = e.target.getAttribute('src')
      document.getElementById('myImage').setAttribute('src',imgSrc)
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

   let product = data?.data?.data
  
  return (
    <>
    <Toaster/>
    {isLoading ?
     <div className="bg-slate-300 flex justify-center items-center h-screen">
        <span className="loader"></span>
         </div>
          :
        <div className="w-10/12 mx-auto my-5">
          <div className='flex justify-between items-center'>

        <div className="w-3/12">
           <img src={product?.imageCover} id='myImage' className='w-full' alt="" />
            <div className=" flex">
              {product?.images.map((image,i)=>{
              return(
                <div key={i}>
                  <img src={image} onClick={changeImage} className=' w-full object-cover' alt="" />
                </div>
              )
            })}
            </div>
           
           
           
           {/* <Slider dots>
            {product?.images.map((image,i)=>{
              return(
                <div key={i}>
                  <img src={image} className=' w-full' alt="" />
                </div>
              )
            })}
           </Slider> */}
        </div>

        <div className="w-8/12">
           <h1>{product?.title}</h1>
           <p className=' text-gray-500 my-5'>{product?.description}</p>
           <div className="flex justify-between">
              <span>{product?.price}EGP</span>
              <span>
                <i className="fa-solid fa-star text-yellow-300"></i>{product?.ratingsAverage}
              </span>
            </div>
            <button onClick={() => addCart(id)} className="btn mt-5 ">
              Add To Cart
            </button>
        </div>

    </div>
       </div>
         }
    </>
  )
}
