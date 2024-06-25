import React, { useRef, useState } from 'react'
import {EditOutlined} from '@ant-design/icons'
import { Flex, Form, Input } from 'antd';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { CloudUploadOutlined, DeleteOutlined  } from '@ant-design/icons';
import { popupError } from '@/page/[role]/shared/Toast';
import getRandomNumber from '@/utils/randomNumber';

interface attribute{
    id: string,
    value: string,
    image: File|null,
    url: string|null
}
interface variant{
id: string,
name: string,
attribute: attribute[]
}

interface ButtonEditProps {
    keyValue: string;
    handleRemoveDetail: (name: any) => void;
    detail: Array<variant>;
    setDetail: React.Dispatch<React.SetStateAction<any>>
    validateNoDuplicate: (any)=>void;
    validateOption: (any)=>void;
    show: number;
}

export default function Variant({keyValue, detail, show, setDetail, handleRemoveDetail, validateNoDuplicate, validateOption}:ButtonEditProps) {
    const [edit, setEdit] = useState(true);
    const [value, setValue] = useState('');
    const inputRef = useRef<null>(null);
    const [inputField, setinputField] = useState<number>(1);
    const [error, setError] = useState({});
    const [no, setNo] = useState<boolean>(false);

    const handelChangeParent = (e) => { 

        const parent = e.target.value;

        setValue(parent)
        const newFields = detail.map(field => {
            if (field.id === keyValue) {
              return {
                ...field,
                name: parent
              };
            }
            return field;
        });
        setDetail(newFields)
    }

    const handelRemoveOption = (id) => {        
        if(inputField > 1){
            const newFields = detail.map(field => {                
                if (field.id === keyValue) {
                    return {
                    ...field,
                    attribute: field.attribute.filter((item) => item.id != id)};
                }
                return field;
            });  
            setDetail(newFields)
            setinputField(inputField-1)
        }          
    }

    const handelAddField = (value, index, id) => {       

        if(index == inputField){            
            const newFields = detail.map(field => {                
                if (field.id === keyValue) {
                  return {
                    ...field,
                    attribute: [
                        ...field.attribute.map((attr)=>{                    
                            if(attr.id == id){
                                return {
                                    ...attr,
                                    value: value
                                }
                            }
                            return attr
                        }),
                        {
                            id: Date.now()+'',
                            value: ''
                        }
                    ]
                  };
                }
                return field
            });        
                
            setDetail(newFields)
            setinputField(inputField+1)            
        }else{            
            const newFields = detail.map(field => {
                if (field.id === keyValue) {
                  return {
                    ...field,
                    attribute: field.attribute.map((attr)=>{                    
                        if(attr.id == id){
                            return {
                                ...attr,
                                value: value
                            }
                        }
                        return attr
                    })
                  };
                }
                return field;
            });
    
            setDetail(newFields)
        }
    }

    const selectedImg = (e, id) => {        
        const types = [
          'jpeg',
          'png',
          'jpg',
          'gif',
        ]
    
        const fileSelected = e.target.files[0];    
    
        const size = fileSelected.size;
        const type = types.includes(fileSelected.type.replace('image/', ''));
    
        if (size <= 1048576 && type) {
            const newDetail = detail.map((item)=> {
                return {
                    ...item,
                    attribute: item.attribute.map((attr)=>{                    
                        if(attr.id == id){
                            return {
                                ...attr,
                                image: fileSelected,
                                url: URL.createObjectURL(fileSelected)
                            }
                        }
                        return attr
                    })
                };
            })
            setDetail(newDetail);
            
        } else {
            e.target.value = ''
        }
    
    }

    const handelRemoveImage = (id) => {
        const newDetail = detail.map((item)=> {
            return {
                ...item,
                attribute: item.attribute.map((attr)=>{                    
                    if(attr.id == id){
                        return {
                            ...attr,
                            image: null,
                            url: null
                        }
                    }
                    return attr
                })
            };
        })
        setDetail(newDetail)
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
                    <h2 className=' font-bold  inline-block'>{value}</h2>
                </div>
                <Form.Item
                    name={`input-${keyValue}`}
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trông',
                        },
                        {
                            validator: validateNoDuplicate(`input-`, setNo)
                        },
                        { max: 20, message: 'Tên không vượt quá 20 ký tự' },

                    ]}
                    className={`m-0 ${!edit ? 'hidden' : ''}`}
                >
                    <Input placeholder="Nhập vào" ref={inputRef} onBlur={(e)=>{e.target.value && !no && setEdit(false)}} onPressEnter={(e)=>{e.target.value && !no && setEdit(false)}} onChange={handelChangeParent}/>
                </Form.Item>
            </>

        </div>
        <hr/>
        <Flex className='' wrap gap={25}>
            {detail.find((item, i)=>item.id == keyValue).attribute.map((value, index) => (
                index < 5
                ?
                <Flex className='relative w-[23%]' key={index} justify='center' align='center' gap={10}>
                    {
                        show === 0
                        ?
                        <div style={{height: '50px', width: '50px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px] flex-[.9] ' >
                            {
                                value.url
                                ?
                                <div style={{ height: '100%', maxWidth: '100%' }} className='relative group'>
                                    <img src={value.url} alt="" className='object-cover h-[100%] object-center' style={{width: '100%' }} />
                                    <div className=" absolute inset-0 z-1 opacity-0 group-hover:opacity-100 duration-1000" style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}></div>
                                        <DeleteOutlined onClick={() => handelRemoveImage(value.id)} className=" duration-1000 opacity-0 group-hover:opacity-100 absolute left-[50%] top-[50%]" style={{transform: 'translate(-50%, -50%)', zIndex: 999, fontSize: "20px", color: 'white'}} />
                                </div>
                                :
                                <Flex className='border-dashed border-2 relative hover:bg-gray-100 hover:border-solid hover:border' vertical gap={10} justify='center' align='center' style={{ width: '100%', height: "100%", borderRadius: '12px' }}>
                                    <Flex vertical gap={10} style={{ width: '100%' }}>
                                        <Flex vertical align='center' justify='center'>
                                            <CloudUploadOutlined style={{ fontSize: '10px', color: 'gray' }} className='' />
                                        </Flex>
                                    </Flex>
                                    <input type="file" accept="image/*" name="image" id="image" multiple className='opacity-0 absolute inset-0'
                                        onChange={(e)=> selectedImg(e, value.id)}
                                    />
                                </Flex>
                            }
                        </div>
                        :
                        ''
                    }
                        <Form.Item 
                            name={`attr-value-${value.id}`}
                            className='m-0 relative flex-[3]' 
                            validateStatus={error[value.id] ? 'error' : ''}
                            help={<p className=' absolute'>{error[value.id]}</p>}
                            rules={[
                            {
                                required: true,
                                validator: (_, name) => {
                                    if(index == 0 && !name){
                                        setError((prevErrors) => ({
                                            ...prevErrors,
                                            [value.id]: 'Không được để trống',
                                        }));
                                        return Promise.reject();
                                    }

                                    if(index + 1 < inputField && !name){


                                        setError((prevErrors) => ({
                                            ...prevErrors,
                                            [value.id]: 'Không được để trống',
                                        }));
                                        return Promise.reject();
                                    }

                                    setError((prevErrors) => {
                                        const newErrors = { ...prevErrors };
                                        delete newErrors[value.id];
                                        return newErrors;
                                    });
                                    return Promise.resolve();
                                }
                            },
                            {
                                validator: validateOption('attr-value-', setError, value.id)
                            }
                        ]}
                        >
                            <Input placeholder='Nhập' onChange={(e)=>handelAddField(e.target.value, index+1, value.id)}/>
                            
                        </Form.Item>
                        {
                            index < inputField-1
                            ?
                                (
                                    <DeleteForeverRoundedIcon className='cursor-pointer absolute right-[2px]' onClick={(e)=>{handelRemoveOption(value.id)}} style={{color: 'red'}}/>
                                )
                            :
                            ''
                        }
                </Flex>
                :
                ''
            ))}
        </Flex>
    </Flex>
  )
}
