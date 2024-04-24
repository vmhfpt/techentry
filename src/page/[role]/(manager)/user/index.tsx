import { Outlet } from "react-router-dom";
import ListUser from "./_components/list";

export default function UserManagement(){
    return (
        <div>
            <ListUser />
            <Outlet />  
        </div>
    )
}