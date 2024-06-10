import { Outlet } from "react-router-dom";
import ListColor from "./_components/list";

export default function ColorManagement(){
    return (
        <div>
            <ListColor />
            <Outlet />  
        </div>
    )
}