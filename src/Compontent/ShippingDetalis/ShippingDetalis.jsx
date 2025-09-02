import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function ShippingDetalis() {
  let {id} = useParams()

  const headerOptions = {
    headers:{
       token: localStorage.getItem('token')
    }
  }

  let shippingFormik =   useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
      onSubmit: checkOutSession
    })

    function checkOutSession(values){
        let data = {
        shippingAddress: values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/6858a02118fe5ce5536b2acd?url=http://localhost:5173`, data, headerOptions)
        .then((req)=>{
            window.open(req.data.session.url, "_self");
            console.log(req.data.session.url);
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log(values);
    }


  return (
 <div className="w-7/12 mx-auto my-5">
    <h1 className='my-3 text-active'> ShippingDetails</h1>

    <form onSubmit={shippingFormik.handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="details"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your details
        </label>
        <input
          value={shippingFormik.values.details}
          onChange={shippingFormik.handleChange}
          onBlur={shippingFormik.handleBlur}
          type="text"
          id="details"
          name="details"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {shippingFormik.touched.details && shippingFormik.errors.details ? (
          <p className="text-red-950">{shippingFormik.errors.details}</p>
        ) : (
            ""
          )}
        </div>


      <div className="mb-5">
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your city
        </label>
        <input
          value={shippingFormik.values.city}
          onChange={shippingFormik.handleChange}
          onBlur={shippingFormik.handleBlur}
          type="text"
          id="city"
          name="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {shippingFormik.touched.city && shippingFormik.errors.city ? (
          <p className="text-red-950">{shippingFormik.errors.city}</p>
        ) : (
            ""
          )}
        </div>


      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your phone
        </label>
        <input
          value={shippingFormik.values.phone}
          onChange={shippingFormik.handleChange}
          onBlur={shippingFormik.handleBlur}
          type="tel"
          id="phone"
          name="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {shippingFormik.touched.phone && shippingFormik.errors.phone ? (
          <p className="text-red-950">{shippingFormik.errors.phone}</p>
        ) : (
            ""
          )}
        </div>

     <button className='btn'>
        Pay
     </button>
      </form>
</div>
  )
}
