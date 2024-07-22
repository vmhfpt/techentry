import type { TableProps } from 'antd'
import { Button, Card, Col, Flex, Input, Popconfirm, Row, Segmented, Space, Table, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'


import { IBanner } from '@/common/types/banner.interface'

import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { CloseSquareOutlined, CheckSquareOutlined, ScheduleOutlined } from '@ant-design/icons'
import { useGetOrdersQuery } from '@/services/OrderEndPoints'
import { VND } from '@/utils/formatVietNamCurrency'
import { formatTimestamp } from '@/utils/formatDate'
import useQuerySearch from '../../hooks/useQuerySearch'
import { getColumnSearchProps } from '../../components/util/SortHandle'
import { exportToExcel } from '@/utils/exportExcelFile'
export default function ListOrder() {


  const {searchText,setSearchText,setSearchedColumn, searchedColumn, searchInput, handleSearch, handleReset } = useQuerySearch();


  

  const {  Content } = Layout
  const {data : dataItem, isLoading : isLoadingOrders} = useGetOrdersQuery({})

  const handleTotalSuccess = useCallback((typeOfStatus : number) => {

    if(dataItem){
      let total = 0;
      for (const item of dataItem?.data) {
       if(item.order_status_id == typeOfStatus){
         total ++;
       }
      }
      const percent = (total / dataItem?.data?.length) * 100;
      return [total, percent];
    }else {
      return [0, 0]
    }
  
  }, [])


  const columns: TableProps<IBanner>['columns'] = [
    {
      title: 'Đơn hàng',
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
      align: 'center',
      ...getColumnSearchProps(
        'sku',
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
      title: 'Ngày giờ tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: 160,
      render: (text) => (
        <a>
          {formatTimestamp(text)}
        </a>
      )
    },
    {
      title: 'Khách hàng',
      dataIndex: 'receiver_name',
      key: 'receiver_name',
      align: 'center',
      width: 160,
      render: (text) => <>{text}</>,
      ...getColumnSearchProps(
        'receiver_name',
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
      title: 'Số điện thoại',
      dataIndex: 'receiver_phone',
      key: 'receiver_phone',
      align: 'center',
      width: 160,
      render: (text) => <>{text}</>,
      ...getColumnSearchProps(
        'receiver_phone',
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
      title: 'Trạng thái',
      dataIndex: 'order_status_id',
      key: 'order_status_id',
      width: 100,
      align: 'center',
      filters: [
        {
          text: <Button className='!bg-red-500' type="primary"> Chờ xử lý</Button>,
          value: '1',
        },
        {
          text:  <Button className=' !bg-orange-400' type="primary"> Đang chuẩn bị</Button>,
          value: '2',
        },
        {
          text: <Button className=' !bg-green-400' type="primary"> Đang vận chuyển</Button>,
          value: '3',
        },
        {
          text: <Button className=' !bg-blue-400' type="primary"> Đang giao hàng</Button>,
          value: '4',
        },
        {
          text: <Button type="primary"> Đã giao hàng</Button>,
          value: '5',
        },
        {
          text: <Button className='!bg-black' type="primary"> Đơn hàng bị hủy</Button>,
          value: '6',
        },
        {
          text:<Button className='!bg-[#178352]' type="primary"> Hoàn thành</Button>,
          value: '7',
        },
      ],
      onFilter: (value, record : any) => String(record.order_status_id).startsWith(value as string),
      
      render: (order_status_id) => {
        console.log(order_status_id)
        if(order_status_id == '1') return  <Button className='!bg-red-500' type="primary"> Chờ xử lý</Button>
        if(order_status_id == '2') return  <Button className=' !bg-orange-400' type="primary"> Đang chuẩn bị</Button>
        if(order_status_id == '3') return  <Button className=' !bg-green-400' type="primary"> Đang vận chuyển</Button>
        if(order_status_id == '4') return  <Button className=' !bg-blue-400' type="primary"> Đang giao hàng</Button>
        if(order_status_id == '5') return  <Button type="primary"> Đã giao hàng</Button>
        if(order_status_id == '6') return  <Button className='!bg-black' type="primary"> Đơn hàng bị hủy</Button>
        if(order_status_id == '7') return  <Button className='!bg-[#178352]' type="primary"> Hoàn thành</Button>
        return <></>
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      align: 'center',
      width: 160,
      render: (text) => <>{VND(text)}</>
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (record) => (
        <Space size={'middle'}>
          <Link to={'' + record?.id}>
            <Button type='primary'>Chi tiết</Button>
          </Link>
        </Space>
      )
    }
  ]

  const newData = dataItem?.data?.map((item: any, index: number) => ({
    ...item,
    key: item.id
  }))

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const handleExportExcelFile = () => {
    exportToExcel(newData, 'report-order');
  }
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
        <div className='lable font-bold text-[24px] text-[#344767]'>Đơn hàng</div>
        <Row gutter={16} className='my-4'>
          <Col span={8}>
            <Card title='Tổng đơn đã hủy' bordered={false} extra={<CloseSquareOutlined />}>
              <div className='text-[25px]'>
                <b> {handleTotalSuccess(6)[0]} </b>
              </div>
              <span className=''>{handleTotalSuccess(6)[1]}% trên tổng đơn</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Tổng đơn đã hoàn thành' bordered={false} extra={<CheckSquareOutlined />}>
              <div className='text-[25px]'>
                <b> 0 </b>
              </div>
              <span className=''>0% trên tổng đơn</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Tổng đơn hàng' bordered={false} extra={<ScheduleOutlined />}>
              <div className='text-[25px]'>
                <b> {dataItem?.data.length} </b>
               
              </div>
             
            </Card>
          </Col>
        </Row>

        <Flex justify='space-between' className='my-5'>
        <div className='lable font-bold text-[17px] text-[#344767]'>Danh sách đơn hàng</div>
          <Flex gap={10}>
            <Button onClick={() => handleExportExcelFile()} >Xuất</Button>
            <Button className='bg-[#344767] text-white'>Thêm order</Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
        
          <Table
            
            pagination={{ pageSize: 8 }}
            columns={columns}
            size='middle'
            scroll={{ x: 1000, y: 500 }}
            sticky={{ offsetHeader: 0 }}
            dataSource={newData}
            loading={isLoadingOrders}
            className='border-2 rounded-md'
          />
        </Flex>
      </Content>
    </>
  )
}
