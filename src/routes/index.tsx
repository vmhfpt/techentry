import { Navigate, Route, Routes } from "react-router-dom";
import Manager from "../page/[role]/(manager)/index";
import Dashboard from "../page/[role]/(manager)/dashboard/Dashboard";
import Layout from "../page";
import Billing from "../page/[role]/(manager)/billing";
import NotPage from "../page/(error)/404";
import Profile from "../page/[role]/(manager)/profile";

export default function Router() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Navigate to="admin" />} />
            <Route path="admin" element={<Manager/>}>
                <Route index element={<Navigate to="/admin/dashboard" />}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="billing" element={<Billing/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Route>
          </Route>
          <Route path="*" element={<NotPage/>}/>
        </Routes>
    </>
  );
}
