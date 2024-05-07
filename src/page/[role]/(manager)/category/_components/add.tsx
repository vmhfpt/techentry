import { Modal, Select, SelectProps, Switch } from 'antd'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}


/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values)
}

export default function AddCategory() {
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('..')
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const options: SelectProps['options'] = [
     {
        value : 1,
        label : "Điện thoại"
     },
     {
        value : 2,
        label : "Laptop"
     },
     {
        value : 2,
        label : "Máy tính bảng"
     }
  ];

  return (
    <>
      <Modal title='Add category' open={true} onCancel={handleCancel}>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
         
        >
          <Form.Item name={['user', 'name']} label='Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
         
         


          <Form.Item name={['user', 'parent']} label='Parent category'>
            <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Select parent"
                    onChange={handleChange}
                    options={options}
                />
          </Form.Item>

          <Form.Item name={['user', 'active']} label='Active'>
           <Switch defaultChecked  />
          </Form.Item>



        
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
