import { Outlet } from "react-router-dom";
import ListProduct from "./_components/list";

export default function ProductManagement(){
    return (
        <div>
            <ListProduct />
            <Outlet />  
        </div>
    )
}