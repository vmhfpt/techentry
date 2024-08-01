import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { TableProps } from 'antd'
import { Button, Flex, Input, Popconfirm, Space, Table, Tag, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useDebounce from '@/hooks/useDebounce'
import '../../styles/category.css'
import { getAllPost, removePost, searchPosts } from '@/app/slices/postSlice'
import { IPost } from '@/common/types/post.interface'
import { getAllPostCategory } from '@/app/slices/postCategorySlice'

export default function ListPosts() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 600)

  const { posts, isLoading } = useAppSelector((state) => state.post)

  const handlerRemovePost = async (value: IPost) => {
    const res = await dispatch(removePost(value.id as string))
    if (res?.success) {
      message.success('Xoá bài viết thành công!')
    } else if (!res.success) {
      message.error('Xoá bài viết thất bại!')
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
      dispatch(getAllPost({ _expand: 'postCategory' }))
      dispatch(getAllPostCategory())
    } else {
      dispatch(searchPosts(debouncedValue))
    }
  }, [debouncedValue, dispatch])

  const columns: TableProps<IPost>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center'
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: 100,
      render: (text) => <a>{text}</a>
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (text) => <span className='ellipsis'>{text}</span>
    },
    {
      title: 'Hình thu nhỏ',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: 'center',
      width: 100,
      render: (url) => <img src={url || ''} className='mx-auto w-14' alt='' />
    },
    {
      title: 'Danh mục',
      dataIndex: 'postCategory',
      key: 'postCategory',
      align: 'center',
      width: 100,
      render: (postCategory) => <span>{postCategory?.name || 'No Category'}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 80
    },
    {
      title: 'Trạng thái kích hoạt',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      width: 100,
      render: (isActive) => {
        const color = !isActive ? 'volcano' : 'green'
        const text = !isActive ? 'Đanh hoạt động' : 'Không hoạt động'

        return <Tag color={color}>{text.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      align: 'center',
      render: (record) => (
        <Space size={'middle'}>
          <Link to={'' + record.id}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm
            placement='topRight'
            title='Are you sure delete this post?'
            onConfirm={() => handlerRemovePost(record)}
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

  const newData = posts?.map((post: IPost, index: number) => ({
    ...post,
    key: index + 1
  }))

  return (
    <>
      <div className='flex items-center justify-between my-2'>
        <Typography.Title editable level={2} style={{ margin: 0 }}>
          Danh sách bài viết
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
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ maxWidth: '90%', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{record.content}</div>
          )
        }}
      />

      <Flex wrap='wrap' gap='small'>
        <Link to='add'>
          <Button type='primary'>Add Post</Button>
        </Link>
      </Flex>
    </>
  )
}
