import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { changeStatus, getAllCategory } from '@/app/slices/categorySlice'
import { ICategory } from '@/common/types/category.interface'
import type { TableProps } from 'antd'
import { Button, Flex, Popconfirm, Space, Table, Tag, Typography, message } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ListCategory() {
  const dispatch = useAppDispatch()

  const { categories, isLoading } = useAppSelector((state) => state.category)

  const handlerDistableCategory = async (value: ICategory) => {
    if (!value.is_delete) {
      const res = await dispatch(changeStatus(value?.id as string, true))

      if (res.success) {
        message.success('Vô hiệu hoá danh mục thành công!')
      } else if (!res.success) {
        message.error('Vô hiệu hoá danh mục thất bại!')
      }
    } else if (value.is_delete) {
      const res = await dispatch(changeStatus(value?.id as string, false))

      if (res.success) {
        message.success('Tắt vô hiệu hoá danh mục thành công!')
      } else if (!res.success) {
        message.error('Tắt vô hiệu hoá danh mục thất bại!')
      }
    }
  }

  useEffect(() => {
    dispatch(getAllCategory())
  }, [dispatch])

  const columns: TableProps<ICategory>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 140,
      render: (text) => <a>{text}</a>
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      width: 200,
      render: (text) => <>{text}</>
    },
    {
      title: 'Parent',
      dataIndex: 'parent_id',
      key: 'parent_id',
      align: 'center',
      width: 100,
      render: (text) => <>{text ? text : 'No Parent'}</>
    },
    {
      title: 'Status',
      dataIndex: 'is_delete',
      key: 'is_delete',
      align: 'center',
      width: 100,
      render: (status) => {
        const color = status ? 'volcano' : 'green'
        const text = status ? 'Disable' : 'Enable'

        return <Tag color={color}>{text.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (record) => (
        <Space size={'middle'}>
          {!record.is_delete && (
            <Link to={record?.id}>
              <Button type='primary'>Edit</Button>
            </Link>
          )}
          <Popconfirm
            placement='topRight'
            title={!record.is_delete ? 'Are you sure distable this category?' : 'Are you sure enable this category?'}
            onConfirm={() => handlerDistableCategory(record)}
            onCancel={() => {}}
            okText='Đồng ý'
            cancelText='Hủy bỏ'
          >
            <Button type='primary' danger={!record.is_delete}>
              {!record.is_delete ? 'Disable' : 'Enable'}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const newData = categories?.map((category: ICategory, index: number) => ({
    ...category,
    key: index + 1
  }))

  return (
    <>
      <Typography.Title editable level={2} style={{ margin: 0 }}>
        List Category
      </Typography.Title>
      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        size='middle'
        scroll={{ x: 1000, y: 500 }}
        sticky={{ offsetHeader: 0 }}
        dataSource={newData}
        loading={isLoading}
        expandable={{
          expandedRowRender: (record) => <p dangerouslySetInnerHTML={{ __html: record.description }}></p>
        }}
      />

      <Flex wrap='wrap' gap='small'>
        <Link to='add'>
          <Button type='primary'>Add Category</Button>
        </Link>
      </Flex>
    </>
  )
}
