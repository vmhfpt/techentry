import { Input, Upload } from "antd";
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import getRandomNumber from "@/utils/randomNumber";
import { useRef, useState } from "react";
export default function FirstHandle({first,setFirst, checkFirst, setCheckFirst} : any){
  
 
 
   const onChangeFirst = (value : string, id : number) => {
    
     setFirst((prev : any) => {
        return {
          ...prev,
          value : prev.value.map((item : any) => {
              if(item.id == id){
                return {
                   ...item,
                   [first.name] : value
                }
              }else {
                return item
              }
              
          })
        }
     })
     if(checkFirst == id){
        const numberId = getRandomNumber();
        setFirst((prev : any) => {
          return {
            ...prev,
            value : [...prev.value, {  
              id : numberId, 
              image : 'File',
              [first.name] : '',

             }
            ]
          }
        })
        setCheckFirst(numberId);
     }


   }

   const onDelete = (id : number) => {
    setFirst((prev : any) => {
       return {
           ...prev,
           value : prev.value.filter((item : any) => item.id != id)
       }
    })
 }
   
     return ( <>
     {first.value.map((item : any, key : number) => (<div key={key} className=" flex gap-[6px] items-center ">
     <div  className="w-[70px] h-[70px]">
        <Upload
             
             name="avatar"
             listType="picture-card"
             className="avatar-uploader"
             showUploadList={false}
             beforeUpload={() => {}}
             onChange={() => {}}
         >
             <button style={{ border: 0, background: 'none' }} type="button">
                <FileImageOutlined />
             </button>
         </Upload>
     </div>

     <div className="w-full" >
         <Input value={item[first.name]} onChange={(e) => onChangeFirst(e.target.value, item.id)} placeholder="Nhập" />
     </div>

     <div className="w-[50px] cursor-pointer">
        {item.id != checkFirst && <DeleteOutlined onClick={()=> onDelete(item.id)} style={{color : 'red'}}/>}  
     </div>
 </div>))}
      
     </>)
}