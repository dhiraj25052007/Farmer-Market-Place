import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import FarmerDashboard from "./pages/Farmer/FarmerDashboard.jsx";
import CustomerDashboard from "./pages/Customer/CustomerDashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Footer from "./components/Footer.jsx";
import AddProduct from "./pages/Farmer/AddProduct.jsx";
import MyProducts from "./pages/Farmer/MyProducts.jsx";
import EditProduct from "./pages/Farmer/EditProduct.jsx";
import Statistics from "./pages/Farmer/Statistics.jsx";
import ProductDetail from "./pages/Customer/ProductDetail.jsx";
import Wishlist from "./pages/Customer/Wishlist.jsx";
import Cart from "./pages/Customer/Cart.jsx";
import axios from "axios";
import FarmerAnimation from "./components/FarmerAnimation.jsx";
import CustomerAnimation from "./components/CustomerAnimation.jsx";
import UnauthorizedAnimation from "./components/UnauthorizedAnimation.jsx";
import PageNotFoundAnimation from "./components/PageNotFound.jsx";
import FAQs from "./pages/Customer/FAQs.jsx";
import Roadmap from "./pages/Farmer/Roadmap.jsx";
import ViewOrder from "./pages/Customer/ViewOrder.jsx";
import Notification from "./pages/Farmer/Notification.jsx";
import { Toaster } from "react-hot-toast";
import CustomerLayout from "./Layouts/CustomerLayout.jsx";
import DashboardHome from "./pages/Customer/DashboardHome.jsx";
import Profile from "./pages/Customer/Profile.jsx";
import Fprofile from "./pages/Farmer/Fprofile.jsx";
import FarmerLayout from "./Layouts/FarmerLayout.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import OrderTracking from "./pages/Customer/orderTracking.jsx";
import Certification from "./pages/Certification.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import EditFProfile from "./pages/EditFProfle.jsx";

axios.defaults.withCredentials = true;

function AppRoutes() {
  const { loggedIn } = useAuth();

  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route element={<MainLayout/>}> */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certificate" element={<Certification />} />

        <Route path="/unauthorized" element={<UnauthorizedAnimation />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products/:id" element={<ProductDetail />} />

        <Route
          path="/dashboard/customeranimation"
          element={<ProtectedRoute allowedRoles={["customer"]} />}
        >
          <Route index element={<CustomerAnimation />} />
        </Route>

        <Route
          path="/dashboard/farmeranimation"
          element={<ProtectedRoute allowedRoles={["farmer"]} />}
        >
          <Route index element={<FarmerAnimation />} />
        </Route>

        <Route
          path="/customer/dashboard1"
          element={<ProtectedRoute allowedRoles={["customer"]} />}
        >
          <Route element={<CustomerLayout />}>
            <Route index element={<Profile />} />
            <Route path="ViewOrder" element={<ViewOrder />} />
            <Route path="edit-profile" element={<EditProfile />} />

            <Route path="track-order/:id" element={<OrderTracking />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="FAQs" element={<FAQs />} />
          </Route>
        </Route>

        <Route
          path="/farmer/dashboard1"
          element={<ProtectedRoute allowedRoles={["farmer"]} />}
        >
          <Route element={<FarmerLayout />}>
            <Route index element={<Fprofile />} />
            <Route path="Fprofile" element={<Fprofile />} />
            <Route path="edit-profile" element={<EditFProfile />} />

            <Route path="add-product" element={<AddProduct />} />
            <Route path="my-products" element={<MyProducts />} />
            <Route path="editproducts" element={<EditProduct />} />
            <Route path="stats" element={<Statistics />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="notification" element={<Notification />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFoundAnimation />} />

        {/* </Route> */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />

      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
