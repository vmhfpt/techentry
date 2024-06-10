import { Dispatch } from "@reduxjs/toolkit";
import { ISignin, ISignup } from "@/common/types/Auth.interface";
import { SigninService } from "@/services/AuthService";

export const Signin = (payload: ISignin) => async (dispatch: Dispatch) => {
    try{
        const {data} = await SigninService(payload)

        if(data && data.success == true){
            localStorage.setItem('user', JSON.stringify(data.result.data));
            console.log(localStorage.getItem('user'));
        }
    }catch(e){
        console.log(e);
        
    }
}