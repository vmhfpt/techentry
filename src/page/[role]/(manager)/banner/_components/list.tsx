import type { TableProps } from 'antd'
import { Button, Flex, Popconfirm, Space, Table, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllBanner, removeBanner } from '@/app/slices/bannerSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { IBanner } from '@/common/types/banner.interface'

export default function ListBanner() {
  const dispatch = useAppDispatch()

  const { banners, isLoading } = useAppSelector((state) => state.banner)

  const handlerRemoveBanner = async (value: IBanner) => {
    const res = await dispatch(removeBanner(value?.id as string))
    if (res?.success) {
      message.success('Xoá banner thành công!')
    } else if (!res.success) {
      message.error('Xoá banner thất bại!')
    }
  }

  useEffect(() => {
    dispatch(getAllBanner())
  }, [dispatch])

  const columns: TableProps<IBanner>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: 160,
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 160,
      render: (text) => <>{text}</>
    },
    {
      title: 'Img',
      dataIndex: 'img',
      key: 'img',
      align: 'center',
      width: 100,
      render: (img) => <img src={img || ''} className='mx-auto w-16' alt='' />
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 100,
      render: (url) => <img src={url || ''} className='mx-auto w-16' alt='' />
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (record) => (
        <Space size={'middle'}>
          <Link to={record?.id}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm
            placement='topRight'
            title='Are you sure delete this banner?'
            onConfirm={() => handlerRemoveBanner(record)}
            onCancel={() => {}}
            okText='Đồng ý'
            cancelText='Hủy bỏ'
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const newData = banners?.map((banner: IBanner, index: number) => ({
    ...banner,
    key: index + 1
  }))

  return (
    <>
      <Typography.Title editable level={2} style={{ margin: 0 }}>
        List Banner
      </Typography.Title>
      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        size='middle'
        scroll={{ x: 1000, y: 500 }}
        sticky={{ offsetHeader: 0 }}
        dataSource={newData}
        loading={isLoading}
      />

      <Flex wrap='wrap' gap='small'>
        <Link to='add'>
          <Button type='primary'>Add Banner</Button>
        </Link>
      </Flex>
    </>
  )
}
