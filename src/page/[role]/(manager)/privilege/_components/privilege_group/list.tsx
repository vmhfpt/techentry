import { IPrivilegeGroup } from "@/common/types/privilegeGroup.interface";
import { useGetPrivilegeGroupsQuery } from "./PrivilegeGroupEndpoint"
import { Button, Flex, Popconfirm, Table, TableColumnsType } from "antd";
import { Typography } from 'antd';
export default function ListPrivilegeGroup(){
    const confirm = (id : string) => {

    }
    const { Title } = Typography;
    const {data, isLoading} = useGetPrivilegeGroupsQuery({});
    const dataItem = data?.map((item : IPrivilegeGroup, key : number) => {
        return {
          ...item,
          key : key
        }
    })

    const columnsAttribute : TableColumnsType<IPrivilegeGroup> = [
        {
          title: 'ID',
          width: 40,
          dataIndex: 'id',
      
        },
        {
          title: 'Name',
          width: 100,
          dataIndex: 'name',
        },
        
        {
          title: 'Action',
          width: 90,
          render: (data : IPrivilegeGroup) => (
            <Flex gap="small">
            
            <Button type="primary" >
                          Edit
              </Button>
            <Popconfirm
                        disabled={true}
                        title="Delete the privilege"
                        description={`Are you sure to delete "${data.name}" ?`}
                        onConfirm={() => confirm(String(data.id))}
                        okText="Yes"
                        cancelText="No"
                      >
                      <Button type="primary" danger loading={true}>
                          Delete
                      </Button>
                      </Popconfirm>
            
            </Flex>
    
          ) 
        },
      ];
    return (<>
    
    <Title level={2}>List attributes</Title>
   
    <Table loading={isLoading}  columns={columnsAttribute} dataSource={dataItem}  
      
      pagination={{ 
        defaultPageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '50', '100']
      }} 
      
      
      bordered />
    
    </>)
}