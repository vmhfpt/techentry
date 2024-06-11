import { IPrivilege } from "@/common/types/privilege.interface";
import { useGetPrivilegesQuery, useDeletePrivilegeMutation } from "./PrivilegeEndpoint";
import { Button, Flex, Popconfirm, Table, TableColumnsType } from "antd";
import { Typography } from 'antd';
import {  useState } from "react";

import { popupSuccess,popupError } from '@/page/[role]/shared/toastBase'
import AddPrivilege from "./add";
import { useGetPrivilegeGroupsQuery } from "../privilege_group/PrivilegeGroupEndpoint";


export default function ListPrivilege(){
    const {refetch} = useGetPrivilegeGroupsQuery({});
  const [id, setId] = useState<number | string>();
  const {data, isLoading} = useGetPrivilegesQuery({});
  const [deletePrivilege, {isLoading : isDeleting}, ] = useDeletePrivilegeMutation();
 
  
    const confirm = async (id : string) => {
       try {
        setId(id)
        await deletePrivilege(id);
        refetch();
        popupSuccess('Delete privilege success');
       } catch (error) {
        popupError('Delete privilege error');
       }
    }
    const { Title } = Typography;
   
    const dataItem = data?.map((item : IPrivilege, key : number) => {
        return {
          ...item,
          key : key
        }
    })

    const columnsPrivilege : TableColumnsType<IPrivilege> = [
        {
          title: 'ID',
          width: 40,
          dataIndex: 'id',
        },
        {
          title: 'Name',
          width: 50,
          fixed: 'left',
          dataIndex: 'name',
        },
        {
            title: 'Url allow access',
            width: 100,
            dataIndex: 'url_match',
        },
        {
            title: 'Privilege group',
            width: 100,
            dataIndex: 'privilege_group',
            fixed: 'right',
            render: (privilege_group: {name : string}) => privilege_group.name
        },
       
        {
          title: 'Action',
          width: 90,
          fixed: 'right',
          render: (data : IPrivilege) => (
            <Flex gap="small">
            
          
            <Popconfirm
                        disabled={isDeleting}
                        title="Delete the privilege"
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


   

   
    
    return (<>
   
    <Title level={2}>List privilege </Title>
   
    <Table loading={isLoading}  columns={columnsPrivilege} dataSource={dataItem}  
      
      pagination={{ 
        defaultPageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '50', '100']
      }} 
      
      
      bordered />
    
    <AddPrivilege />
    </>)
}