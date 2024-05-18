
import {   Popconfirm,  Table, Tag, Typography } from 'antd';
import type {    TableProps } from 'antd';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { Iuser } from '../../../../../common/types/user.interface';
import { useGetUsersQuery } from '../UsersEndpoints';
import HandleLoading from '../../components/util/HandleLoading';
import { useDeleteUserMutation } from '../UsersEndpoints';
import {  useState } from 'react';

import useQuerySearch from '../../hooks/useQuerySearch';
import { getColumnSearchProps } from '../../components/util/SortHandle';
import { popupSuccess } from '../../components/util/Toast';
export default function ListUser(){


  const {searchText,setSearchText,setSearchedColumn, searchedColumn, searchInput, handleSearch, handleReset } = useQuerySearch();
  

  const [id, setId] = useState<number | string>();
  const [deleteUser, {isLoading : isDeleting}, ] = useDeleteUserMutation();
 
  const confirm = async (id : number | string) => {
    setId(id)
    await deleteUser(id);
     popupSuccess('Delete user success');
  };


    const {
      data ,
      isLoading,
      isError
    } = useGetUsersQuery({});

    const dataItem = data?.map((item : Iuser, key : number) => {
      return {
        ...item,
        key : key
      }
    })
    
    const columns: TableProps<Iuser>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          showSorterTooltip: { target: 'full-header' },
          render: (text) => <a>{text}</a>,
          onFilter: (value, record) => record.name.indexOf(value as string) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
          ...getColumnSearchProps(
            'name',
             handleSearch,
             handleReset,
             searchText,
             setSearchText,
             searchedColumn,
             setSearchedColumn,
             searchInput
            ),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          ...getColumnSearchProps(
            'email',
             handleSearch,
             handleReset,
             searchText,
             setSearchText,
             searchedColumn,
             setSearchedColumn,
             searchInput
            ),
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (image) => <img src={image} alt="" width={110} />
        },
        {
          title: 'Role',
          key: 'role_id',
          dataIndex: 'role_id',
          render: (_, { role_id  }) => (
            <>
                  <Tag color={role_id == '1' ? 'geekblue' : 'green'} >
                      {role_id == '1' ? 'Admin' : 'Guest'}
                  </Tag>
            </>
          ),
          filters: [
            {
              text: 'Admin',
              value: '1',
            },
            {
              text: 'Guest',
              value: '2',
            },
          ],
          onFilter: (value, record) => record.role_id.startsWith(value as string),
          filterSearch: true,
        },
        {
          title: 'Action',
          key: 'action',
          render: (data: Iuser) => (
            <Flex wrap="wrap" gap="small">
               <Link to={String(data?.id)}>   <Button type="primary"  >
                  Edit
                </Button> </Link>
                <Popconfirm
                    disabled={isDeleting}
                    title="Delete the user"
                    description={`Are you sure to delete "${data.name}" ?`}
                    onConfirm={() => confirm(String(data.id))}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger loading={isDeleting && data.id == id} >Delete</Button>
                  </Popconfirm>
          </Flex>
          ),
        },
    ];


    return <>
   
    <HandleLoading isLoading={isLoading} isError={isError}>
          <Typography.Title editable level={2} style={{ margin: 0 }}>
                List users
            </Typography.Title>
            <Table columns={columns} dataSource={dataItem} />

            <Flex wrap="wrap" gap="small">
          <Link to="add">    <Button type="primary" danger>
            Add user
          </Button> </Link>
          

        </Flex>
    </HandleLoading>
     
    </>
}