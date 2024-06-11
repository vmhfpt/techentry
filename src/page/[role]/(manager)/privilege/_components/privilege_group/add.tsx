import { IPrivilegeGroup } from "@/common/types/privilegeGroup.interface";
import { Button, Col, Form, Input, Row } from "antd";
import { useCreatePrivilegeGroupMutation } from "./PrivilegeGroupEndpoint";
import { popupSuccess,popupError } from '@/page/[role]/shared/toastBase'
export default function AddPrivilegeGroup(){
  const [createPrivilegeGroup, { isLoading: loadingCreate }] = useCreatePrivilegeGroupMutation();

    const [form] = Form.useForm();
    const validateMessages = {
        required: '${label} is required!',
    }

    const onFinish = async (values : IPrivilegeGroup) => {
        try {
          await createPrivilegeGroup(values);
          form.resetFields();
          popupSuccess(`Add privilege group "${values.name}" success` );
        } catch (error) {
          popupError(`Add privilege group "${values.name}" error`);
        }
      }
    return (   <Form 
        form={form}
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onFinish}
     >
 
     <Row gutter={16}>
       <Col span={24}>
 
       <Form.Item rules={[{ required: true }]} name="name" label="Group name" >
          <Input placeholder="VD : Quản lý đơn hàng ... " />
       </Form.Item>
 
 
       </Col>
       
       <Col span={24}>
 
       <Form.Item >
             <Button loading={loadingCreate} disabled={loadingCreate} type='primary' htmlType='submit'>
               Add
             </Button>
           </Form.Item>
 
       </Col>
     </Row>
 
     </Form>)
}