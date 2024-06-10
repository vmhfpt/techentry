import  React, {  useCallback, useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import {  Form, Input, Modal } from 'antd';

import { IPrivilegeGroup } from '@/common/types/privilegeGroup.interface';



interface UpdatePrivilegeGroupFormProps {
    initialValues: IPrivilegeGroup;
    onFormInstanceReady: (instance: FormInstance<IPrivilegeGroup>) => void;
}

interface UpdatePrivilegeGroupFormModalProps {
    loadingUpdate : boolean,
    open: boolean;
    onCreate: (values: IPrivilegeGroup) => void;
    onCancel: () => void;
    initialValues: IPrivilegeGroup;
  }



const  UpdatePrivilegeGroupForm = React.memo(({
    initialValues,
    onFormInstanceReady,
  } : UpdatePrivilegeGroupFormProps) => {
    
    const [form] = Form.useForm();
    useEffect(() => {
      onFormInstanceReady(form);
    }, []);
    return (
      <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name of privilege group!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  });





function EditPrivilegeGroup ({
    loadingUpdate,
    open,
    onCreate,
    onCancel,
    initialValues,
} : UpdatePrivilegeGroupFormModalProps){

   
    const [formInstance, setFormInstance] = useState<FormInstance>();
    return (<>
    
    <Modal
      
      open={open}
      title={`Update privilege group "${initialValues.name}"`}
      okText="Update"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, disabled: loadingUpdate, loading : loadingUpdate}}
      cancelButtonProps={{ disabled: loadingUpdate }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          onCreate(values);
        } catch (error) {
          console.log('Failed:', error);
        }
      }}
    >
      <UpdatePrivilegeGroupForm
          initialValues={initialValues}
          onFormInstanceReady={useCallback((instance) => {
            setFormInstance(instance);
          }, [])}
      />
    </Modal>
    </>)
    
}

export default React.memo(EditPrivilegeGroup);