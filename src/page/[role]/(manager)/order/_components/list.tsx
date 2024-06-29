import type { TableProps } from 'antd'
import { Button, Flex, Input, Popconfirm, Space, Table, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllBanner, removeBanner, searchBanners } from '@/app/slices/bannerSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { IBanner } from '@/common/types/banner.interface'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useDebounce from '@/hooks/useDebounce'
import axios from 'axios'

export default function ListOrder() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 600)
  const [dataItem, setDataItem] = useState<any>([]);
  const { banners, isLoading } = useAppSelector((state) => state.banner)

  useEffect(() => {
    (async() => {
        const response = await axios.get('http://localhost:3000/orders');
        setDataItem(response.data);
        // console
    } )();
  }, [])
 

  useEffect(() => {
    if (!debouncedValue.trim()) {
      dispatch(getAllBanner())
    } else {
      dispatch(searchBanners(debouncedValue))
    }
  }, [debouncedValue, dispatch])

  const columns: TableProps<IBanner>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center'
    },
    {
      title: 'Name',
     
      align: 'center',
      width: 160,
      render: (text) => <a>{text.last_name} {text.first_name} </a>
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      width: 160,
      render: (text) => <>{text}</>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 100,
      render: (text) => <>{text}</>
    },
    {
      title: 'Date order',
      dataIndex: 'order_date',
      key: 'order_date',
      align: 'center',
      width: 140,
      render: (text) => <>{text}</>
    },
  
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (record) => (
        <Space size={'middle'}>
          <Link to={'' + record?.id}>
            <Button type='primary'>Show</Button>
          </Link>
         
        </Space>
      )
    }
  ]

  const newData = dataItem?.map((item: any, index: number) => ({
    ...item,
    key: item.id
  }))

  return (
    <>
      <div className='flex items-center justify-between my-2'>
        <Typography.Title editable level={2} style={{ margin: 0 }}>
          List Orders
        </Typography.Title>
      </div>

      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        size='middle'
        scroll={{ x: 1000, y: 500 }}
        sticky={{ offsetHeader: 0 }}
        dataSource={newData}
        loading={isLoading}
      />

    
    </>
  )
}
