
import { Space, Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { Iuser } from '../../../../../common/types/user.interface';




export default function ListUser(){
    
    const data: Iuser[] = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
    
    const columns: TableProps<Iuser>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
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
           List usersss
      </Typography.Title>
      <Table columns={columns} dataSource={data} />

      <Flex wrap="wrap" gap="small">
    <Link to="add">    <Button type="primary" danger>
      Add user
    </Button> </Link>
    

  </Flex>
    </>
}