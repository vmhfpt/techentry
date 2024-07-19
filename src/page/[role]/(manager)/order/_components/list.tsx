import type { TableProps } from 'antd'
import { Button, Flex, Input, Popconfirm, Segmented, Space, Table, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllBanner, removeBanner, searchBanners } from '@/app/slices/bannerSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { IBanner } from '@/common/types/banner.interface'
import useDebounce from '@/hooks/useDebounce'
import axios from 'axios'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Breadcrumb, Layout, Menu, theme } from 'antd';

export default function ListOrder() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 600)
  const [dataItem, setDataItem] = useState<any>([]);
  const { banners, isLoading } = useAppSelector((state) => state.banner)

  const { Header, Content, Footer } = Layout;


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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Content
        style={{
          background: colorBgContainer,
          padding: 24,
          borderRadius: borderRadiusLG,
          boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem'
        }}
        className='h-full'
      >
      <Flex justify='space-between' className='mb-10'>
        <div className='lable font-bold text-[24px] text-[#344767]'>
          List Product
        </div>
        <Flex gap={10}>
          <Button>
            Xuất
          </Button>
          <Button className='bg-[#344767] text-white'>
            Thêm order
          </Button>
        </Flex>
      </Flex>

      <Flex gap={20} vertical>
        <Flex justify='space-between'>
          <Input
            className='header-search w-[250px]'
            prefix={
              <div className=' px-2'>
                <SearchRoundedIcon />
              </div>
            }
            value={searchValue}
            spellCheck={false}
            allowClear
            size='small'
            placeholder={'search'}
            style={{
              borderRadius: '0.375rem',
            }}
          />
          <Segmented
            default={true}
            options={[{
              label: 'hello',
              children: <>hello</>
            }]}
            size='middle'
            className='flex items-center px-2'
          />
        </Flex>
        <Table
          pagination={{ pageSize: 8 }}
          columns={columns}
          size='middle'
          scroll={{ x: 1000, y: 500 }}
          sticky={{ offsetHeader: 0 }}
          dataSource={newData}
          loading={isLoading}
          className='border-2 rounded-md'
        />
      </Flex>
      </Content>
    </>
  )
}
