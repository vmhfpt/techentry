import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { TableProps } from 'antd'
import { Button, Flex, Input, Popconfirm, Space, Table, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useDebounce from '@/hooks/useDebounce'
import '../../styles/category.css'
import { getAllPostCategory, removePostCategory, searchPostCategories } from '@/app/slices/postCategorySlice'
import { IPostCategory } from '@/common/types/category.interface'

export default function ListPostCategory() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 600)

  const { postCategories, isLoading } = useAppSelector((state) => state.postCategory)

  const handlerRemovePostCategory = async (value: IPostCategory) => {
    const res = await dispatch(removePostCategory(value.id as string))
    if (res?.success) {
      message.success('Xoá danh mục bài viết thành công!')
    } else if (!res.success) {
      message.error('Xoá danh mục bài viết thất bại!')
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
      dispatch(getAllPostCategory())
    } else {
      dispatch(searchPostCategories(debouncedValue))
    }
  }, [debouncedValue, dispatch])

  const columns: TableProps<IPostCategory>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center'
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 250,
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      align: 'center',
      render: (record) => (
        <Space size={'middle'}>
          <Link to={'' + record.id}>
            <Button type='primary'>Edit </Button>
          </Link>
          <Popconfirm
            placement='topRight'
            title='Are you sure delete this post category?'
            onConfirm={() => handlerRemovePostCategory(record)}
            onCancel={() => {}}
            okText='Đồng ý'
            cancelText='Hủy bỏ'
          >
            <Button type='primary' danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const newData = postCategories?.map((category: IPostCategory, index: number) => ({
    ...category,
    key: index + 1
  }))

  return (
    <>
      <div className='flex items-center justify-between my-2'>
        <Typography.Title editable level={2} style={{ margin: 0 }}>
          Danh mục bài viêt
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
          placeholder={'Tìm kiếm'}
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
          <Button type='primary'>Thêm danh mục</Button>
        </Link>
      </Flex>
    </>
  )
}
