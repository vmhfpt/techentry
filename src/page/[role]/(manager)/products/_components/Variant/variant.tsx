import { Badge, Button, Card, Input, Upload } from "antd";
import { FileImageOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function Variant(){

   const [first, setFirst] = useState<any>();
   const [second, setSecond] = useState<any>();


    


    return (<div className="app__variant">
             <Badge status="processing" text="Phân loại hàng" />
             <Card  size="small" title={'abcd'} className=" w-full my-3" style={{background : '#F6F6F6'}}>
                <div className="w-1/2 mb-4">
                            <Input placeholder="Nhập tên biến thể 1" />
                </div>
                <div className=" grid grid-cols-2 gap-4">
                    <div className=" flex gap-[6px] items-center ">
                        <div className="w-[70px] h-[70px]">
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
                        <div className="w-full">
                            <Input placeholder="Nhập" />
                        </div>
                        <div className="w-[50px] cursor-pointer">
                            <DeleteOutlined style={{color : 'red'}}/>
                        </div>
                    </div>
                   
                </div>
               
            </Card>

            <Card  size="small" title={'abcd'} className=" w-full my-3 relative" style={{background : '#F6F6F6'}}>
                <div className=" absolute top-[-5px] right-[-5px] text-[20px] text-white bg-black rounded-full w-[20px] h-[20px] flex items-center justify-center"> &times; </div>
                <div className=" grid grid-cols-2">
                    <div className=" flex gap-[6px] items-center ">
                      
                        <div className="w-full">
                            <Input placeholder="Nhập tên biến thể 2" />
                        </div>
                        <div className="w-[50px] cursor-pointer">
                            <DeleteOutlined style={{color : 'red'}}/>
                        </div>
                    </div>
                    <div className=" flex gap-[6px] items-center ">
                   
                        <div className="w-full">
                            <Input placeholder="Nhập" />
                        </div>
                        <div className="w-[50px] cursor-pointer">
                            <DeleteOutlined style={{color : 'red'}}/>
                        </div>
                    </div>
                </div>
               
            </Card>
           

            <div className="my-5 bg-[#F6F6F6] p-3 rounded-[4px]">
                    <Button icon={<PlusOutlined />} type="dashed" className="w-[240px]" danger>
                        Thêm nhóm phân loại 2
                    </Button>
            </div>

            <Badge status="processing" text="Danh sách phân loại hàng" />

            <div className="bg-[#F6F6F6] p-3 rounded-[4px] my-3">
               
                <div className="flex">
                    <div className="p-3 w-[200px]"><Badge status="processing"  />  Color</div>
                    <div className="p-3 w-[90px]"> Ram </div>
                    <div className="p-3 w-full">Giá</div>
                    <div className="p-3 w-full" >Số lượng</div>
                    <div className="p-3 w-full">SKU</div>
                </div>
                <div className="">
                    <div className="flex items-center h-full ">
                        <div className="p-3 w-[200px] flex justify-center">  Red</div>
                        <div className=" flex flex-col gap-3 w-[90px]  h-[100%] ">
                             <span className="p-2">4Gb</span> 
                             <span className="p-2">8Gb</span> 
                             <span className="p-2">8Gb</span> 
                             
                        </div>
                        
                        <div className="p-3 flex flex-col gap-3 w-full">
                            <Input placeholder="0" /> 
                            <Input placeholder="0" />
                            <Input placeholder="0" />
                        </div>
                        <div className="p-3 flex flex-col gap-3 w-full">
                            <Input placeholder="0" /> 
                            <Input placeholder="0" />
                            <Input placeholder="0" />
                        </div>
                        <div className="p-3 flex flex-col gap-3 w-full">
                            <Input placeholder="0" /> 
                            <Input placeholder="0" />
                            <Input placeholder="0" />
                        </div>
                    </div>
                </div>
            </div>
    </div>)
}