import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { createNewBanner } from '@/app/slices/bannerSlice'
import { Button, Form, Input, Modal, Upload, message } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { Dragger } = Upload

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
    const newImg = img.file?.response?.secure_url
    const newUrl = url.file?.response?.secure_url

    const data = { title, status: +status, img: newImg, url: newUrl }

    const res = await dispatch(createNewBanner(data))
    if (res.success) {
      message.success('Tạo banner thành công!')
      navigate('..')
    } else if (!res.success) {
      message.error('Tạo banner thất bại!')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      // Gọi hàm tải lên ảnh của bạn và chờ kết quả
      const response = await uploadFiles(file)

      // Kiểm tra kết quả và xử lý tùy theo trạng thái tải lên
      if (response?.status === 200) {
        message.success(`${file.name} uploaded successfully`)
        onSuccess(response.data, file)
      } else {
        message.error(`${file.name} upload failed.`)
        onError(response)
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      message.error('An error occurred while uploading the image.')
      onError(error)
    }
  }

  const uploadFiles = async (file: File) => {
    if (file) {
      const CLOUD_NAME = 'do7coevfh'
      const PRESET_NAME = 'bcm4uxe3'
      const FOLDER_NAME = 'datn-img'
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

      const formData = new FormData()
      formData.append('upload_preset', PRESET_NAME)
      formData.append('folder', FOLDER_NAME)
      formData.append('file', file)

      const response = await axios.post(api, formData)

      return response
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
            rules={[{ required: true, message: 'Vui lòng chọn Ảnh banner!' }]}
          >
            <Dragger listType='picture' customRequest={customRequest}>
              <Button>Upload</Button>
            </Dragger>
          </Form.Item>

          <Form.Item
            name='url'
            label='Url Banner'
            className='w-full'
            rules={[{ required: true, message: 'Vui lòng chọn Url banner!' }]}
          >
            <Dragger listType='picture' customRequest={customRequest}>
              <Button>Upload</Button>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
