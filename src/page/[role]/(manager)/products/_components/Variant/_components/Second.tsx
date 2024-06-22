import { Input } from "antd";
import {  DeleteOutlined } from '@ant-design/icons';
import getRandomNumber from "@/utils/randomNumber";
export default function SecondHandle({second, setSecond, checkFirst2, setCheckFirst2} : any) {
    const onChangeSecond = (value : string, id : number) => {
       
        setSecond((prev : any) => {
           return {
             ...prev,
             value : prev.value.map((item : any) => {
                 if(item.id == id){
                   return {
                      ...item,
                      [second.name] : value
                   }
                 }else {
                   return item
                 }
                 
             })
           }
        })
        if(checkFirst2 == id){
           const numberId = getRandomNumber();
           setSecond((prev : any) => {
             return {
               ...prev,
               value : [...prev.value, { id : numberId,[second.name] : ''}]
             }
           })
           setCheckFirst2(numberId);
        }
   
   
      }

      const onDelete = (id : number) => {
         setSecond((prev : any) => {
            return {
                ...prev,
                value : prev.value.filter((item : any) => item.id != id)
            }
         })
      }
  
    return (
        <>
          {second.value.map((item : any) => (

            <div key={item.id} className=" flex gap-[6px] items-center ">
                            
            <div className="w-full">
                <Input value={item[second.name]}  onChange={(e) => onChangeSecond(e.target.value, item.id)}  placeholder="Nhập" />
            </div>
            <div className="w-[50px] cursor-pointer" >
               {item.id != checkFirst2 && <DeleteOutlined onClick={() => onDelete(item.id)} style={{color : 'red'}}/>}  
            </div>
            </div>
          ))}
        
        </>
 
  )
}