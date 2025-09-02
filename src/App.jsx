
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Compontent/Layout/Layout'
import Home from './Compontent/Home/Home'
import Cart from './Compontent/Cart/Cart'
import Login from './Compontent/Login/Login'
import SignUp from './Compontent/SignUp/SignUp'
import NotFount from './Compontent/Notfound/NotFount'
import Brand from './Compontent/Brand/Brand'
import Category from './Compontent/Category/Category'
import ForgotPasswords from './Compontent/forgotPassword/forgotPasswords'
import UpdataPassword from './Compontent/UpdataPassword/UpdataPassword'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectdRouting from './Compontent/ProtectdRouting/ProtectdRouting'
import ProductDetails from './Compontent/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContextProvider'
import ShippingDetalis from './Compontent/ShippingDetalis/ShippingDetalis'
import { Offline} from 'react-detect-offline'

function App() {
      
  let router = createHashRouter([
      {
        path: '',
        element: <Layout/>,
        children:[
           {index:true, element:<ProtectdRouting><Home/></ProtectdRouting>},
           {path:'cart', element:<ProtectdRouting><Cart/></ProtectdRouting>},
           {path:'brand', element:<ProtectdRouting><Brand/></ProtectdRouting>},
           {path:'category', element:<ProtectdRouting><Category/></ProtectdRouting>},
           {path:'shippingdetalis/:id', element:<ProtectdRouting><ShippingDetalis/></ProtectdRouting>},
           {path:'productdetails/:id', element:<ProtectdRouting><ProductDetails/></ProtectdRouting>},
           {path:'login', element:<Login/>},
           {path:'register', element:<SignUp/>},
           {path:'forgotPasswords', element:<ForgotPasswords/>},
           {path:'updataPassword', element:<UpdataPassword/>},
           {path:'*', element:<NotFount/>},
        ]
      }
    ])

    let client = new QueryClient()


  return (
    <>
      
        <QueryClientProvider client={client}>
            <ReactQueryDevtools></ReactQueryDevtools>
              <AuthContextProvider>
                <CartContextProvider>
                  <RouterProvider router={router}></RouterProvider>
                </CartContextProvider>
              </AuthContextProvider>
        </QueryClientProvider>
    
    
    <Offline>
        <div className='fixed bottom-6 left-7 bg-red-400 p-3 rounded'>
            You're offline right now. Check your connection.
        </div> 
    </Offline>
        
    </>
  )
}

export default App
