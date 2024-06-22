import { Col, Flex, Modal, Row, Switch, Upload, Image, Button, Form, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { SelectProps, GetProp, UploadFile, UploadProps } from 'antd'
import ClassicEditor from '@/utils/ckeditorConfig'
import React, {  useEffect, useRef, useState } from 'react'
import { IProduct } from '@/common/types/product.interface'
import { popupSuccess, popupError } from '@/page/[role]/shared/Toast'
import { CloudUploadOutlined, DeleteOutlined  } from '@ant-design/icons';
import { ICategory } from '@/common/types/category.interface'
import instance from '@/api/axios'
import { IBrand } from '@/common/types/brand.interface';
import { useCreateProductMutation } from '../ProductsEndpoints'
import { PlusOutlined } from '@ant-design/icons';
import Variant from './Variant/variant';
import VariantComponent from './variantComponent/variantComponent'
import getRandomNumber from '@/utils/randomNumber'

const validateMessages = {
  required: '${label} is required!',
}

interface gallery{
  id: string,
  image: File | string
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
  const [dataBrands, setDataBrands] = useState<IBrand[]>([]);
  const [dataCategories, setDataCategories] = useState<ICategory[]>([])
  const box = useRef<any>();
  const [form] = Form.useForm();
  const [gallery, setGallery] = useState<Array<gallery>>([]);
  const [displayPibOption, setdisplayPicOption] = useState<Array<gallery>>([]);

  const [variant, setVariant] = useState<Array <variant>>([{
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
    (async() => {
          
      const reponse = await instance.get('categories');

      const reponseBrand = await instance.get('brand');
      setDataBrands(reponseBrand.data)
      setDataCategories(reponse.data)
        
    })();


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
    const content = form.getFieldValue('content');
    const category = form.getFieldValue('category');
    const variant = form.getFieldValue('variant');
    const converVariant = [];

    for(let key in variant){
      converVariant.push({
        id: key.split('-')[0],
        ...variant[key]
      });
    }

    const newVariant = converVariant.map((item, key)=>(
      {
        id:item.id,
        quantity: item.Quantity,
        price: item.Price,
        SKU: item.SKU,
        image: 'dk'
      }
    ))    

    console.log(newVariant);
    

    const newProduct = {
      thumbnai: imageUrl,
      gallery: gallery,
      name,
      content,
      category,
      variant: variant
    }

    console.log(newProduct);
    
    
  }

  const optionCategories: SelectProps['options'] = []
    dataCategories?.forEach((item) => {
      optionCategories.push({
        value: item.id,
        label: item.name
      })
  })

  const optionBrands: SelectProps['options'] = []
    dataBrands?.forEach((item) => {
      optionBrands.push({
        value: item.id,
        label: item.name
      })
    }
  )

  const navigate = useNavigate()

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
    } else {
        e.target.value = ''
    }

  }

  const selectGallery = (e) => {
    const types = [
      'jpeg',
      'png',
      'jpg',
      'gif',
    ]

    const fileSelected = e.target.files[0];
    
    const size = fileSelected.size;
    const type = types.includes(fileSelected.type.replace('image/', ''));
 
    const id =  Date.now() + '';
    
    if (size <= 1048576 && type) {
      setGallery([
        ...gallery,
        {
          id,
          image: fileSelected
        }
      ]);
      setdisplayPicOption([
        ...displayPibOption,
        {
          id,
          image: URL.createObjectURL(fileSelected)
        }
      ]);
    } else {
      e.target.value = ''
    }
  }

  const handleDeleteGallery = (id) => {
    setdisplayPicOption([
      ...displayPibOption.filter((item)=>item.id != id)
    ])

    setGallery([
      ...gallery.filter((item)=>item.id != id)
    ])
  }

  const validateNoDuplicate = (fieldName, setNo, setError) => (_, value) => {    
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
    form.setFieldsValue({variant: []});
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
    form.setFieldsValue({variant: []});      
    if(variant.length > 1){
      setVariant([
        ...variant.filter((item, index)=>item.id != name)
      ])
    }
  }

  const selectedImgVariant = (e, id) => {
    
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
        const newDetail = variant.map((item)=> {
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
        setVariant(newDetail);
        
    } else {
        e.target.value = ''
    }

}

const handelRemoveImage = (id) => {
  const newDetail = variant.map((item)=> {
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
  setVariant(newDetail)
}


  return (
    <>
      <Modal width={1600} okButtonProps={{ hidden: true }} open={true} onCancel={handleCancel} footer=''>
        <Form
          layout='vertical'
          form={form}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
          className='p-10'
        >
          <Form.Item>
            <Flex justify='space-between' className='pb-4' align='center'>
              <h2 className=' font-bold text-[24px]'>Create new category</h2>
              <Button type="primary" htmlType="submit" className=" w-[100px] p-5">
                Create
              </Button>
            </Flex>
          </Form.Item>
          <Flex vertical gap={30}>
            <Row gutter={[24, 8]} align={'stretch'}>
              <Col span={6} className='w-full'>
                <Flex className='flex-[2] ' vertical gap={10}>
                  <Flex vertical>
                    <Form.Item
                      name="upload"
                      className='border-[1px] p-[50px] rounded-md border-[#F1F1F4]'
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
                                <input type="file" accept="image/*" name="image" id="image" multiple className='opacity-0 absolute inset-0'
                                    onChange={selectedImg}
                                />
                            </Flex>
                          }
                        </div>
                      </div>
                    </Form.Item>
                  </Flex>
                  <div className='border border-1 rounded-md overflow-hidden flex-1 ' style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}>
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
                </Flex>
              </Col>
              <Col span={18}>
                <Flex vertical className='flex-[6] h-full' gap={20}>
                  <div className='  border-[1px] p-[50px] rounded-md h-full' style={{boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)'}}>
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
                        <Form.Item
                          name='category'
                          label='category'
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn danh mục'
                            }
                          ]}
                        >
                          <Select
                            style={{ width: '200px',height:40 }}
                            onChange={(v)=>{console.log(v);
                            }}
                            options={[
                              { value: '', label: 'none' },
                              { value: 1, label: 'danh mục' },
                            ]}
                          />
                        </Form.Item>
                      </Flex>
                      <Flex vertical>
                        <Form.Item
                          name={'description'}
                          label='description'
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
                  <Form.Item
                    name="gallery"
                    className='border-[2px] p-[50px] rounded-md border-[#F1F1F4]'
                    rules={[{ required: true, message: 'Please upload a file!' }]}
                    style={{boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)'}}
                  >
                    <div className=''>
                      <h2 className='font-bold mb-2 text-[16px]'>Thumbnail</h2>
                      <div style={{ flex: 5, overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px] relative' >
                          <Flex className='border-dashed border-2 p-5 relative hover:bg-gray-100 hover:border-solid hover:border' vertical gap={10} justify='center' align='center' style={{ width: '100%', minHeight: "200px", borderRadius: '12px' }}>
                              {
                                displayPibOption.length < 1
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
                                            Kích thước tối đa: 50MB
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
                              <input type="file" accept="image/*" name="image" id="image" multiple className='opacity-0 absolute inset-0'
                                  onChange={selectGallery}
                              />
                              <Flex justify='center' align='center' gap={20} wrap className='w-full h-[100%]'>
                                {displayPibOption.map((item, index)=>(
                                  <div className='h-[100px] w-[15%] rounded-lg overflow-hidden' key={index}>
                                    <div style={{ height: '100%', width: '100%' }} className='relative group' key={item.id}>
                                      <img src={item.image} alt="" className='object-cover h-full object-center' style={{width: '100%' }} />
                                      <div className=" absolute inset-0 z-1 opacity-0 group-hover:opacity-100 duration-1000" style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}></div>
                                      <button style={{ zIndex: 999, fontSize: "20px", color: 'white' }}
                                          onClick={() => handleDeleteGallery(item.id)}
                                      >
                                          <DeleteOutlined className=" duration-1000 opacity-0 group-hover:opacity-100 absolute top-[50%] left-[50%]" style={{transform: 'translate(-50%, -50%)'}}/>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </Flex>
                          </Flex>
                      </div>
                    </div>
                  </Form.Item>
                  <Flex vertical gap={20}>
                    {variant.map((name, i) => (
                        <VariantComponent key={name.id} show={i} keyValue={name.id} detail={variant} setDetail={setVariant} handleRemoveDetail={handleRemoveDetail} validateNoDuplicate={validateNoDuplicate} validateOption={validateOption}/>
                    ))}
                    {
                      variant.length == 1
                      ?
                      <>
                        <div>
                          <Button className=' border-dashed' onClick={handleSetDetail}>Thêm thông tin chi tiết</Button>
                        </div>
                      </>
                      :
                      ''
                    }
                  </Flex>

                  <Flex vertical gap={20}>
                    {/* <Variant formatVariant={formatVariant} setFormatVariant={setFormatVariant} /> */}

                    <Form.List
                      name={'variant'}
                    >
                      {(fields, { add, remove }) => (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                      {
                                        variant.map((item, key)=>(
                                          <th scope="col" className="px-6 py-3 text-center">
                                            {item.name ? item.name : `Phân loại ${key+1}`}
                                          </th>
                                        ))
                                      }
                                      <th scope="col" className="px-6 py-3">
                                          Quantity
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          Price
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          SKU
                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                                {
                                  variant[0].attribute.map((parent, index)=>(
                                    index == 0 || index < variant[0].attribute.length - 1
                                    ?
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        <Flex vertical align='center' justify='center' gap={10}>
                                          {parent.value}
                                          {
                                            parent.url 
                                            ?
                                            <div style={{ height: '50px', width: '50px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px]  ' >
                                                {
                                                    parent.url 
                                                    ?
                                                    <div style={{ height: '100%', maxWidth: '100%' }} className='relative group'>
                                                        <img src={parent.url } alt="" className='object-cover h-[100%] object-center' style={{width: '100%' }} />
                                                        <div className=" absolute inset-0 z-1 opacity-0 group-hover:opacity-100 duration-1000" style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}></div>
                                                            <DeleteOutlined onClick={() => handelRemoveImage(parent.id)} className=" duration-1000 opacity-0 group-hover:opacity-100 absolute left-[50%] top-[50%]" style={{transform: 'translate(-50%, -50%)', zIndex: 999, fontSize: "20px", color: 'white'}} />
                                                    </div>
                                                    :
                                                    <Flex className='border-dashed border-2 relative hover:bg-gray-100 hover:border-solid hover:border' vertical gap={10} justify='center' align='center' style={{ width: '100%', height: "100%", borderRadius: '12px' }}>
                                                        <Flex vertical gap={10} style={{ width: '100%' }}>
                                                            <Flex vertical align='center' justify='center'>
                                                                <CloudUploadOutlined style={{ fontSize: '10px', color: 'gray' }} className='' />
                                                            </Flex>
                                                        </Flex>
                                                        <input type="file" accept="image/*" name="image" id="image" multiple className='opacity-0 absolute inset-0'
                                                            onChange={(e)=> selectedImgVariant(e, parent.id)}
                                                        />
                                                    </Flex>
                                                }
                                            </div>
                                            :
                                            ''
                                          }
                                        </Flex>
                                      </th>
                                    {
                                      variant.length < 2
                                      ?
                                      <>
                                      <td className="px-6 py-4">
                                          <tr className="block py-3">
                                            <Form.Item
                                                name={[parent.id+'hi', 'Quantity']}
                                                fieldKey={[parent.id, 'Quantity']}
                                                className='m-0' 
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
                                          </tr>
                                        </td>
                                        <td className="px-6 py-4">
                                          <tr className="block py-3">
                                            <Form.Item
                                                name={[parent.id, 'Price']}
                                                fieldKey={[parent.id, 'Price']}
                                                className='m-0' 
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
                                            </tr>
                                        </td>
                                        <td className="px-6 py-4">
                                          <tr className="block py-3">
                                            <Form.Item
                                                name={[parent.id, 'SKU']}
                                                fieldKey={[parent.id, 'SKU']}
                                                className='m-0' 
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
                                          </tr>
                                        </td>
                                      </>
                                      :
                                      <>
                                        <th className="px-6 py-4 text-center">
                                        {variant[1].attribute.map((item, key)=>(
                                          key ==  0 || key < variant[1].attribute.length - 1
                                          ?
                                          <tr className="block py-5">
                                            {item.value}
                                          </tr>
                                          :
                                          ''
                                        ))}
                                        </th>
                                        <td className="px-6 py-4">
                                          {
                                          variant[1].attribute.map((item, key)=>(
                                            key ==  0 || key < variant[1].attribute.length - 1
                                            ?
                                            <>
                                              <tr className="block py-3">
                                                <Form.Item
                                                    name={[parent.id + '-' + item.id, 'Quantity']}
                                                    fieldKey={[item.id+index, 'Quantity']}
                                                    className='m-0'
                                                    rules={[
                                                      { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                                      { max: 120, message: 'Tên không vượt quá 120 ký tự' },
                                                      {
                                                        whitespace: true,
                                                        message: 'Tên sản phẩm không được để trống!'
                                                      }
                                                    ]}
                                                    help=''
                                                  >
                                                    <Input size='large' placeholder='Nhập tên danh mục' />
                                                </Form.Item>
                                              </tr>
                                            </>
                                            :
                                            ''
                                          ))}
                                        </td>
                                        <td className="px-6 py-4">
                                        {variant[1].attribute.map((item, key)=>(
                                            key ==  0 || key < variant[1].attribute.length - 1
                                            ?
                                            <tr className="block py-3">
                                              <Form.Item
                                                  name={[parent.id + '-' + item.id, 'Price']}
                                                  fieldKey={[item.id+index, 'Price']}
                                                  className='m-0' 
                                                  rules={[
                                                    { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                                    { max: 120, message: 'Tên không vượt quá 120 ký tự' },
                                                    {
                                                      whitespace: true,
                                                      message: 'Tên sản phẩm không được để trống!'
                                                    }
                                                  ]}
                                                  help=''
                                                >
                                                  <Input size='large' placeholder='Nhập tên danh mục' />
                                                </Form.Item>
                                            </tr>
                                            :
                                            ''
                                          ))}
                                        </td>
                                        <td className="px-6 py-4">
                                        {
                                        variant[1].attribute.map((item, key)=>(
                                          key ==  0 || key < variant[1].attribute.length - 1
                                            ?
                                            <tr className="block py-3">
                                              <Form.Item
                                                  name={[parent.id + '-' + item.id, 'SKU']}
                                                  fieldKey={[item.id+index, 'SKU']}
                                                  className='m-0' 
                                                  rules={[
                                                    { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                                    { max: 120, message: 'Tên không vượt quá 120 ký tự' },
                                                    {
                                                      whitespace: true,
                                                      message: 'Tên sản phẩm không được để trống!'
                                                    }
                                                  ]}
                                                  help=''
                                                >
                                                  <Input size='large' placeholder='Nhập tên danh mục' />
                                                </Form.Item>
                                            </tr>
                                            :
                                            ''
                                          ))}
                                        </td>
                                      </>
                                    }
                                  </tr>
                                  :
                                  ''
                                  ))
                                }
                              </tbody>
                          </table>
                        </div>
                      )}
                    </Form.List>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}
export default React.memo(AddProduct);