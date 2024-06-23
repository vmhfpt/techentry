import React, { Children, useEffect, useRef, useState } from 'react'
import {EditOutlined} from '@ant-design/icons'
import { Flex, Form, Input } from 'antd';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import getRandomNumber from '@/utils/randomNumber';
interface ButtonEditProps {
    item : any;
    keyValue: string;
    handleRemoveDetail: (name: any) => void;
    detail: Array<object>;
    setDetail: React.Dispatch<React.SetStateAction<any>>
    validateNoDuplicate: (any)=>void;
    validateOption: (any)=>void
  }

export default function ButtonEditNext({item, keyValue, detail, setDetail, handleRemoveDetail, validateNoDuplicate, validateOption}:ButtonEditProps) {
    //console.log(item, keyValue, detail)
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef<null>(null);
    const [inputField, setinputField] = useState<number>(1);
    const [error, setError] = useState({});
    const [no, setNo] = useState(false);

    const [lastId, setLastId] = useState<any>(0)
    useEffect(() => {
        setLastId(item.attribute[item.attribute.length - 1].id);
    }, [detail, item, keyValue])
    

    const handelChangeParent = (value) => {    
        setValue(value)
        const newFields = detail.map(field => {
            if (field.id === keyValue) {
              return {
                ...field,
                name: value
              };
            }
            return field;
        });
        setDetail(newFields)
    }
  
    const handelRemoveOption = (secondId : any, firstId : any) => {   
       
        setDetail((prev : any) => {
            return prev.map((item : any) => {
                if(item.id == firstId){
                   console.log(item.attribute, secondId)
                   return {
                    ...item,
                    attribute : item.attribute.filter((i : any) => i.id != secondId)
                   }
                }else {
                    return item;
                }
                
            })
        })   

           
    }

    const handelAddField = (value : any, firstId : any, secondId : any) => {        
       
        setDetail((prev : any) => {
            if(secondId == lastId){
                return prev.map((item : any) => {
                    if(item.id == firstId){
                 
                       return {
                        ...item,
                        attribute : [...item.attribute.map((item1 : any) => {
                            if(item1.id == secondId){
                                return {
                                    ...item1,
                                    value : value
                                }
                            }else {
                                return item1;
                            }
                        }), {
                            id : getRandomNumber(),
                            value : ""
                        }]



                       }
                    }else {
                        return item;
                    }
                    
                })
            }else {
                return prev.map((item : any) => {
                    if(item.id == firstId){
                 
                       return {
                        ...item,
                        attribute : item.attribute.map((item1 : any) => {
                            if(item1.id == secondId){
                                return {
                                    ...item1,
                                    value : value
                                }
                            }else {
                                return item1;
                            }
                        })
                       }
                    }else {
                        return item;
                    }
                    
                })
            }
            
        })
    }
    const onBrulFirst = (value : any, id : any)  => {
        setEdit(false)
        if(!value){
            return true;
        }
        setDetail((prev : any) => {
            return prev.map((item : any) => {
                if(item.id == id){
                    return {
                        ...item,
                        name : value
                    }
                }else {
                    return item;
                }
            })
        })
    }
  return (
    <Flex vertical gap={20} className='border border-1 rounded-md overflow-hidden relative p-8 px-10' style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}>

        <CloseRoundedIcon className=' absolute right-1 top-1 cursor-pointer' onClick={()=>{handleRemoveDetail(keyValue)}}/>

        <div>
            <>
                <div className={`relative inline pr-5 ${edit ? 'hidden' : ''}`} >
                    <EditOutlined onClick={()=>{
                        setEdit(true);
                        setTimeout(() => {
                            if (inputRef.current) {
                            inputRef.current.focus();
                            }
                        }, 0);
                        }} className=' absolute top-0 right-0 hover:cursor-pointer'/>
                    <h2 className=' font-bold  inline-block'>{item.name}</h2>
                </div>
                <Form.Item
                   
                    name={`input-${keyValue}`}
                 
                    className={`m-0 ${!edit ? 'hidden' : ''}`}
                >
                    <Input defaultValue={item.name}  placeholder="Nhập vào" ref={inputRef} onBlur={(e)=> onBrulFirst(e.target.value, item.id)} onPressEnter={(e)=>{e.target.value && !no && setEdit(false)}} onChange={(e)=>handelChangeParent(e.target.value)}/>
                </Form.Item>
            </>

        </div>
        <hr/>
        <Flex className='' wrap gap={30}>
            {detail.find((item, i)=>item.id == keyValue).attribute.map((value, index) => (
                <Flex className='relative' key={index} justify='center' align='center' gap={10}>
                    <Form.Item 
                    name={`attr-value-${value.id}`}
                    className='m-0' 
                    validateStatus={error[value.id] ? 'error' : ''}
                    help={<p className=' absolute'>{error[value.id]}</p>}
                    
                >
                        <Input defaultValue={value.value}  placeholder='Nhập' onChange={(e)=>handelAddField(e.target.value, item.id, value.id)}/>
                    </Form.Item>
                    {
                       value.id != lastId && <DeleteForeverRoundedIcon className='z-10 cursor-pointer' onClick={(e)=>{handelRemoveOption(value.id, item.id)}} style={{color: 'red'}}/>
                    }
                </Flex>
            ))}
        </Flex>
    </Flex>
  )
}
