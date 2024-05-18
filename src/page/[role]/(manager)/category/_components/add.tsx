import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { createNewCategory } from '@/app/slices/categorySlice'
import { Form, Input, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function AddCategory() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.category)

  const handleCancel = () => {
    navigate('..')
  }
  const handleSubmit = async () => {
    await form.validateFields()

    const name = form.getFieldValue('name')
    const parent_id = ''
    const description = form.getFieldValue('description')
    const is_delete = false

    const data = { name, parent_id, description, is_delete }

    const res = await dispatch(createNewCategory(data))
    if (res.success) {
      message.success('Tạo danh mục thành công!')
      navigate('..')
    } else if (!res.success) {
      message.error('Tạo danh mục thất bại!')
    }
  }

  return (
    <>
      <Modal
        title='Add Category'
        confirmLoading={isLoading}
        open={true}
        okText='Đồng ý'
        cancelText='Huỷ'
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} name='nest-messages' layout='vertical' style={{ maxWidth: 600 }}>
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
