
import { Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { Icategory } from '../../../../../common/types/category.interface';






export default function ListCategory(){
    
    const data: Icategory[] = [
        {
          id: 1,
          name: 'Điện thoại',
          parent_id : 2,
          slug: 'dien-thoai',
          active: 0,
          created_at : '20/11/2022',
          updated_at : '20/11/2022'
        },
        {
            id: 2,
            name: 'Máy tính bảng',
            parent_id : 2,
            slug: 'may-tinh-bang',
            active: 1,
            created_at : '20/11/2022',
            updated_at : '20/11/2022'
        },
        {
            id: 3,
            name: 'Laptop',
            parent_id : 2,
            slug: 'lap-top',
            active: 1,
            created_at : '20/11/2022',
            updated_at : '20/11/2022'
        },
      ];
    
    const columns: TableProps<Icategory>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Slug',
          dataIndex: 'slug',
          key: 'slug',
        },
      
        {
          title: 'Active',
          key: 'active',
          dataIndex: 'active',
          render: (_, { active }) => (
            <>
             <Tag color={active == 1 ? "green" : "volcano"} key={active}>
                {active == 1 ? "Active" : "Hidden"}
            </Tag>
            </>
          ),
        },

        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Flex wrap="wrap" gap="small">
               <Link to="3">   <Button type="primary"  >
                  Edit
                </Button> </Link>
                <Button type="primary" danger>
                  Delete
                </Button>
          </Flex>
          ),
        },
    ];


    return <>
      <Typography.Title editable level={2} style={{ margin: 0 }}>
           List categories
      </Typography.Title>
      <Table columns={columns} dataSource={data} />

      <Flex wrap="wrap" gap="small">
    <Link to="add">    <Button type="primary" danger>
      Add category
    </Button> </Link>
    

  </Flex>
    </>
}