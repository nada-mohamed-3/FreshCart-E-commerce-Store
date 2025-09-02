import React from 'react'
import useApi from '../../Hooks/useApi'
import { Helmet } from 'react-helmet'

export default function Brand() {

  let {isLoading ,data , isError ,error} = useApi('brands')
   
   if(isLoading){
      return(
        <div className="bg-slate-300 flex justify-center items-center h-screen">
            <span className="loader"></span>
        </div> 
      )
    }

    if(isError){
     return<h2 className="text-red-600">{error.response.data.message}</h2>
   }


 return (
 <>
      <Helmet>
        <title>Brand</title>
      </Helmet>


     <div className="flex flex-wrap">
      
          {data?.data?.data?.map((brand)=>{
             return(
                <div key={brand._id} className='w-3/12'>
                    <img src={brand.image} className='h-48 w-full object-cover object-top' alt="" />
                    <h5 className='text-center'>{brand.name}</h5>
                </div>
             )
        })}
      
     </div>
     
  </>
  )
}
