import { Badge, Button, Divider, Dropdown, Flex, Form, Input, InputNumber, Select, Space, Table, TableColumnsType } from 'antd';
import React, { Children, useState } from 'react'
import { CloudUploadOutlined, DeleteOutlined, DownOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined  } from '@ant-design/icons';
import { FormInstance } from 'antd/lib';


interface attribute{
    id: string,
    value: string,
}
interface variant{
    id: string,
    name: string,
    attribute: attribute[]
}

interface TableVariantProps {
    variant: Array<variant>;
    form: FormInstance
}

export default function TableVariantDemo({variant, form}: TableVariantProps) {

    const columns = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'image',
            align: 'center'
        },
        ...variant.map((item) => ({
            title: item.name,
            dataIndex: item.name,
            key: item.name,
            width: '200px'
        })),
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Giá sale',
            dataIndex: 'price_sale',
            key: 'price_sale',
        },
        {
            title: 'Hành động',
            dataIndex: '',
            render: (text, record, index) => (
                <Button onClick={()=>{
                    handleRemove(index)
                }}>Xóa</Button>
            ),
        },
    ];

    const handleRemove = (index) => {
        const fields = form.getFieldValue('variant');
        fields.splice(index, 1); // Xóa mục tại chỉ số index
        form.setFieldsValue({
            variant: [...fields]
        });
    };

    const getDataSource = (fields) => {
        return fields.map(({ key, name, ...restField }) => ({
            key: name,
            image: (
                <Flex vertical align='center' justify='center' gap={10}>
                    <div style={{ height: '50px', width: '50px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px]'>
                        <Flex className='border-dashed border-2 relative hover:bg-gray-100 hover:border-solid hover:border' vertical gap={10} justify='center' align='center' style={{ width: '100%', height: "100%", borderRadius: '12px' }}>
                            <Flex vertical gap={10} style={{ width: '100%' }}>
                                <Flex vertical align='center' justify='center'>
                                    <CloudUploadOutlined style={{ fontSize: '10px', color: 'gray' }} />
                                </Flex>
                            </Flex>
                            <input type="file" accept="image/*" name="image" id={`image-${name}`} multiple className='opacity-0 absolute inset-0' />
                        </Flex>
                    </div>
                </Flex>
            ),
            ...variant.reduce((acc, v) => {
                acc[v.name] = (
                    <Form.Item
                        className='my-6 w-[200px]'
                        name={[name, v.name]}
                        dependencies={[`variant[${name}].${v.name}`]}
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống'
                            },
                            {
                                validator: (_, value)=>{
                                    const variants = form.getFieldValue('variant');
                                    const areVariantsUnique = (variants) => {
                                        const seen = new Set();
                                        

                                        for (const variantt of variants) {
                                            // Tạo chuỗi đại diện cho color và ram
                                            
                                            const variantKey = variant.filter((item)=>variantt[item.name]).map((item)=>variantt[item.name]);
                                            if(variantKey && variantKey.length < 1) continue
                                            
                                            const variantStringfy = JSON.stringify(variantKey)
                                            
                                            if (seen.has(variantStringfy)) {
                                                return false; // Nếu đã thấy biến thể này thì có trùng lặp
                                            }
                                            seen.add(variantStringfy); // Thêm biến thể vào Set
                                        }
                                        return true; // Nếu không có trùng lặp
                                    };
                                    
                                    const result = areVariantsUnique(variants);
                                    
                                    if(!result){
                                        return Promise.reject('Các biến thể không được trùng')
                                    }
                                    return Promise.resolve()
                                }
                            }
                        ]}
                    >
                        <Select
                            placeholder="Chọn hoặc thêm biến thể sản phẩm"
                            className='m-0 h-[40px]'      
                            options={variant.find(attr => attr.name === v.name)?.attribute.map(item => ({ label: item.value, value: item.value }))}
                        />
                    </Form.Item>
                );
                return acc;
            }, {}),
            quantity: (
                <Form.Item
                    name={[name, 'quantity']}
                    className='my-6'
                    rules={[{ required: true, message: 'Nhập số lượng' }]}
                >
                    <InputNumber placeholder='Nhập số lượng' className='border-gray-300 w-full' min={0} />
                </Form.Item>
            ),
            price: (
                <Form.Item
                    name={[name, 'price']}
                    className='my-6'
                    rules={[{ required: true, message: 'Nhập số tiền!' }]}
                >
                    <InputNumber
                        placeholder='Nhập giá tiền'
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        className='border-gray-300 w-full'
                        min={0}
                    />
                </Form.Item>
            ),
            price_sale: (
                <Form.Item
                    name={[name, 'price_sale']}
                    className='my-6'
                    rules={[
                        { required: true, message: 'Nhập giá sale!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue(['variant', name, 'price']) > value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Phải nhỏ hơn giá bán'));
                            },
                        }),
                    ]}
                >
                    <InputNumber
                        placeholder='Nhập giá sale'
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        className='border-gray-300 w-full'
                        min={0}
                    />
                </Form.Item>
            ),
        }));
    };

    return (
        <>
        <Flex gap={20} vertical>
            <Form.List
                name={'variant'}
            >
                {(fields, { add, remove }) => (
                    <>
                        <Table 
                        dataSource={getDataSource(fields)} 
                        columns={columns} 
                        className="relative overflow-x-auto sm:rounded-xl" 
                        style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem'}} 
                        pagination={false}
                        />
                    </>
                )}
            </Form.List>
        </Flex>
        </>
    )
}