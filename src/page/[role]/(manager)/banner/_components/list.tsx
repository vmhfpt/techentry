import type { TableProps } from 'antd'
import { Button, Flex, Input, Popconfirm, Space, Table, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllBanner, removeBanner, searchBanners } from '@/app/slices/bannerSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { IBanner } from '@/common/types/banner.interface'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useDebounce from '@/hooks/useDebounce'

export default function ListBanner() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 600)

  const { banners, isLoading } = useAppSelector((state) => state.banner)

  const handlerRemoveBanner = async (value: IBanner) => {
    console.log(value)
    const res = await dispatch(removeBanner(value.id as string))
    if (res?.success) {
      message.success('Xoá banner thành công!')
    } else if (!res.success) {
      message.error('Xoá banner thất bại!')
    }
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

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
          <Link to={"" + record?.id}>
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
      <div className='flex items-center justify-between my-2'>
        <Typography.Title editable level={2} style={{ margin: 0 }}>
          List Banner
        </Typography.Title>
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
          onChange={handleChangeSearch}
          size='small'
          placeholder={'search'}
          style={{
            borderRadius: '2rem',
            border: 'none',
            backgroundColor: '#ffff',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem'
          }}
        />
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

      <Flex wrap='wrap' gap='small'>
        <Link to='add'>
          <Button type='primary'>Add Banner</Button>
        </Link>
      </Flex>
    </>
  )
}
