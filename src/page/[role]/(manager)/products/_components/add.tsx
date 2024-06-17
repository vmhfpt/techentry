import { Card, Col, Modal, Row, Switch, Upload } from 'antd'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import ClassicEditor from '@/utils/ckeditorConfig'
import LoadingUser from '../../user/util/Loading'
import ErrorLoad from '../../components/util/ErrorLoad'
import React, { useEffect, useRef, useState } from 'react'
import { IProduct } from '@/common/types/product.interface'
import { popupSuccess, popupError } from '@/page/[role]/shared/Toast'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

import { ICategory } from '@/common/types/category.interface'
import instance from '@/api/axios'
import { IBrand } from '@/common/types/brand.interface'
import { useCreateProductMutation } from '../ProductsEndpoints'
import { useGetAttributesQuery } from '../../attribute/_components/attribute/AttributeEndpoints'
import { IAttribute } from '@/common/types/attribute.interface'
import { IValueAttribute } from '@/common/types/valueAttribute.interface'
import { Typography } from 'antd'
import UploadFile from './uploadfile/upload'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography
const validateMessages = {
  required: '${label} is required!'
}

function AddProduct() {
  const { data, isLoading } = useGetAttributesQuery({})
  console.log(data)
  const [createProduct, { isLoading: loadingCreateProduct }] = useCreateProductMutation()
  const [status, setStatus] = useState({
    isLoading: false,
    isError: false
  })
  const [dataBrands, setDataBrands] = useState<IBrand[]>([])
  const [dataCategories, setDataCategories] = useState<ICategory[]>([])
  const box = useRef<any>()
  const [form] = Form.useForm()
  const [file, setFile] = useState({
    data: {},
    loading: false
  })
  useEffect(() => {
    (async () => {
      try {
        setStatus((prev) => {
          return {
            ...prev,
            isLoading: true
          }
        })
        const reponse = await instance.get('categories')

        const reponseBrand = await instance.get('brand')
        setDataBrands(reponseBrand.data)
        setDataCategories(reponse.data)
      } catch (error) {
        setStatus((prev) => {
          return {
            isLoading: false,
            isError: true
          }
        })
      } finally {
        setStatus((prev) => {
          return {
            ...prev,
            isLoading: false
          }
        })
      }
    })()
    form.setFieldsValue({ in_active: true })
    if (box.current) {
      ClassicEditor.create(box.current as HTMLElement)
        .then((editor) => {
          editor.model.document.on('change:data', () => {
            form.setFieldsValue({ description: editor.getData() })
          })
          const editorElement = document.querySelectorAll('.ck-editor')
          editorElement.forEach((element, key) => {
            if (key != 0) {
              element.remove()
            }
          })
        })
        .catch((error) => {
          console.error(error.stack)
        })
    }
  }, [status.isLoading])

  const handleUpload = async (options: any) => {
    const { onSuccess, file } = options
    setFile({
      data: file,
      loading: false
    })
    onSuccess('Upload successful', file)
  }

  const onFinish = async (values: IProduct) => {

    values.avg_stars = 0
    values.total_review = 0

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

    Promise.all([axios.post('https://api.cloudinary.com/v1_1/dqouzpjiz/upload', formData)])
      .then(async ([response]: any) => {
        setFile({
          data: {},
          loading: false
        })
        try {
          await createProduct({
            ...values,
            thumbnail: response.data.secure_url
          })
          popupSuccess(`Add product "${values.name}"  success`)
          handleCancel()
        } catch (err) {
          popupError(`Add product "${values.name}"  error`)
          handleCancel()
        }
      })
      .catch(() => {
        popupError('Upload file Error ! lets try again ')
      })
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
  })
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('..')
  }
  const convertArrayValueAtrribute = (arr: IValueAttribute[] | undefined) => {
    if (!arr) return []
    return arr.map((item) => {
      return {
        value: item.id,
        label: item.value
      }
    })
  }

  const initialValues = {
    sales_information: [
      {
        name: 'Màu sắc',
        list: []
        // list: [{ img: '', name: 'Vàng' }]
      },
      {
        name: 'Rom',
        list: []
        // list: ['512GB', '128GB']
      }
    ]
  }

  if (status.isLoading) return <LoadingUser />
  if (status.isError) return <ErrorLoad />
  return (
    <>
      <Modal width={1400} okButtonProps={{ hidden: true }} title='Add product' open={true} onCancel={handleCancel}>
        <Form
          layout='vertical'
          form={form}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={initialValues}
        >
          <Row gutter={[24, 8]}>
            <Col span={8}>
              <Form.Item rules={[{ required: true }]} name='name' label='Name'>
                <Input type='text' placeholder='Enter your name' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='price' rules={[{ required: true }]} label='Price'>
                <Input type='number' placeholder='Enter your price' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item rules={[{ required: true }]} name='discount' label='Discount'>
                <Input type='number' placeholder='Enter your discount' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item rules={[{ required: true }]} name='categoryId' label='Category'>
                <Select style={{ width: '100%' }} placeholder='Enter category' options={optionCategories} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item rules={[{ required: true }]} name='brandId' label='Brand'>
                <Select style={{ width: '100%' }} placeholder='Enter brand' options={optionBrands} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='total_review' label='Total review'>
                <Input type='number' placeholder='0' readOnly={true} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='avg_stars' label='Average star'>
                <Input type='number' placeholder='0' readOnly={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item rules={[{ required: true }]} name='description' label='Content'>
                <textarea ref={box} className='form-control' id='ckeditor' cols={30} rows={10}></textarea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='upload'
                label='Image'
                valuePropName='fileList'
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[{ required: true }]}
              >
                <Upload name='image' listType='picture' customRequest={handleUpload}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label='Gallery'>
                <UploadFile />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Title level={5}>Thông Tin Chi Tiết</Title>
              <Row gutter={[24, 24]}>
                {data?.map((item: IAttribute, key: number) => (
                  <Col span={12} key={key}>
                    <Form.Item rules={[{ required: true }]} label={item.description}>
                      <Select
                        loading={isLoading}
                        mode='tags'
                        style={{ width: '100%' }}
                        placeholder='Enter value'
                        options={convertArrayValueAtrribute(item.value_attributes)}
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col span={24}>
              <Title level={5}>Thông Tin Bán Hàng</Title>
              <Form.List name='sales_information'>
                {(fields, { remove }) => (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 40 }}>
                    {fields.map((field) => (
                      <Form.Item key={field.key} noStyle shouldUpdate>
                        {({ getFieldValue }) => {
                          const fieldName = getFieldValue(['sales_information', field.name, 'name'])
                          return (
                            <Card
                              style={{ width: '50%' }}
                              size='small'
                              title={fieldName || `Item ${field.name + 1}`}
                              extra={
                                <CloseOutlined
                                  onClick={() => {
                                    remove(field.name)
                                  }}
                                />
                              }
                            >
                              {/* Nest Form.List */}
                              <Form.Item>
                                <Form.List name={[field.name, 'list']}>
                                  {(subFields, subOpt) => (
                                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                      {subFields.map((subField) => {
                                        return (
                                          <div key={subField.key} style={{ display: 'flex', gap: 16, width: '100%' }}>
                                            {fieldName === 'Màu sắc' ? (
                                              <>
                                                <Form.Item noStyle name={[subField.name, 'img']}>
                                                  <Upload listType='picture'>
                                                    <Button size='large'>
                                                      <UploadOutlined />
                                                    </Button>
                                                  </Upload>
                                                </Form.Item>
                                                <Form.Item noStyle name={[subField.name, 'name']}>
                                                  <Input placeholder='name' />
                                                </Form.Item>
                                              </>
                                            ) : (
                                              <Form.Item noStyle name={subField.name}>
                                                <Input placeholder='Value' />
                                              </Form.Item>
                                            )}

                                            <CloseOutlined
                                              onClick={() => {
                                                subOpt.remove(subField.name)
                                              }}
                                            />
                                          </div>
                                        )
                                      })}
                                      <Button type='dashed' size='large' onClick={() => subOpt.add()} block>
                                        <PlusOutlined />
                                      </Button>
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </Card>
                          )
                        }}
                      </Form.Item>
                    ))}
                  </div>
                )}
              </Form.List>
            </Col>

            <Col span={24}>
              <Form.Item name='in_active' label='Active?'>
                <Switch defaultChecked />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  loading={loadingCreateProduct || file.loading}
                  disabled={false}
                  type='primary'
                  htmlType='submit'
                >
                  Create
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
export default React.memo(AddProduct)
