import { FormInstance, Modal, Space } from 'antd'
import { Button, Form, Input, InputNumber } from 'antd'
import { useNavigate } from 'react-router-dom'

interface Props {
  form: FormInstance<any>;
  visible: boolean,
  isEdit: any,
  onCancelModalCreate: () => void,
  onSubmit: (values: any) => void;
}
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
  }
}
/* eslint-enable no-template-curly-in-string */


export default function ModalCreateBrand({
  form,
  visible,
  onCancelModalCreate,
  onSubmit,
  isEdit
}: Props) {

  return (
    <>
      <Modal title= {isEdit ? 'Edit Brand' : "Add Brand"} open={visible} onCancel={onCancelModalCreate} footer={null}>
        <Form
          form={form}
          name='nest-messages'
          onFinish={onSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          autoComplete="off"
          layout="vertical"
        >
          
          <Form.Item name={'name'} label='Name' rules={[{ required: true }]}>
            <Input placeholder='Nhập tên brand' />
          </Form.Item>
          <Form.Item name={"logo"} label='Url Logo'>
            <Input placeholder='Nhập url logo' />
          </Form.Item>

          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', padding: '10px' }}>
              <Button type='text' style={{ marginRight: '10px' }} onClick={onCancelModalCreate}>
                Hủy
              </Button>
              {/* <Space/> */}
              <Button type='primary' htmlType='submit'>
                {isEdit ? 'Sửa' : "Thêm mới"}
              </Button>
            </div>
          </div>


          {/* </Form.Item> */}
        </Form>
      </Modal>
    </>
  )
}
