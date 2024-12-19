import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminFeatures from "./pages/admin-view/features"
import AdminOrders from "./pages/admin-view/orders"
import AdminProducts from "./pages/admin-view/products"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingListing from "./pages/shopping-view/lsting"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingAccount from "./pages/shopping-view/account"
import CheckAuth from "./components/common/check-auth"
import UnAuthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "./components/ui/skeleton"
import PaypalReturnPage from "./pages/shopping-view/paypal-return"
import PaymentSuccessPage from "./pages/shopping-view/payment-success"
import SearchProducts from "./pages/shopping-view/search"
import { LoaderCircleIcon } from "lucide-react"

function App() {
 const {isAuthenticated, user, isLoading} = useSelector(state => state.auth)
 const dispatch = useDispatch()

 useEffect(()=>{
  const token = JSON.parse(sessionStorage.getItem("token"))
  dispatch(checkAuth(token))
 }, [dispatch])



 if(isLoading){
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      <LoaderCircleIcon className="animate-spin" size={60} color="black"/>
      <h1 className="text-6xl font-bold mb-10 mt-10">
        E-Commerce
      </h1>
    </div>
  )
 } 



  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>

        <Route 
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
            }
        />
        
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>        
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>        
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>        
        }>
          <Route path="home" element={<ShoppingHome />}/>
          <Route path="listing" element={<ShoppingListing />}/>
          <Route path="checkout" element={<ShoppingCheckout />}/>
          <Route path="account" element={<ShoppingAccount />}/>
          <Route path="paypal-return" element={<PaypalReturnPage />}/>
          <Route path="payment-success" element={<PaymentSuccessPage />}/>
          <Route path="search" element={<SearchProducts />}/>

        </Route>

        <Route path="*" element={<NotFound />}/>

        <Route path="/unauth-page" element={<UnAuthPage />}/>

      </Routes>

    </div>
  )
}

export default App
