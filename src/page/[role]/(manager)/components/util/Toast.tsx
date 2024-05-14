import {  toast } from 'react-toastify';
import { SmileOutlined, FrownOutlined  } from '@ant-design/icons';
export const popupSuccess = (text : string) => {
    return toast.success(text, {
        icon : <SmileOutlined />,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
export const popupError = (text : string) => {
    toast.error(text, {
        icon : <FrownOutlined/>,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}