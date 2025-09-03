
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContextProvider";
import { Helmet } from "react-helmet";




export default function Login() {
 let {setToken} = useContext(AuthContext)
 let navg = useNavigate()
  
 let [errorMessage, setErrorMessage] = useState(null);
  
  const baseUrl = "https://ecommerce.routemisr.com";
  
  let vaildYup = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password invalid"
      ),
  });

  let initialValues = {
    email: "",
    password: "",
  };
   function LoginApi(x) {
    axios.post(`${baseUrl}/api/v1/auth/signin`, x)
      .then((res) => {
        if(res.data.message == 'success'){
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
             navg('/')
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }
  let LoginForm = useFormik({
    initialValues,
    onSubmit:LoginApi,
    validationSchema: vaildYup,
  });
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h2>Login Now</h2>

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
            Your Password
          </label>
          <input
            value={LoginForm.values.password}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {LoginForm.touched.password && LoginForm.errors.password ? (
            <p className="text-red-950">{LoginForm.errors.password}</p>
          ) : (
            ""
          )}
        </div>

        <Link to='/forgotPasswords'>Forgot Password ? </Link>

        <button
          disabled={!(LoginForm.isValid && LoginForm.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-25"
        >
          Login
        </button>
      </form>
    </div>
  );
}
