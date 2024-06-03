import { Outlet } from "react-router-dom";
import ListVoucher from "./_components/list";

export default function VoucherManagement(){
    return (
        <div>
            <ListVoucher />
            <Outlet />  
        </div>
    )
}