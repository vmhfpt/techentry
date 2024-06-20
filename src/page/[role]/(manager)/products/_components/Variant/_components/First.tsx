import { Input, Upload } from "antd";
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import getRandomNumber from "@/utils/randomNumber";
import type { GetProp, UploadProps } from 'antd';

import { useRef, useState } from "react";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
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
              image : null,
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

 const handleChangeFile: any = (dataFile: any, id: any) => {
   setFirst((prev : any) => {
      return {
        ...prev,
        value : prev.value.map((item : any) => {
            if(item.id == id){
              return {
                 ...item,
                 image : dataFile
              }
            }else {
              return item
            }
            
        })
      }
   })
   return false;
  
 };

 const onRemoveImage = (id: any) => {
  
   setFirst((prev : any) => {
      return {
        ...prev,
        value : prev.value.map((item : any) => {
            if(item.id == id){
              return {
                 ...item,
                 image : null
              }
            }else {
              return item
            }
            
        })
      }
   })
 };

   
     return ( <>
     {first.value.map((item : any) => (<div key={item.id} className=" flex gap-[6px] items-center ">
     <div  className="w-[70px] h-[70px] upload-custom">
        <Upload
             
             
             listType="picture-card"
             className=" w-full "
             beforeUpload={(files) => handleChangeFile(files, item.id)}
             onRemove={() => onRemoveImage(item.id)}
         >
            {item.image ? null :  <button style={{ border: 0, background: 'none' }} type="button">
                <FileImageOutlined />
             </button>}
            
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