import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { createNewCategory } from '@/app/slices/categorySlice'
import { useNavigate } from 'react-router-dom'
import { CloudUploadOutlined, DeleteOutlined  } from '@ant-design/icons';
import { Flex, Form, Input, Modal, Button, Switch, Select } from 'antd';
import { useState } from 'react';
import { Typography } from 'antd';
import ButtonEdit from '../../shared/ButtonEdit/ButtonEdit';

export default function AddCategory() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.category)
  const [detail, setDetail] = useState(2);

  const [imageUrl, setImageUrl] = useState();
  const [DisplayPic, setDisplayPic] = useState<string>();

  const { Title, Paragraph  } = Typography;

  const handleCancel = () => {
    navigate('..')
  }
  const handleSubmit = async (values) => {
    console.log(values);
    
    // await form.validateFields()

    // const name = form.getFieldValue('name')
    // const parent_id = ''
    // const description = form.getFieldValue('description')
    // const is_delete = false

    // const data = { name, parent_id, description, is_delete }

    // const res = await dispatch(createNewCategory(data))
    // if (res.success) {
    //   message.success('Tạo danh mục thành công!')
    //   navigate('..')
    // } else if (!res.success) {
    //   message.error('Tạo danh mục thất bại!')
    // }
  }

  const selectedImg = (e) => {
    
    const types = [
        'jpeg',
        'png',
        'jpg',
        'gif',
        'svg'
    ]

    const fileSelected = e.target.files[0];
    console.log(fileSelected);
    

    const size = fileSelected.size;
    const type = types.includes(fileSelected.type.replace('image/', ''));

    if (size <= 1048576 && type) {
        setImageUrl(fileSelected);
        setDisplayPic(URL.createObjectURL(fileSelected));
    } else {
        e.target.value = ''
    }

  }

  return (
    <>
      <Modal
        confirmLoading={isLoading}
        open={true}
        okText='Đồng ý'
        cancelText='Huỷ'
        width={1200}
        footer=''
        onCancel={handleCancel}
      >
        <Title>Create new category</Title>

        <Form form={form} name='nest-messages' layout='vertical' className='w-full p-10' onFinish={(value)=> {console.log(value)}}>

          <Flex gap={100}>
            <Flex className='w-[300px]' vertical gap={10}>
              <Flex vertical>
                <Form.Item
                  name="upload"
                  className='flex-1'
                  required
                >
                  <div style={{ flex: 5, height: '300px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px]  ' >
                    {
                      imageUrl && DisplayPic
                      ?
                      <div style={{ height: '100%', maxWidth: '100%' }} className='relative group'>
                          <img src={DisplayPic} alt="" className='object-cover h-[100%]' style={{width: '100%' }} />
                          <div className=" absolute inset-0 z-1 opacity-0 group-hover:opacity-100 duration-1000" style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}></div>
                          <button style={{ zIndex: 999, fontSize: "20px", color: 'white' }}
                              onClick={() => setDisplayPic('')}
                          >
                              <DeleteOutlined className=" duration-1000 opacity-0 group-hover:opacity-100 absolute top-10 right-10" />
                          </button>
                      </div>
                      :
                      <Flex className='border-dashed border-2 relative hover:bg-gray-100 hover:border-solid hover:border' vertical gap={10} justify='center' align='center' style={{ maxWidth: '100%', height: "100%", borderRadius: '12px' }}>
                          <Flex vertical gap={10} style={{ width: '100%' }}>
                              <Flex vertical align='center' justify='center'>
                                  <CloudUploadOutlined style={{ fontSize: '50px', color: 'gray' }} className='' />
                              </Flex>
                          </Flex>
                          <Flex style={{ width: '100%', color: 'gray' }} vertical justify='center' align='center'>
                              <span style={{ fontSize: '11px' }}>
                                  Kích thước tối đa: 50MB
                              </span>
                              <span style={{ fontSize: '11px' }}>
                                  JPG, PNG, GIF, SVG
                              </span>
                          </Flex>
                          <input type="file" accept="image/*" name="image" id="image" className='opacity-0 absolute inset-0'
                              onChange={selectedImg}
                          />
                      </Flex>
                    }
                  </div>
                </Form.Item>
                <Form.Item className='' name={'in_active'}>
                    <div className=' border border-2 border-dashed rounded-md overflow-hidden' style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}>
                        <div className='p-2'>
                          <h2 >Setting</h2>
                        </div>
                        <hr></hr>
                        <Flex justify='space-between' className='p-2'>
                          <h2>In_active</h2>
                          <Switch defaultChecked ></Switch>
                        </Flex>
                    </div>
                </Form.Item>
              </Flex>
            </Flex>
            <Flex vertical className=' flex-1' gap={20}>
              <Flex gap={30}>
                <Form.Item
                  name='name'
                  label='Name'
                  className='w-full'
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên danh mục!' },
                    { max: 120, message: 'Tên không vượt quá 120 ký tự' },
                    {
                      whitespace: true,
                      message: 'Tên danh mục không được để trống!'
                    }
                  ]}
                >
                  <Input size='large' placeholder='Nhập tên danh mục' />
                </Form.Item>
                <Form.Item
                  name='parent_id'
                  label='parent_id'
                >
                  <Select
                    defaultValue=""
                    style={{ width: '200px',height:40 }}
                    onChange={(v)=>{console.log(v);
                    }}
                    options={[
                      { value: '', label: 'none' },
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                  />
                </Form.Item>
              </Flex>
              {Array.from({length: detail}, (_, i) => (
                  <ButtonEdit key={i}/>
              ))}
              <div>
                <Button className=' border-dashed'>Thêm thông tin chi tiết</Button>
              </div>
              <Flex justify='flex-end'>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className=" w-full p-5">
                    Submit
                  </Button>
                </Form.Item>
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}
