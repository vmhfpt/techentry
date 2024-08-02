import { IPrivilegeGroup } from "@/common/types/privilegeGroup.interface";
import { useGetPrivilegeGroupsQuery, useDeletePrivilegeGroupMutation, useUpdatePrivilegeGroupMutation} from "./PrivilegeGroupEndpoint"
import { Button, Flex, Popconfirm, Table, TableColumnsType } from "antd";
import { Typography } from 'antd';
import { useCallback, useState } from "react";
import EditPrivilegeGroup from "./edit";
import { popupError, popupSuccess } from "@/page/[role]/shared/Toast";
import AddPrivilegeGroup from "./add";
import { useGetPrivilegesQuery } from "../privilege/PrivilegeEndpoint";
export default function ListPrivilegeGroup(){
  const {refetch} = useGetPrivilegesQuery({});
  const [id, setId] = useState<number | string>();
  const {data, isLoading} = useGetPrivilegeGroupsQuery({});
  const [deletePrivilegeGroup, {isLoading : isDeleting}, ] = useDeletePrivilegeGroupMutation();
  const [updatePrivilegeGroup, { isLoading : loadingUpdate }] = useUpdatePrivilegeGroupMutation();
    const [formValuesUpdate, setFormValuesUpdate] = useState<IPrivilegeGroup>({
      name : ''
    });
    const [open, setOpen] = useState(false);
    const confirm = async (id : string) => {
      setId(id)
      await deletePrivilegeGroup(id);
       popupSuccess('Delete privilege group success');
    }
    const { Title } = Typography;
   
    const dataItem = data?.map((item : IPrivilegeGroup, key : number) => {
        return {
          ...item,
          key : key
        }
    })

    const columnsPrivilegeGroup : TableColumnsType<IPrivilegeGroup> = [
        {
          title: 'ID',
          width: 40,
          dataIndex: 'id',
        },
        {
          title: 'Tên',
          width: 100,
          dataIndex: 'name',
        },
        
        {
          title: 'Hành động',
          width: 90,
          render: (data : IPrivilegeGroup) => (
            <Flex gap="small">
            
            <Button type="primary" onClick={() => handleUpdatePopup(data)} >
                          Edit
              </Button>
            <Popconfirm
                        disabled={isDeleting}
                        title="Delete the privilege group"
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


    const handleUpdatePopup = (data : IPrivilegeGroup) => {
      setFormValuesUpdate(data);
      setOpen(true)
    }

    const onUpdate = useCallback(async (values: IPrivilegeGroup) => {
      
      const payload = {
        ...values,
        id : formValuesUpdate.id
      }

      
      try {
        await updatePrivilegeGroup(payload);
        refetch();
        setOpen(false);
        popupSuccess(`Update privilege group "${values.name}" success`);
      } catch (error) {
        setOpen(false);
        popupError(`Update privilege group "${values.name}"  error`)
      }
    }, [formValuesUpdate]);
    
    return (<>
    <EditPrivilegeGroup 
         loadingUpdate={loadingUpdate}
         open={open}
         onCreate={onUpdate}
         onCancel={() => setOpen(false)}
         initialValues={formValuesUpdate}
         
    />
    <Title level={2}>Danh sách nhóm quyền hạn</Title>
   
    <Table loading={isLoading}  columns={columnsPrivilegeGroup} dataSource={dataItem}  
      
      pagination={{ 
        defaultPageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '50', '100']
      }} 
      
      
      bordered />
    <AddPrivilegeGroup />
    </>)
}