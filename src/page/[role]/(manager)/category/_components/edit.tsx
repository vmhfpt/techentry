import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { editCategory, getOneCategory } from '@/app/slices/categorySlice'
import { Form, Input, Modal, message } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditCategory() {
  const { id } = useParams()

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { category, isLoadingDetails } = useAppSelector((state) => state.category)

  const handleCancel = () => {
    navigate('..')
  }

  const handleSubmit = async () => {
    await form.validateFields()
    const id = form.getFieldValue('id')
    const name = form.getFieldValue('name')
    const description = form.getFieldValue('description')
    const parent_id = form.getFieldValue('parent_id')
    const is_delete = false

    const data = { id, name, description, parent_id, is_delete }

    const res = await dispatch(editCategory(data))
    if (res.success) {
      message.success('Sửa danh mục thành công!')
      navigate('..')
    } else if (!res.success) {
      message.error('Sửa danh mục thất bại!')
    }
  }

  form.setFieldsValue({
    id: category?.id,
    name: category?.name,
    description: category?.description,
    parent_id: category?.parent_id
  })

  useEffect(() => {
    dispatch(getOneCategory(id as string))
  }, [id, dispatch])

  return (
    <>
      <Modal
        title='Edit Category'
        confirmLoading={isLoadingDetails}
        open={true}
        okText='Đồng ý'
        cancelText='Huỷ'
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} name='nest-messages' layout='vertical' style={{ maxWidth: 600 }}>
          <Form.Item name='id' className='hidden'>
            <Input />
          </Form.Item>
          <Form.Item name='parent_id' className='hidden'>
            <Input />
          </Form.Item>

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
            name='description'
            label='Description'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả danh mục!' },
              {
                whitespace: true,
                message: 'Mô tả danh mục không được để trống!'
              }
            ]}
          >
            <Input.TextArea size='large' rows={4} placeholder='Nhập mô tả danh mục' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
