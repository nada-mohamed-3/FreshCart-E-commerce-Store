
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function UpdataPassword() {
 let navg = useNavigate()
  
 let [errorMessage, setErrorMessage] = useState(null);
  
  const baseUrl = "https://ecommerce.routemisr.com";
  
  let vaildYup = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    newPassword: Yup.string()
      .required("newPassword is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "newPassword invalid"
      ),
  });

  let initialValues = {
    email: "",
    newPassword: "",
  };
   function updataPasswordApi(x) {
    axios.put(`${baseUrl}/api/v1/auth/resetPassword`, x)
      .then((res) => {
        console.log(res.data);
        if(res.data.token){
          navg('/login')
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }
  let LoginForm = useFormik({
    initialValues,
    onSubmit:updataPasswordApi,
    validationSchema: vaildYup,
  });
  return (
    <div>
      <h2>Updata Password Now</h2>

      {errorMessage ?
       <div
        className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert">
        {errorMessage}
      </div> : ''}

      <form onSubmit={LoginForm.handleSubmit} className="w-7/12 mx-auto">
        

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            value={LoginForm.values.email}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {LoginForm.touched.email && LoginForm.errors.email ? (
            <p className="text-red-950">{LoginForm.errors.email}</p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your newPassword
          </label>
          <input
            value={LoginForm.values.newPassword}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="password"
            id="newPassword"
            name="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {LoginForm.touched.newPassword && LoginForm.errors.newPassword ? (
            <p className="text-red-950">{LoginForm.errors.newPassword}</p>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={!(LoginForm.isValid && LoginForm.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-25"
        >
          Updata Password
        </button>
      </form>
    </div>
  );
}

