import instance from "@/api/axios";
import { ISignin, ISignup } from "@/common/types/Auth.interface";
import { Iuser } from "@/common/types/user.interface";

export const SigninService = (payload: ISignin) => {
    console.log(payload);
    
    return instance.post('auth/login', payload)
}

export const Signup = (payload: ISignup) => {
    return instance.post('auth/signup', payload)
}