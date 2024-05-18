import { Outlet } from "react-router-dom";
import ListAttribute from "./_components/list";

export default function AttributeManagement(){
    return (
        <div>
            <ListAttribute />
            <Outlet />  
        </div>
    )
}