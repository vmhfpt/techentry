import { popupError } from "@/page/[role]/shared/Toast";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";

export default function GuardAdmin({ children }: any) {

    const [user] = useLocalStorage('user', undefined);
    if (!user) {
        popupError('Vui lòng đăng nhập trước!')
        return <Navigate to="/" />;
    } else {
        if (user?.role_id !== 1) {
            popupError('Bạn không có quyền truy cập!')
            return <Navigate to="/" />;
        }

    }
    return <> {children}</>

}