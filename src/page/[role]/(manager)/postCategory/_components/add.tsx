import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { createNewPostCategory } from '@/app/slices/postCategorySlice'
import { Form, Input, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'

export default function AddPostCategory() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.postCategory)

  const handleCancel = () => {
    navigate('..')
  }
  const handleSubmit = async () => {
    await form.validateFields()

    const name = form.getFieldValue('name')
    const slug = slugify(name, { replacement: '_', lower: true })

    const data = { name, slug }

    const res = await dispatch(createNewPostCategory(data))
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
        title='Add Post Category'
        confirmLoading={isLoading}
        open={true}
        okText='Tạo'
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
        </Form>
      </Modal>
    </>
  )
}
