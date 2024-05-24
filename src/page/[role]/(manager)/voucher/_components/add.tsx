import { Col, DatePicker, FormInstance, Modal, Row, Space } from 'antd'
import { Button, Form, Input, InputNumber } from 'antd'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { BaseDatePicker } from './baseDateFomat';

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


export default function ModalCreateVoucher({
  form,
  visible,
  onCancelModalCreate,
  onSubmit,
  isEdit
}: Props) {

  return (
    <>
      <Modal
        title={isEdit ? 'Edit Voucher' : "Add Voucher"}
        open={visible}
        onCancel={onCancelModalCreate}
        footer={null}
      >
        <Form
          form={form}
          name='nest-messages'
          onFinish={onSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          autoComplete="off"
          layout="vertical"
        >
          {/* <Form.Item
            name={'code'}
            label='Code'

          > */}
            {/* <Input placeholder='Nhập mã Voucher' disabled />
          </Form.Item> */}

          <Form.Item
            name={'name'}
            label='Name'
            rules={[
              { required: true, message: 'Please enter the voucher name' },
              { max: 120, message: 'Voucher name must be at most 120 characters' },
            ]}
          >
            <Input placeholder='Nhập tên Voucher' />
          </Form.Item>

          <Form.Item
            name={'discount_amount'}
            label='Discount Amount'
            rules={[{ required: true, type: 'number', message: 'Please enter the discount amount' }]}
          >
            <InputNumber placeholder='Nhập số tiền giảm giá' style={{ width: '100%' }} />
          </Form.Item>
          <Row>
            <BaseDatePicker
              span={9}
              name="start_date"
              dateFormat="YYYY-MM-DD"
              placeholder={'Chọn thời gian bắt đầu'}
              hiddenInitValue={true}
              spanFormItem={24}
              required
              labelKey="Chọn thời gian kết thúc"
              label=""
              disableDate={(date: any) => {
                return date && date < moment().add(-1, 'days');
              }}
            />
            <Col
              span={2}
              style={{
                marginLeft: 53,
                marginTop: 10,
                fontSize: 16
              }}
            >
              <span>Đến</span>
            </Col>
            <BaseDatePicker
              span={9}
              name="end_date"
              dateFormat="YYYY-MM-DD"
              placeholder={'Chọn thời gian kết thúc'}
              hiddenInitValue={true}
              spanFormItem={24}
              required
              labelKey="Chọn thời gian kết thúc"
              label=""
              disableDate={(date: any) => {
                if (
                  !form.getFieldValue('start_date') ||
                  form.getFieldValue('start_date') === undefined
                )
                  return true;
                return (
                  date &&
                  date &&
                  date <
                  moment(
                    form.getFieldValue('start_date')?.format()
                  )?.add(1, 'days')
                );
              }}
            />

          </Row>


          <Form.Item
            name={'usage_limit'}
            label='Usage Limit'
            rules={[{ required: true, type: 'number', message: 'Please enter the usage limit' }]}
          >
            <InputNumber placeholder='Nhập giới hạn sử dụng' style={{ width: '100%' }} min={1} />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <Button type='text' style={{ marginRight: '10px' }} onClick={onCancelModalCreate}>
              Hủy
            </Button>
            <Button type='primary' htmlType='submit'>
              {isEdit ? 'Sửa' : 'Thêm mới'}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
