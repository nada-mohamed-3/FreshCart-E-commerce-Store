
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContextProvider'
import { data } from 'autoprefixer'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
 


export default function Cart() {
  let {getUserCart, deleteUserCart, setNumsCartItems, clearUserCart, updateCartItemeCount} = useContext(CartContext)
  let [CartData, setCartData] = useState(null)
  let [loading, setLoading] = useState(true)
  
 
  useEffect(()=>{
      getCartData()
  }, [])

  function getCartData(){
    setLoading(true)
    getUserCart()
    .then((req)=>{
      console.log(req.data.data);
      setCartData(req.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  function removeItem(id){
    deleteUserCart(id)
    .then((req)=>{
      console.log(req);
      setNumsCartItems(req.data.numOfCartItems);
      setCartData(req.data.data);
      toast.success('product removed successfully')
    })
    .catch((err)=>{
      console.log(err);
    })
  }
   
  function updateCount(id, count){
    document.getElementById(id).innerHTML = '<i class="fa-solid fa-spinner fa-spin text-active"></i>'
    updateCartItemeCount(id, count)
    .then((req)=>{
      console.log(req);
      setCartData(req.data.data);
      document.getElementById(id).innerHTML = count;
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  function clearItems(){
    clearUserCart()
    .then((req)=>{
      console.log(req);
      if(req.data.message == 'success'){
          setNumsCartItems(null);
          setCartData(null);
          toast.success('cart cleared successfully');
      }
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  if (loading) {
    return(
           <div className="bg-slate-300 flex justify-center items-center h-screen">
               <span className="loader"></span>
          </div> 
    )
    
  }



  return (
   <>

    <Helmet>
        <title>Cart</title>
      </Helmet>


   <Toaster/>
     {CartData ?.products.length > 0 ?
          <div className='w-11/12 mx-auto my-5'>
          
         <div className="bg-gray-200">
            <h1 className='text-2xl'>Shop Cart</h1>
            
              <div className="flex justify-between">
                   <h2 className='text-2xl text-active'>Total Cart Price : {CartData?.totalCartPrice}EGP</h2> 
                   <button onClick={clearItems} className='bg-red-600 text-white px-2 mx-3 py-2 rounded'>Clear Cart</button>   
              </div>


            <div className="divide-y-2 divide-gray-300">
              
              {CartData?.products?.map((item)=>{
                return(
                      <div key={item._id} className="flex items-center p-3">
                          <div className="w-10/12">
                              <div className="flex justify-around">
                                    <div className="w-1/12">
                                        <img src={item.product.imageCover} alt="" className='w-full' />
                                    </div>
                                    <div className="w-10/12">
                                      <h2>{item.product.title}</h2>
                                      <h2 className='text-active my-3'>Price : {item.price}</h2>
                                      <button onClick={() => removeItem(item.product._id)} className='border border-red-500 px-5 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white'>
                                        <i  className='fas fa-trash-can mr-2'></i>
                                          Remove
                                        </button>
                                    </div>
                              </div>
                          </div>

                          <div className="w-2/12">
                            <i onClick={() => updateCount(item.product._id, item.count + 1)} className='fa-solid fa-plus border border-active p-2 rounded cursor-pointer'></i>
                             
                             <span id={item.product._id} className='mx-2'>
                              {item.count}
                              </span>

                            <i onClick={() => updateCount(item.product._id, item.count - 1)} className='fa-solid fa-minus border border-active p-2 rounded cursor-pointer'></i>
                          </div>
                  </div>
                )
              })}
                
            </div>

            <Link to={'/shippingdetalis/'+CartData._id} className='btn block text-center'>
               Pay  <i className='fa-brands fa-cc-visa'></i>
            </Link>
         </div>
      </div>
     
      
      :
  
     <div className='bg-red-400 text-center'>No Data</div>}


   </>
  )
  
}
