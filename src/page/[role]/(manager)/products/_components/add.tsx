import { Col, Flex, Modal, Row, Switch, Upload, Image, Button, Form, Input, Select, Space, Drawer } from 'antd'
import { useNavigate } from 'react-router-dom'
import ClassicEditor from '@/utils/ckeditorConfig'
import React, {  useEffect, useRef, useState } from 'react'
import { IProduct } from '@/common/types/product.interface'
import { CloudUploadOutlined, DeleteOutlined, PlusOutlined  } from '@ant-design/icons';
import Variant from './Variant/Variant';
import getRandomNumber from '@/utils/randomNumber';
import TableVariant from './Variant/TableVariant'
import { popupError } from '@/page/[role]/shared/Toast'


const validateMessages = {
  required: '${label} is required!',
}

interface gallery{
  image: File | string
  displayPic: string
}

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


function AddProduct() {

  const [imageUrl, setImageUrl] = useState<File>();
  const [DisplayPic, setDisplayPic] = useState<string>();
  const box = useRef<any>();
  const [form] = Form.useForm();
  const [gallery, setGallery] = useState<Array<gallery>>([]);
  const navigate = useNavigate()
  const fileInputRef = useRef<any>(null);
  const numberFile = useRef<number>(0);

  const [variant, setVariant] = useState<Array<variant>>([{
    id: `${Date.now()}${getRandomNumber()}`,
    name: '',
    attribute: [
      {
        id: `${Date.now()}${getRandomNumber()}`,
        image: null,
        url: null,
        value: ''
      },
    ]
  }]);  

  useEffect(() => {

    if(box.current){
      ClassicEditor
      .create(box.current as HTMLElement )
      .then( editor => {
        editor.model.document.on('change:data', () => {
          form.setFieldsValue({ description: editor.getData() });
        })
        const editorElement = document.querySelectorAll('.ck-editor');
        editorElement.forEach((element, key) => {
          if(key != 0){
            element.remove();
          }
        });
      })
      .catch( error => {
          console.error( error.stack );
      } );
    }

  }, [])
  

  const onFinish = async (values: IProduct) => {

    const name = form.getFieldValue('name');
    const category_id = form.getFieldValue('category');
    const product_item = form.getFieldValue('variant');
    const content = form.getFieldValue('content');
    
    const converVariant = [];

    for(const key in product_item){      
      const id = key.split('-');
      const image = variant[0].attribute.find(item => item.id === id[0])?.image;
      
      converVariant.push({
        id: id[0],
        image,
        ...product_item[key]
      });
    }
    
    const newVariant = variant.map(item => ({
      name: item.name,
      attribute: item.attribute.map(item=>{
        return item.value
      })
    }));
 
  }


  const handleCancel = () => {
    navigate('..')
  }

  const selectedImg = (e) => {
    
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
      setImageUrl(fileSelected);
      setDisplayPic(URL.createObjectURL(fileSelected));
    }

  }

  const selectGallery = (e) => {
    if(gallery.length > 6) return;
    
    const types = [
      'jpeg',
      'png',
      'jpg',
      'gif',
    ]

    const fileSelected = e.target.files;  
    

    for(const key in fileSelected){
      if(numberFile.current == 5) break;
      if(typeof fileSelected[key] == 'number') break;
      
      const file = fileSelected[key];
      if (!(file instanceof File)) continue;

      const size = file.size;
      const type = types.includes(file.type.replace('image/', ''));
        
      if (size <= 1048576 && type) {
        numberFile.current++;
        setGallery((pveImages)=>[
          ...pveImages,
          {
            image: file,
            displayPic:  URL.createObjectURL(file)
          }
        ]);        
      }
    }
    e.target.value = null;
      
  }

  const handleDeleteGallery = (id) => {
    numberFile.current--
    setGallery([
      ...gallery.filter((item, key) => key != id)
    ])
  }

  const validateNoDuplicate = (fieldName: string, setNo: (value: boolean)=>boolean) => (_:any, value: string) => {    
    const fields = form.getFieldsValue();
    const inputValues = Object.keys(fields)
      .filter(key => key.startsWith(fieldName))
      .map(key => fields[key]);
    
    const duplicateValues = inputValues.filter((item) => item === value && item);
    
    if (duplicateValues.length > 1) {
      setNo(true)
      return Promise.reject(`không được trùng với các cột khác!`);
    }
    setNo(false)
    return Promise.resolve();
  };

  const validateOption = (fieldName, setError, field) => (_, value) => {    
    const fields = form.getFieldsValue();
    const inputValues = Object.keys(fields)
      .filter(key => key.startsWith(fieldName))
      .map(key => fields[key]);
    
    const duplicateValues = inputValues.filter((item) => item === value && item);

    
    if (duplicateValues.length > 1) {
      setError((prevErrors) => ({
        ...prevErrors,
        [field]: 'không được trùng',
    }));

      return Promise.reject(`không được trùng với các cột khác!`);
    }
    return Promise.resolve();
  };


  const handleSetDetail = () => {
    form.resetFields(['variant']);
    setVariant([
        ...variant,
      {
        id: Date.now() + '',
        name: '',
        attribute: [
          {
            id: Date.now() + '',
            value: '',
            image: null,
            url: null
          }
        ]
      }
    ])
  }
  
  const handleRemoveDetail = (name) => {  
    form.resetFields(['variant']);
    const updatedVariant = variant.filter((item, index)=>item.id != name)  
    if(variant.length > 1){
      setVariant(updatedVariant)
    }
  }

  return (
    <>
    <Drawer
        open={true}
        title={
        <>
          <h2 className=' font-bold text-[24px]'>Create new product</h2>
        </>
        }
        width={1450}
        styles={{
          header: {
            height: 60,
          },
          body: {
            paddingBottom: 80,
          },
        }}
        onClose={handleCancel}
      >
        <Form
          layout='vertical'
          form={form}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
          className='p-10'
        >
          <Flex vertical gap={30}>
            <Row gutter={[24, 8]} align={'stretch'}>
              <Col span={5} className='w-full'>
                  <Flex vertical gap={30}>
                    <Form.Item
                      name="upload"
                      className='border-[1px] p-[2rem] rounded-md border-[#F1F1F4] m-0'
                      rules={[{ required: true, message: 'Please upload a file!' }]}
                      style={{boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)'}}
                    >
                      <div>
                        <h2 className='font-bold mb-2 text-[16px]'>Thumbnail</h2>
                        <div style={{ flex: 5, height: '200px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px]  ' >
                          {
                            imageUrl && DisplayPic
                            ?
                            <div style={{ height: '100%', maxWidth: '100%' }} className='relative group'>
                                <img src={DisplayPic} alt="" className='object-cover h-[100%] object-center' style={{width: '100%' }} />
                                <div className=" absolute inset-0 z-1 opacity-0 group-hover:opacity-100 duration-1000" style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}></div>
                                <button style={{ zIndex: 999, fontSize: "20px", color: 'white' }}
                                    onClick={() => setDisplayPic('')}
                                >
                                    <DeleteOutlined className=" duration-1000 opacity-0 group-hover:opacity-100 absolute top-10 right-10" />
                                </button>
                            </div>
                            :
                            <Flex className='border-dashed  border-2 relative hover:bg-gray-100 hover:border-solid hover:border' vertical gap={10} justify='center' align='center' style={{ maxWidth: '100%', height: "100%", borderRadius: '12px' }}>
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
                                <input type="file" accept="image/*" name="image" id="image"  className='opacity-0 absolute inset-0'
                                    onChange={selectedImg}
                                />
                            </Flex>
                          }
                        </div>
                      </div>
                    </Form.Item>
                  <div className='border border-1 rounded-md overflow-hidden flex-1 p-2' style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}>
                    <div className='p-2'>
                      <h2 className='font-bold'>Setting</h2>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center p-2'>

                      <h2>active</h2>
                      <Form.Item 
                        className='m-0' 
                        label=''
                        name='active' 
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='border border-1 rounded-md flex-1 p-2 relative' style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}>
                    <div className='p-2'>
                        <h2 className='font-bold'>Product Detail</h2>
                    </div>
                    <Flex justify='center' align='' vertical className='p-2' gap={10} >
                      <Form.Item 
                        className='m-0' 
                        name='category_id' 
                        rules={
                          [
                            {
                              required: true,
                              message: 'Vui lòng chọn danh mục'
                            }
                          ]
                        }
                      >
                        <Select
                          defaultValue="lucy"
                          className='h-[40px] relative'
                          options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                          ]}
                        />
                      </Form.Item>
                      <Flex align='center' justify='center' className='w-[30px] h-[30px] text-white cursor-pointer rounded-[9999px] absolute top-[-10px] right-[-9px] bg-blue-500'>
                          <PlusOutlined />
                        </Flex>
                    </Flex>
                  </div>
                  <div className='border border-1 rounded-md flex-1 p-2 relative' style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}>
                    <div className='p-2'>
                        <h2 className='font-bold'>Tags</h2>
                    </div>
                    <Flex justify='center' align='' vertical className='p-2' gap={10} >
                      <Form.Item 
                        className='m-0' 
                        name='category_id' 
                        rules={
                          [
                            {
                              required: true,
                              message: 'Vui lòng chọn danh mục'
                            }
                          ]
                        }
                      >
                        <Select
                          defaultValue="lucy"
                          className='h-[40px] relative'
                          options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                          ]}
                        />
                      </Form.Item>  
                    </Flex>
                  </div>
                  </Flex>
              </Col>
              <Col span={19}>
                <Form.Item
                  name="gallery"
                  className='border-[2px] p-[30px] rounded-md border-[#F1F1F4]'
                  style={{boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)'}}
                >
                  <div className=''>
                    <h2 className='font-bold mb-2 text-[16px]'>Gallery</h2>
                    <div style={{ flex: 5, overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px] relative' >
                        <Flex className='border-dashed border-2 p-5 relative hover:bg-gray-100 hover:border-solid  ' vertical gap={10} justify='center' align='center' style={{ width: '100%', height: "150px", borderRadius: '12px' }}>
                            {
                              gallery.length < 1
                              ?
                              (
                                <>
                                  <Flex vertical gap={10} style={{ width: '100%' }}>
                                    <Flex vertical align='center' justify='center'>
                                        <CloudUploadOutlined style={{ fontSize: '50px', color: 'gray' }} className='' />
                                    </Flex>
                                  </Flex>
                                  <Flex style={{ width: '100%', color: 'gray' }} vertical justify='center' align='center'>
                                      <span style={{ fontSize: '11px' }}>
                                          Kích thước tối đa: 50MB <span className={`${gallery.length != 5 ? 'text-red-400' : 'text-blue-400' }`}>{gallery.length}/5</span>
                                      </span>
                                      <span style={{ fontSize: '11px' }}>
                                          JPG, PNG, GIF, SVG
                                      </span>
                                  </Flex>
                                </>
                              )
                              :
                              ''
                            }
                            <input 
                              type="file" 
                              accept="image/*" 
                              name="image" 
                              id="image" 
                              multiple 
                              className='opacity-0 absolute inset-0'
                              onChange={selectGallery}
                              ref={fileInputRef}
                            />
                            <Flex justify='center' align='center' gap={20} wrap className='w-full h-[100%]'>
                              {gallery.map((item, index)=>(
                                <div className='h-[100px] w-[15%] rounded-lg overflow-hidden' key={index}>
                                  <div style={{ height: '100%', width: '100%' }} className='relative group' key={index}>
                                    <img src={item.displayPic} alt="" className='object-cover h-full object-center' style={{width: '100%' }} />
                                    <div className=" absolute inset-0 z-1 opacity-0 group-hover:opacity-100 duration-1000" style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}></div>
                                    <div 
                                      style={{ zIndex: 999, fontSize: "20px", color: 'white' }}
                                      className=' cursor-pointer'
                                      onClick={() => handleDeleteGallery(index)}
                                    >
                                      <DeleteOutlined className=" duration-1000 opacity-0 group-hover:opacity-100 absolute top-[50%] left-[50%]" style={{transform: 'translate(-50%, -50%)'}}/>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </Flex>
                        </Flex>
                    </div>
                  </div>
                </Form.Item>
                <Flex vertical className='' gap={20}>
                  <div className='  border-[1px] p-[2rem] rounded-md h-full' style={{boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)'}}>
                    <h2 className='mb-5 font-bold text-[16px]'>General</h2>
                    <Flex vertical  gap={20}>
                      <Flex gap={30}>
                        <Form.Item
                          name='name'
                          label='Name'
                          className='w-full'
                          rules={[
                            { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                            { max: 120, message: 'Tên không vượt quá 120 ký tự' },
                            {
                              whitespace: true,
                              message: 'Tên sản phẩm không được để trống!'
                            }
                          ]}
                        >
                          <Input size='large' placeholder='Nhập tên danh mục' />
                        </Form.Item>
                      </Flex>
                      <Flex vertical>
                        <Form.Item
                          name={'content'}
                          label='content'
                          rules={[
                            {
                              required: true, message: 'Trường này là bắt buộc'
                            }
                          ]}
                          >
                          <textarea ref={box} className='form-control' id='ckeditor' cols={30} rows={10}></textarea>
                        </Form.Item>
                      </Flex>
                    </Flex>
                  </div>
                  <Flex vertical gap={20}>
                    {variant.map((name, i) => (
                        <Variant key={name.id} show={i} keyValue={name.id} detail={variant} setDetail={setVariant} handleRemoveDetail={handleRemoveDetail} validateNoDuplicate={validateNoDuplicate} validateOption={validateOption}/>
                    ))}
                    {
                      variant.length == 1
                      ?
                      <>
                        <div>
                          <Button className=' border-dashed' onClick={handleSetDetail}>Thêm biến thể 2</Button>
                        </div>
                      </>
                      :
                      ''
                    }
                  </Flex>

                  <Flex vertical gap={20}>
                    <TableVariant variant={variant} setVariant={setVariant}/>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Form>
      </Drawer>
    </>
  )
}
export default React.memo(AddProduct);