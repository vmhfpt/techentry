import { axiosClient } from "../api/axios";
import { Iuser } from "../common/types/user.interface";
export class BrandService {
    async list(){
        return await axiosClient.get('/brand');
    }
    async create(data : Iuser){
        return await axiosClient.post('/brand', data);
    }
    async findOneId(id : number){
        return await axiosClient.get(`/brand/${id}`);
    }
    async update(id : number, data : Iuser){
        return await axiosClient.put(`/brand/${id}`, data);
    }
    async delete(id : number){
        return await axiosClient.delete(`/brand/${id}`);
    }
}
export default new BrandService();