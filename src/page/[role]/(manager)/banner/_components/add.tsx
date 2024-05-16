import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { createNewBanner } from '@/app/slices/bannerSlice'
import { Form, Input, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function AddBanner() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.banner)

  const handleCancel = () => {
    navigate('..')
  }
  const handleSubmit = async () => {
    await form.validateFields()

    const title = form.getFieldValue('title')
    const status = form.getFieldValue('status')
    const img = form.getFieldValue('img')
    const url = form.getFieldValue('url')

    const data = { title, status: +status, img, url }

    const res = await dispatch(createNewBanner(data))
    if (res.success) {
      message.success('Tạo banner thành công!')
      navigate('..')
    } else if (!res.success) {
      message.error('Tạo banner thất bại!')
    }
  }

  return (
    <>
      <Modal
        title='Add Banner'
        confirmLoading={isLoading}
        open={true}
        okText='Đồng ý'
        cancelText='Huỷ'
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} name='nest-messages' layout='vertical' style={{ maxWidth: 600 }}>
          <Form.Item
            name='title'
            label='Title Banner'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập tiêu đề banner!' },
              { max: 300, message: 'Title không vượt quá 300 ký tự' },
              {
                whitespace: true,
                message: 'Tiều đề không được để trống!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập tiêu đề banner' />
          </Form.Item>

          <Form.Item
            name='status'
            label='Status Banner'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập trạng thái banner!' },
              {
                pattern: /^[0-9]+$/,
                message: 'Vui lòng nhập số!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập trạng thái banner' className='w-full' />
          </Form.Item>

          <Form.Item
            name='img'
            label='Img Banner'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập Ảnh banner!' },
              {
                whitespace: true,
                message: 'Ảnh không được để trống!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập ảnh banner' className='w-full' />
          </Form.Item>

          <Form.Item
            name='url'
            label='Url Banner'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập Url banner!' },
              {
                whitespace: true,
                message: 'Url không được để trống!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập url banner' className='w-full' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
