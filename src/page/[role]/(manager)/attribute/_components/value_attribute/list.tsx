
import { Col, Row, Table, Form, Select, Button, TableColumnsType, Input, Popconfirm } from "antd";
import { useCreateValueAttributesMutation, useGetValueAttributesQuery, useDeleteValueAttributesMutation } from "./ValueAttributeEndPoints";
import { IValueAttribute } from "../../../../../../common/types/valueAttribute.interface";
import { useGetAttributesQuery } from "../attribute/AttributeEndpoints";
import { IAttribute } from "../../../../../../common/types/attribute.interface";
import { popupSuccess,popupError } from '@/page/[role]/shared/Toast'
import { useState } from "react";
import { Typography } from 'antd';

const { Title } = Typography;
export default function ValueAttribute(){
  const [deleteValueAttribute, {isLoading : isDeleting}, ] = useDeleteValueAttributesMutation();
  const [id, setId] = useState<number | string>();
  const [form] = Form.useForm()
  const validateMessages = {
    required: '${label} is required!',
  }
  const confirm = async (id : number | string) => {
    setId(id)
    await deleteValueAttribute(id);
     popupSuccess('Delete value attribute success');
  };
  const [createValueAttribute, { isLoading: loadingCreateValueAttribute }] = useCreateValueAttributesMutation()
  const {data : listAttributes, isLoading : loadingAttributes} = useGetAttributesQuery({});
  const {data, isLoading : loadingValueAttributes } = useGetValueAttributesQuery({});
  const dataItem = data?.map((item : IValueAttribute, key : number) => {
      return {
        ...item,
        key : key
      }
  })
  const dataAttributes = listAttributes?.map((item : IAttribute) => {
    return {
      value : item.id,
      label : item.name
    }
  })
  const attributesFilter = listAttributes?.map((item : IAttribute) => {
       return {
        text : item.name,
        value : item.id
       }
  })
    const columnsValueAttribute : TableColumnsType<IValueAttribute> = [
        {
          title: 'ID',
          width: 40,
          dataIndex: 'id',
          fixed: 'left',
        },
        {
          title: 'Attribute',
          width: 100,
          dataIndex: 'attribute',
          render: (attribute: { name: string }) => attribute.name,
          filters: attributesFilter,
          onFilter: (value, record) => record.attributeId == value
        },
        {  
           title: 'Value', 
           dataIndex: 'value',  
           fixed: 'left' 
        },
        
        {
          title: 'Action',
          fixed: 'right',
          width: 90,
          render: (data) => (<Popconfirm
            disabled={isDeleting}
            title="Delete the value attribute"
            description={`Are you sure to delete "${data.value}" ?`}
            onConfirm={() => confirm(String(data.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button danger loading={isDeleting && data.id == id} >Delete</Button>
          </Popconfirm>),
        },
      ];
      const onFinish = async (values: IValueAttribute) => {
        console.log(values);
        try {
           await createValueAttribute(values);
           form.resetFields();
           popupSuccess("Add value attribute success");
        } catch (error) {
          popupError("Add value attribute error");
        }
      }
    return (<>
    <Title level={2}>List value attributes</Title>
    <Table columns={columnsValueAttribute} dataSource={dataItem}  
      
      pagination={{ 
        defaultPageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '50', '100']
      }} 
      loading={loadingValueAttributes}
      
      bordered />

    <Form 
      layout="vertical"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >

    <Row gutter={16}>
      <Col span={12}>

      <Form.Item label="Attribute" name="attributeId"  rules={[{ required: true }]}>
      <Select
          placeholder="Enter attribute"
          loading={loadingAttributes}
          style={{ width: '100%' }}
          onChange={() => {}}
          options={dataAttributes}
        />
      </Form.Item>


      </Col>
      <Col span={12}>
      <Form.Item label="Value" name="value"  rules={[{ required: true }]}>
         <Input placeholder="VD : 128Gb, 1200mAh ..." />
      </Form.Item>
      </Col>
      <Col span={24}>

      <Form.Item >
            <Button loading={loadingCreateValueAttribute} disabled={loadingCreateValueAttribute} type='primary' htmlType='submit'>
              Add
            </Button>
          </Form.Item>

      </Col>
    </Row>

    </Form>
    </>)
}