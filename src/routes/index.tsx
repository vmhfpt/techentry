import { Navigate, Route, Routes } from "react-router-dom";
import Manager from "../page/[role]/(manager)/index";
import Dashboard from "../page/[role]/(manager)/dashboard/Dashboard";
import Layout from "../page";
import Billing from "../page/[role]/(manager)/billing";
import NotPage from "../page/(error)/404";
import Profile from "../page/[role]/(manager)/profile";
import Base from "../page/[role]/(base)";
import PageHome from "../page/[role]/(base)/PageHome";


import UserManagement from "../page/[role]/(manager)/user";
import AddUser from "../page/[role]/(manager)/user/_components/add";
import EditUser from "../page/[role]/(manager)/user/_components/edit";
import ProductDetailPage from "../page/[role]/(base)/ProductDetailPage/ProductDetailPage";
import CartPage from "../page/[role]/(base)/ProductDetailPage/CartPage";
import CategoryManagement from "../page/[role]/(manager)/category";
import AddCategory from "../page/[role]/(manager)/category/_components/add";
import EditCategory from "../page/[role]/(manager)/category/_components/edit";
import PageCategory from "../page/[role]/(base)/CategoryPage/PageCategory";
import CheckoutPage from "../page/[role]/(base)/PageCheckout/CheckoutPage";



export default function Router() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout/>}>

            <Route index element={<Navigate to={'/home'}/>}/>
            <Route path="home" element={<Base/>}>
                <Route index element={<PageHome/>}/>
                <Route path="" element={<ProductDetailPage/>}/>
            </Route>

            <Route path="" element={<Base/>}>
                <Route path="cart" element={<CartPage />}/>
                <Route path="checkout" element={<CheckoutPage />}/>
                <Route path="category/:slug" element={<PageCategory />}/>
                <Route path=":slug" element={<ProductDetailPage/>}/>
            </Route>


            <Route path="admin" element={<Manager/>}>
                <Route index element={<Navigate to="/admin/dashboard" />}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="billing" element={<Billing/>}/>
                <Route path="profile" element={<Profile/>}/>


                <Route path="users" element={<UserManagement />}>
                  <Route path="add" element={<AddUser />} />
                  <Route path=":id" element={<EditUser />} />
               </Route>


               <Route path="categories" element={<CategoryManagement />}>
                  <Route path="add" element={<AddCategory />} />
                  <Route path=":id" element={<EditCategory />} />
               </Route>


            </Route>
          </Route>
          <Route path="*" element={<NotPage/>}/>
        </Routes>
    </>
  );
}
