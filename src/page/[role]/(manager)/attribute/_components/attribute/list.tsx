import { Col, Row, Table, Form, Button, TableColumnsType, Input, Popconfirm, Flex } from "antd";
import { useDeleteAttributeMutation, useGetAttributesQuery, useUpdateAttributeMutation} from "./AttributeEndpoints";
import { IAttribute } from "../../../../../../common/types/attribute.interface";
import { useCreateAttributeMutation } from "./AttributeEndpoints";
import { popupSuccess,popupError } from '@/page/[role]/shared/Toast'
import { useState } from "react";
import EditAttribute from "./edit";
import { useGetCategoriesAttributesQuery } from "../category_attribute/CategoryAttributeEndpoints";
import { useGetValueAttributesQuery } from "../value_attribute/ValueAttributeEndPoints";
import { Typography } from 'antd';

const { Title } = Typography;
export default function Attribute(){
  const { refetch } = useGetCategoriesAttributesQuery({});
  const { refetch : refetchValueAttributes } = useGetValueAttributesQuery({})
  const [formValuesUpdate, setFormValuesUpdate] = useState<IAttribute>({
     name : '',
     description : ''
  });
  const [open, setOpen] = useState(false);

 
  const handleUpdatePopup = (data : IAttribute) => {
    setFormValuesUpdate(data);
    setOpen(true)
  }


  const [form] = Form.useForm();
  const [id, setId] = useState<number | string>();
  const {data , isLoading} = useGetAttributesQuery({});
  const [createAttribute, { isLoading: loadingCreateAttribute }] = useCreateAttributeMutation();
  const [deleteAttribute, {isLoading : isDeleting}, ] = useDeleteAttributeMutation();
  const [updateAttribute, { isLoading : loadingUpdateAttribute }] = useUpdateAttributeMutation();
  const onUpdate = async (values: IAttribute) => {

    const payload = {
      ...values,
      id : formValuesUpdate.id
    }
    try {
      await updateAttribute(payload);
      refetch();
      refetchValueAttributes();
      setOpen(false);
      popupSuccess(`Update attribute ${values.name} success`);
    } catch (error) {
      setOpen(false);
      popupError(`Update attribute ${values.name} error`)
    }
  };
  const dataItem = data?.map((item : IAttribute, key : number) => {
         return {
           ...item,
           key : key
         }
  });

  const validateMessages = {
    required: '${label} is required!',
  }


  const columnsAttribute : TableColumnsType<IAttribute> = [
    {
      title: 'ID',
      width: 40,
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: 'Attribute',
      width: 100,
      dataIndex: 'name',
    },
    { title: 'Description', dataIndex: 'description', fixed: 'left' },
    
    {
      title: 'Action',
      fixed: 'right',
      width: 90,
      render: (data : IAttribute) => (
        <Flex gap="small">
        
        <Button type="primary" onClick={() => handleUpdatePopup(data)}>
                      Edit
          </Button>
        <Popconfirm
                    disabled={isDeleting}
                    title="Delete the user"
                    description={`Are you sure to delete "${data.name}" ?`}
                    onConfirm={() => confirm(String(data.id))}
                    okText="Yes"
                    cancelText="No"
                  >
                  <Button type="primary" danger loading={isDeleting && data.id == id}>
                      Delete
                  </Button>
                  </Popconfirm>
        
        </Flex>

      ) 
    },
  ];
  const onFinish = async (values : IAttribute) => {
    
    try {
      await createAttribute(values);
      form.resetFields();
      popupSuccess(`Add attribute ${values.name} success` );
    } catch (error) {
      popupError(`Add attribute ${values.name} error`);
    }
  }

  const confirm = async (id : number | string) => {
    setId(id)
    await deleteAttribute(id);
     popupSuccess('Delete attribute success');
  };

    return (<>
    <Title level={2}>List attributes</Title>
    <EditAttribute 
         loadingUpdate={loadingUpdateAttribute}
         open={open}
         onCreate={onUpdate}
         onCancel={() => setOpen(false)}
         initialValues={formValuesUpdate}
         
    />
    <Table loading={isLoading}  columns={columnsAttribute} dataSource={dataItem}  
      
      pagination={{ 
        defaultPageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '50', '100']
      }} 
      
      
      bordered />

    <Form 
       form={form}
       layout="vertical"
       validateMessages={validateMessages}
       onFinish={onFinish}
    >

    <Row gutter={16}>
      <Col span={12}>

      <Form.Item rules={[{ required: true }]} name="name" label="Attribute name" >
         <Input placeholder="VD : Rom, Ram, Chất liệu khung viền ..." />
      </Form.Item>


      </Col>
      <Col span={12}>
      <Form.Item rules={[{ required: true }]} name="description"  label="Description" >
         <Input placeholder="VD : Bộ nhớ trong ..." />
      </Form.Item>
      </Col>
      <Col span={24}>

      <Form.Item >
            <Button loading={loadingCreateAttribute} disabled={loadingCreateAttribute} type='primary' htmlType='submit'>
              Add
            </Button>
          </Form.Item>

      </Col>
    </Row>

    </Form>
    
    </>)
}