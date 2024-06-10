import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { editPost, getOnePost } from '@/app/slices/postSlice'
import { IPostCategory } from '@/common/types/category.interface'
import { Button, Checkbox, Form, Input, Modal, Select, Upload, message } from 'antd'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import slugify from 'slugify'

const { Dragger } = Upload

export default function EditPosts() {
  const { id } = useParams()

  const navigate = useNavigate()
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()
  const { post, isLoadingDetails } = useAppSelector((state) => state.post)
  const { postCategories } = useAppSelector((state) => state.postCategory)

  const handleCancel = () => {
    navigate('..')
  }

  const handleSubmit = async () => {
    await form.validateFields()
    const id = form.getFieldValue('id')
    const title = form.getFieldValue('title')
    const slug = slugify(title, { replacement: '_', lower: true })
    const content = form.getFieldValue('content')
    const description = form.getFieldValue('description')
    const thumbnail = form.getFieldValue('thumbnail')
    const postCategoryId = form.getFieldValue('postCategoryId')
    const status = +form.getFieldValue('status')
    const isActive = form.getFieldValue('isActive')
    const newThumbnail = thumbnail.file ? thumbnail.file?.response?.secure_url : thumbnail

    const data = { id, title, slug, content, description, thumbnail: newThumbnail, postCategoryId, status, isActive }

    const res = await dispatch(editPost(data))
    if (res.success) {
      message.success('Sửa bài viết thành công!')
      navigate('..')
    } else if (!res.success) {
      message.error('Sửa bài viết thất bại!')
    }
  }

  form.setFieldsValue({
    id: post?.id,
    title: post?.title,
    slug: post?.slug,
    content: post?.content,
    description: post?.description,
    thumbnail: post?.thumbnail,
    postCategoryId: post?.postCategoryId,
    status: post?.status,
    isActive: post?.isActive
  })

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

  const selectOptions = postCategories?.map((cate: IPostCategory) => {
    return { label: `${cate.name}`, value: `${cate.id}` }
  })

  useEffect(() => {
    dispatch(getOnePost(id as string))
  }, [id, dispatch])

  return (
    <>
      <Modal
        title='Edit Post'
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
            name='title'
            label='Title'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập tiêu đề bài viết!' },
              { max: 120, message: 'Tiêu đề không vượt quá 120 ký tự' },
              {
                whitespace: true,
                message: 'Tiêu đề không được để trống!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập tiêu đề bài viết' />
          </Form.Item>

          <Form.Item
            name='content'
            label='Content'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập nội dung bài viết!' },
              {
                whitespace: true,
                message: 'Nội dung bài viết không được để trống!'
              }
            ]}
          >
            <Input.TextArea size='large' rows={4} placeholder='Nhập nội dung bài viết' />
          </Form.Item>

          <Form.Item
            name='description'
            label='Description'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả bài viết!' },
              {
                whitespace: true,
                message: 'Mô tả bài viết không được để trống!'
              }
            ]}
          >
            <Input.TextArea size='large' rows={4} placeholder='Nhập mô tả bài viết' />
          </Form.Item>

          <Form.Item
            name='thumbnail'
            label='Thumbnail'
            className='w-full'
            rules={[{ required: true, message: 'Vui lòng chọn Ảnh!' }]}
          >
            <Dragger listType='picture' customRequest={customRequest}>
              <Button>Upload</Button>
            </Dragger>
          </Form.Item>

          <Form.Item
            name='postCategoryId'
            label='Category'
            className='w-full'
            rules={[{ required: true, message: 'Vui lòng chọn danh mục bài viết!' }]}
          >
            <Select size='large' placeholder='---- Category ----' options={selectOptions} />
          </Form.Item>

          <Form.Item
            name='status'
            label='Status'
            className='w-full'
            rules={[
              { required: true, message: 'Vui lòng nhập trạng thái bài viết!' },
              {
                pattern: /^[0-9]+$/,
                message: 'Vui lòng nhập số!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập trạng thái bài viết' className='w-full' />
          </Form.Item>

          <Form.Item name='isActive' valuePropName='checked' className='w-full'>
            <Checkbox
              onChange={(e) => {
                form.setFieldsValue({ isActive: e.target.checked })
              }}
            >
              isActive
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
