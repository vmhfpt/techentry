import  { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import {  Form, Input, Modal } from 'antd';

import { IAttribute } from "../../../../../../common/types/attribute.interface";



interface UpdateAttributeFormProps {
    initialValues: IAttribute;
    onFormInstanceReady: (instance: FormInstance<IAttribute>) => void;
}

interface UpdateAttributeFormModalProps {
    loadingUpdate : boolean,
    open: boolean;
    onCreate: (values: IAttribute) => void;
    onCancel: () => void;
    initialValues: IAttribute;
  }



const UpdateAttributeForm  = ({
    initialValues,
    onFormInstanceReady,
  } : UpdateAttributeFormProps) => {
    const [form] = Form.useForm();
    useEffect(() => {
      onFormInstanceReady(form);
    }, []);
    return (
      <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name of attribute!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description of attribute!' }]}>
          <Input  />
        </Form.Item>
       
      </Form>
    );
  };



export default function EditAttribute({
    loadingUpdate,
    open,
    onCreate,
    onCancel,
    initialValues,
} : UpdateAttributeFormModalProps){
    const [formInstance, setFormInstance] = useState<FormInstance>();
    return (<>
    
    <Modal
      
      open={open}
      title={`Update attribute "${initialValues.name}"`}
      okText="Update"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, disabled: loadingUpdate, loading : loadingUpdate}}
      cancelButtonProps={{ disabled: loadingUpdate }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          formInstance?.resetFields();
          onCreate(values);
        } catch (error) {
          console.log('Failed:', error);
        }
      }}
    >
      <UpdateAttributeForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
    </>)
    
}