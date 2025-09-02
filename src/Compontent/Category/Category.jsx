import React from 'react'
import useApi from '../../Hooks/useApi'
import { Helmet } from 'react-helmet'

export default function Category() {
 let {isLoading ,data , isError ,error} = useApi('categories')
 
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
        <title>Category</title>
      </Helmet>

     <div className="flex flex-wrap">
      
          {data?.data?.data?.map((category)=>{
             return(
                <div key={category._id} className='w-3/12'>
                    <img src={category.image} className='h-48 w-full object-cover object-top' alt="" />
                    <h5 className='text-center'>{category.name}</h5>
                </div>
             )
        })}
      
     </div>
     
  </>
  )
     
}
