
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgotPasswords() {
  let navg = useNavigate()
 let [errorMessage, setErrorMessage] = useState(null);
 let [formDisplay, setformDisplay] = useState(true);
  
  const baseUrl = "https://ecommerce.routemisr.com";
  

  let vaildYup = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  let initialValues = {
    email: "",
  };
    function forgotPasswordApi(x) {
    axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, x)
      .then((res) => {
        if(res.data.statusMsg == "success"){
          setformDisplay(false)
        }
        
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }
  let forgetForm = useFormik({
    initialValues,
    onSubmit:forgotPasswordApi,
    validationSchema: vaildYup,
  });






   function verifyResetCodeApi(data){
     axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,data)
      .then((res) => {
        if(res.data.status =='Success'){
              navg('/updataPassword')   
        }     
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
   }
   let vaildYup2 = Yup.object({
    resetCode: Yup.string().required("resetCode is required")
  });
  let verifyResetCode = useFormik({
    initialValues:{
      resetCode:'',
    },
    onSubmit:verifyResetCodeApi,
    validationSchema: vaildYup2,
  });



  return (
    <>
   


    {formDisplay ?
    <div>
      <h2>Forget password</h2>

      {errorMessage ?
       <div
        className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert">
        {errorMessage}
      </div> : ''}

      <form onSubmit={forgetForm.handleSubmit} className="w-7/12 mx-auto">
        

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            value={forgetForm.values.email}
            onChange={forgetForm.handleChange}
            onBlur={forgetForm.handleBlur}
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {forgetForm.touched.email && forgetForm.errors.email ? (
            <p className="text-red-950">{forgetForm.errors.email}</p>
          ) : (
            ""
          )}
        </div>


        <button
          disabled={!(forgetForm.isValid && forgetForm.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-25"
        >
          Sent
        </button>
      </form>
    </div> 
    





  
   :   
    <div>
      <h2>Rest Code </h2>

      {errorMessage ?
       <div
        className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert">
        {errorMessage}
      </div> : ''}

      <form onSubmit={verifyResetCode.handleSubmit} className="w-7/12 mx-auto">
        

        <div className="mb-5">
          <label
            htmlFor="resetCode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
             restCode
          </label>
          <input
            value={verifyResetCode.values.resetCode}
            onChange={verifyResetCode.handleChange}
            onBlur={verifyResetCode.handleBlur}
            type="text"
            id="resetCode"
            name="resetCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {verifyResetCode.touched.resetCode && verifyResetCode.errors.resetCode ? (
            <p className="text-red-950">{verifyResetCode.errors.resetCode}</p>
          ) : (
            ""
          )}
        </div>


        <button
          disabled={!(verifyResetCode.isValid && verifyResetCode.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-25"
        >
          Verify  Code
        </button>
      </form>
    </div>  
  }

    















    


    </>
  );
}

