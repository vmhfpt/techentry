import { axiosClient } from "../api/axios";
import { Iuser } from "../common/types/user.interface";
export class UserService {
    async index(){
        return await axiosClient.get('/users');
    }
    async create(data : Iuser){
        return await axiosClient.post('/users', data);
    }
    async findOneId(id : number){
        return await axiosClient.get(`/users/${id}`);
    }
    async update(id : number, data : Iuser){
        return await axiosClient.put(`/users/${id}`, data);
    }
    async delete(id : number){
        return await axiosClient.delete(`/users/${id}`);
    }
}
export default new UserService();