import { IPrivilege } from "@/common/types/privilege.interface";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useGetPrivilegeGroupsQuery } from "../privilege_group/PrivilegeGroupEndpoint";
import {  useCreatePrivilegeMutation } from "./PrivilegeEndpoint";
import { IPrivilegeGroup } from "@/common/types/privilegeGroup.interface";
import { popupError, popupSuccess } from "@/page/[role]/shared/Toast";
export default function AddPrivilege(){
    const {data : listPrivilegeGroups , isLoading, refetch} = useGetPrivilegeGroupsQuery({});
    const [createPrivilege, { isLoading: loadingCreate }] = useCreatePrivilegeMutation();
    const [form] = Form.useForm();
    const validateMessages = {
        required: '${label} is required!',
    }
    const dataPrivilegeGroups = listPrivilegeGroups?.map((item : IPrivilegeGroup) => {
        return {
          value : item.id,
          label : item.name
        }
    })


    const onFinish = async (values : IPrivilege) => {
        try {
          await createPrivilege(values);
          refetch();
          form.resetFields();
          popupSuccess(`Add privilege "${values.name}" success` );
        } catch (error) {
          popupError(`Add privilege "${values.name}" error`);
        }
    }
    return ( <Form 
        layout="vertical"
        form={form}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
  
      <Row gutter={16}>
      <Col span={24}>
        <Form.Item label="Name privilege" name="name"  rules={[{ required: true }]}>
           <Input placeholder="VD : Xem tin tức, Sửa sản phẩm, Thống kê, Tư vấn ..." />
        </Form.Item>
        </Col>
        <Col span={12}>
  
        <Form.Item label="Privilege Group" name="privilege_groupId"  rules={[{ required: true }]}>
        <Select
            placeholder="Enter privilege group"
            loading={isLoading}
            style={{ width: '100%' }}
            options={dataPrivilegeGroups}
          />
        </Form.Item>
  
  
        </Col>
        <Col span={12}>
        <Form.Item label="Url allow access" name="url_match"  rules={[{ required: true }]}>
           <Input placeholder="VD : admin\/users\/add$ ..." />
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