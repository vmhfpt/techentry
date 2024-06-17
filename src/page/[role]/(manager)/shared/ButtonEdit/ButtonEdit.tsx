import React, { useRef, useState } from 'react'
import {EditOutlined} from '@ant-design/icons'
import { Flex, Form, Input } from 'antd';

export default function ButtonEdit() {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState('Mới');
    const inputRef = useRef<null>(null);
    const [inputCount, setinputCount] = useState(2);
    
  return (
    <div className=' border border-2 rounded-md overflow-hidden'>
        <div className='border-b-2 p-4  '>
            {
                !edit
                ?
                (
                    <div className='relative inline pr-5'>
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
                )
                :
                <Input placeholder="Filled" ref={inputRef} variant="filled" defaultValue={value} onBlur={()=>{setEdit(false)}} onPressEnter={()=>{setEdit(false)}} onChange={(e)=>setValue(e.target.value)}/>
            }
        </div>
        <Flex className='p-4' wrap gap={30}>
            {Array.from({length: inputCount}, (_, index) => (
                <div className='w-[30%]' key={index}>
                    <Form.Item>
                        <Input placeholder='Nhập'/>
                    </Form.Item>
                </div>
            ))}
        </Flex>
    </div>
  )
}
