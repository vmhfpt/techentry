import { Outlet } from "react-router-dom";
import ListBrand from "./_components/list";

export default function BrandManagement(){
    return (
        <div>
            <ListBrand />
            <Outlet />  
        </div>
    )
}