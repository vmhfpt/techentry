import { Flex, Modal, Upload } from 'antd'
import { Button, Form, Input} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useLazyGetDistrictsQuery, useGetProvincesQuery } from '../../../../../utils/addressRTKQuery'
import { Select } from 'antd';
import type { SelectProps  } from 'antd';

import LoadingUser from '../util/Loading';
import ErrorLoad from '../../components/util/ErrorLoad';
import { useEffect, useState } from 'react';
import { Iuser } from '../../../../../common/types/user.interface';
import { useUpdateUserMutation } from '../UsersEndpoints';
import { useGetUserQuery } from '../UsersEndpoints';
import { popupSuccess, popupError } from '@/page/[role]/shared/Toast'
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons'
import { Image } from 'antd';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  },
  
}
/* eslint-enable no-template-curly-in-string */






export default function EditUser() {
  const [file, setFile] = useState({
    data: {},
    loading: false
  })
  const handleUpload = async (options: any) => {
    const { onSuccess, file } = options
    setFile({
      data: file,
      loading: false
    })
    onSuccess('Upload successful', file)
 
  }
  const params = useParams();
  const {data : dataItem, isLoading : dataLoading } = useGetUserQuery(params.id);
 
  const [updateUser, { isLoading : loadingUpdateUser }] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const [optionsDistrict, setOptionDistrict] = useState<SelectProps['options']>([])
  
  const onFinish = async (values: Iuser) => {

   
     if(values.upload){
      delete values.upload
      setFile((prev) => {
        return {
          ...prev,
          loading: true
        }
      })
      const formData = new FormData()
  
      formData.append('file', file.data as any)
      formData.append('upload_preset', 'vuminhhung904')
  
      Promise.all([axios.post('https://api.cloudinary.com/v1_1/dqouzpjiz/upload', formData)]).then(
        async ([response]: any) => {
         
          setFile({
            data: {},
            loading: false
          })
  
          try {
            await updateUser({...values, image : response.data.secure_url,  id : dataItem.id})
  
            popupSuccess(`Update account "${values.name}"  success`)
            handleCancel()
          } catch (err) {
            popupError(`Update account "${values.name}"  error`)
            handleCancel()
          }
        }
      )
      .catch(() => {
          popupError('Upload file Error ! lets try again ')
      })
     }else {
          try {
              await updateUser({...values, id : dataItem.id, image : dataItem.image});

              popupSuccess(`Update account "${values.name}"  success`);
              handleCancel();
            } catch (err) {
              popupError(`Update account "${values.name}"  error`);
              handleCancel();
            }
     }

     





  

    
  }

  const [getDistrict, { data : dataDistricts , isLoading : districtLoading}] = useLazyGetDistrictsQuery();




  useEffect(() => {
    setOptionDistrict(() => {
          return dataDistricts?.data.map((item : {id : number, name : string}) => {
               return {
                value : `${item.name}`,
                label : item.name
              }
           });
    })
 }, [dataDistricts])


  const options: SelectProps['options'] = [];
  

  const {
    data : provinces,
    isLoading,
    isError
  } = useGetProvincesQuery({});

  
   
  provinces?.data.forEach((item : {id : number, name : string}) => {
    options.push({
      value : `${item.name}-${item.id}`,
      label : item.name
     })
  });


  const onChangeProvince = async (value : string) => {
    form.resetFields(['district']);
    if(value){
      const splitStr = value.split(/-(\d+)/);
      const provinceId = splitStr[1];
      
      await getDistrict(provinceId);
     
      
    }else {
       setOptionDistrict([]);
    }
    

}
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('..')
  }

  if(isLoading || dataLoading) return <LoadingUser />
  if(isError) return <ErrorLoad />
  return (
    <>
    
     <Modal okButtonProps={{ hidden: true }}  title='Edit user' open={true} onCancel={handleCancel}>
        <Form
          initialValues={dataItem}
          form={form}
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name="name" label='Name' rules={[{ required: true }]}>
            <Input  
                type="text" 
                placeholder="Enter your name"
             />
          </Form.Item>
          <Form.Item name="email" label='Email' rules={[{ required: true , type: 'email' }]}>
             <Input  
                type="email" 
                placeholder="Enter your email"
             />
          </Form.Item>

          <Form.Item name="password" label='Password' rules={[{required: true }]}>
             <Input  
                type="password" 
                placeholder="*******"
             />
          </Form.Item>
         
          <Form.Item
            name='upload'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload name='image' listType='picture' customRequest={handleUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="phone" label='Phone' rules={[{required: true }]}>
             <Input  
                type="text" 
                placeholder="Enter phone number"
             />
          </Form.Item>

          <Form.Item name="address_line1" label='Address1' rules={[{required: true }]}>
             <Input  
                type="text" 
                placeholder="Enter your address "
             />
          </Form.Item>


          <Form.Item name="address_line2" label='Address2' rules={[{required: true }]}>
             <Input  
                type="text" 
                placeholder="Enter your address temporate"
             />
          </Form.Item>

          <Form.Item name="country" label='Country' rules={[{required: true }]}>
               

                  <Select
               
                      style={{ width: '100%' }}
                    
                      options={[
                    
                        { value: 'Việt Nam', label: 'VietNam' },
                      
                      ]}
                    />
          </Form.Item>

          <Form.Item name="city" label='Pronvinces' rules={[{required: true }]}>
                <Select
                    
                    style={{ width: '100%' }}
                    placeholder="Enter name province"
                    options={options}
                    onChange={(value) => onChangeProvince(value)}
                  />
          </Form.Item>

          <Form.Item name="district" label='District' rules={[{required: true }]}>
                <Select
                    loading={districtLoading}
                   
                    style={{ width: '100%' }}
                    placeholder="Enter name district"
                    options={optionsDistrict}
                  />
          </Form.Item>


          <Form.Item name="role_id" label='Role' rules={[{required: true }]}>
              <Select
               
                style={{ width: '100%' }}
              
                options={[
                  { value: '1', label: 'Admin' },
                  { value: '2', label: 'Guest' },
                ]}
              />
          </Form.Item>


          <Flex justify="flex-end">
              <Image
                width={150}
                src={dataItem.image}
              />
          </Flex>


          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button loading={loadingUpdateUser || file.loading} disabled={loadingUpdateUser || file.loading} type="primary" htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
     
    </>
  )
}
