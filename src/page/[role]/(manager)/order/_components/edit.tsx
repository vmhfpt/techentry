import { VND } from "@/utils/formatVietNamCurrency";
import { Badge, Button, Card, Col, Row, Table, Tag } from "antd";
import { TableProps } from "antd";
import {
    HourglassOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import { exportToWord } from "@/utils/exportBillOrder";
import { useGetOrderQuery } from "@/services/OrderEndPoints";
import { useParams } from "react-router-dom";
import { formatTimestamp } from "@/utils/formatDate";
export default function EditOrder(){
  const params = useParams();
  const {data} = useGetOrderQuery(params.id);
  const dataItem = data?.order_detail;
  const dataOrderDetail = data?.order_detail.order_details;
  console.log(dataItem)
    const handleExportBill = async  () => {
        await exportToWord([
            {
              key: '1',
              item: 'Product A',
              quantity: 2,
              price: 50,
            },
            {
              key: '2',
              item: 'Product B',
              quantity: 1,
              price: 30,
            },
          ])
    }
    const columns: TableProps<any>['columns'] = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
          key: 'name',
         
        },
        {
          title: 'Image',
          width: 160,
          render: (data) => (
            <div className=' rounded-md w-[40px] h-[40px] overflow-hidden ' style={{boxShadow: 'rgba(1, 1, 1, 0.06) 1rem 1.25rem 1.6875rem 1rem'}}>
              <img src={data.image ? data.image : data.thumbnail} alt="" width={110} className=' object-cover object-center'/>
            </div>
          )
        },
        {
          title: 'Biến thể',
          align: 'center',
          width: 160,
          render: (text) =>{
            return  <a>
            {text?.varians[0]?.name}
            {text?.varians[1] && ` | ${text?.varians[1].name}`}
          </a>
          }
        },

        {
            title: 'Số lượng',
            align: 'center',
            dataIndex: 'quantity',
          key: 'quantity',
            width: 160,
            render: (text) => (
              <a>
                {text}
              </a>
            )
          },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: 160,
            render: (text) => (
              <a>
                {VND(text)}
              </a>
            )
          },
        {
          title: 'Tổng tiền',
          align: 'center',
          width: 160,
          render: (data) => <>{VND(data.quantity * Number(data.price))}</>
        },
       
      ]
    return (<>
      <div className="w-full flex justify-end mb-4">
      <Button onClick={() => handleExportBill()} className="bg-black" type="primary" shape="round" icon={<DownloadOutlined />} size={'small'}>
            Xuất hóa đơn
          </Button>
      </div>
      <Row gutter={16}>
    <Col span={8}>
      <Card title="Thông tin đơn hàng" bordered={false}  extra={<> <Badge color="green" text={dataItem?.order_status} /></>}>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Mã đơn hàng : </b>
              <span className="">{dataItem?.code}</span>
          </div>

          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Ngày giờ tạo : </b>
              <span className="">{formatTimestamp(dataItem?.created_at)}</span>
          </div>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Trạng thái : </b>
              <span className="">     <Tag color="#87d068">{dataItem?.order_status}</Tag></span>
          </div>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Thông tin khách hàng" bordered={false}>
      <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Tên: </b>
              <span className="">{dataItem?.receiver_name}</span>
          </div>

          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Email: </b>
              <span className="">{dataItem?.receiver_email}</span>
          </div>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Số điện thoại: </b>
              <span className="">{dataItem?.receiver_phone}</span>
          </div>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Địa chỉ: </b>
              <span className="">{dataItem?.receiver_address}-{dataItem?.receiver_ward}-{dataItem?.receiver_district}-{dataItem?.receiver_pronvinces}</span>
          </div>
      </Card>
    </Col>
    <Col span={8}>
    <div className="p-4 max-w-md mx-auto flow-root">
  <ul role="list" className="-mb-8">
    <li>
      <div className="relative pb-8">
        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
              <HourglassOutlined  />
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 ">


            <div className="flex gap-3 items-center">
              <p className="text-sm text-gray-500"> <a href="#" className="font-medium text-gray-900">Chờ xử lý</a></p>
              <Button type="primary">Xác nhận</Button>
            </div>


            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time dateTime="2020-09-20">Sep 20</time>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div className="relative pb-8">
        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full  flex items-center justify-center ring-8 ring-white">
              <img className="h-5 w-5 text-white"  
                src="https://t3.ftcdn.net/jpg/04/14/78/90/360_F_414789044_6xD0f4z9YcHfQimfnighWoUCIqgEJ66G.jpg" />
            
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
            <div className="flex gap-3 items-center">
              <p className="text-sm text-gray-500"> <a href="#" className="font-medium text-gray-900">Đang chuẩn bị</a></p>
              <Button type="primary">Xác nhận</Button>
            </div>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time dateTime="2020-09-22">Sep 22</time>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div className="relative pb-8">
        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
              <img className="h-5 w-5 text-white" 
                src="https://c8.alamy.com/comp/2RC5DTJ/taking-off-plane-logo-2RC5DTJ.jpg" clip-rule="evenodd" />
            
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
            <div className="flex gap-3 items-center">
              <p className="text-sm text-gray-500"> <a href="#" className="font-medium text-gray-900">Đang vận chuyển</a></p>
              <Button type="primary">Xác nhận</Button>
            </div>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time dateTime="2020-09-28">Sep 28</time>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div className="relative pb-8">
        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
              <img className="h-5 w-5 text-white"
                 src="https://res.cloudinary.com/teepublic/image/private/s--AwgOGWhQ--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1615488250/production/designs/20135311_0.jpg" />
            
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
            <div className="flex gap-3 items-center">
              <p className="text-sm text-gray-500"> <a href="#" className="font-medium text-gray-900">Đang giao hàng</a></p>
              <Button type="primary">Xác nhận</Button>
            </div>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time dateTime="2020-09-30">Sep 30</time>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div className="relative pb-8">
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
            <div className="flex gap-3 items-center">
              <p className="text-sm text-gray-500"> <a href="#" className="font-medium text-gray-900">Đã giao hàng</a></p>
              <Button type="primary">Xác nhận</Button>
            </div>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time dateTime="2020-10-04">Oct 4</time>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div className="relative pb-8">
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
            <div className="flex gap-3 items-center">
              <p className="text-sm text-gray-500"> <a href="#" className="font-medium text-gray-900">Hoàn thành</a></p>
              <Button type="primary">Xác nhận</Button>
            </div>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time dateTime="2020-10-04">Oct 4</time>
            </div>
          </div>
        </div>
      </div>
    </li>

    <li>
      <div className="relative pb-8">
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
            <div className="flex gap-3 items-center">
              <p className="text-sm text-gray-500"> <a href="#" className="font-medium text-gray-900">Hủy đơn hàng</a></p>
              <Button className="bg-black" type="primary">Xác nhận</Button>
            </div>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time dateTime="2020-10-04">Oct 4</time>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
    
    </Col>


    <Col className="mb-5" span={24}>
    <div className='lable font-bold text-[17px] text-[#344767] my-5'>Danh sách sản phẩm đặt hàng</div>
    <Table
            pagination={{ pageSize: 8 }}
            columns={columns}
            size='middle'
            scroll={{ x: 1000, y: 500 }}
            sticky={{ offsetHeader: 0 }}
            dataSource={dataOrderDetail}
            loading={false}
            className='border-2 rounded-md'
          />
    </Col>

    <Col span={12}>
      <Card title="Thanh toán" bordered={false} extra={<> <Tag color="#f50">{dataItem.payment_status}</Tag></>}>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Tổng tiền sản phẩm : </b>
              <span className="">{VND(dataItem.total_price)}</span>
          </div>

          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Giảm giá : </b>
              <span className="">{VND(Number(dataItem.total_price) - Number(dataItem.discount_price))}</span>
          </div>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Kiểu thanh toán : </b>
              <span className="">{dataItem.payment_methods}</span>
          </div>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Phí vận chuyển : </b>
              <span className="">0đ</span>
          </div>
          <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="text-[19px]">Tổng cộng : </b>
              <b className="text-[19px] text-red-500">{ VND(Number(dataItem.discount_price))}</b>
          </div>
      </Card>
    </Col>
    <Col span={12}>
      <Card title="Giao hàng" bordered={false}>
      <div className="flex justify-between border-solid border-b-[1px] border-b-[#eee] py-4">
              <b className="">Trạng thái: </b>
              <span className="">Đã giao</span>
          </div>

         
      </Card>
    </Col>

    
  </Row>
    
    
    </>)
}