import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { editPostCategory, getOnePostCategory } from '@/app/slices/postCategorySlice'
import { Form, Input, Modal, message } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import slugify from 'slugify'

export default function EditPostCategory() {
  const { id } = useParams()

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { postCategory, isLoadingDetails } = useAppSelector((state) => state.postCategory)

  const handleCancel = () => {
    navigate('..')
  }

  const handleSubmit = async () => {
    await form.validateFields()
    const id = form.getFieldValue('id')
    const name = form.getFieldValue('name')
    const slug = slugify(name, { replacement: '_', lower: true })

    const data = { id, name, slug }

    const res = await dispatch(editPostCategory(data))
    if (res.success) {
      message.success('Sửa danh mục thành công!')
      navigate('..')
    } else if (!res.success) {
      message.error('Sửa danh mục thất bại!')
    }
  }

  form.setFieldsValue({
    id: postCategory?.id,
    name: postCategory?.name,
    slug: postCategory?.slug
  })

  useEffect(() => {
    dispatch(getOnePostCategory(id as string))
  }, [id, dispatch])

  return (
    <>
      <Modal
        title='Edit Post Category'
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
          <Form.Item name='slug' className='hidden'>
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
        </Form>
      </Modal>
    </>
  )
}
