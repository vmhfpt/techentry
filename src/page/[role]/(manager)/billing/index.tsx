import {
    Row,
    Col,
    Card,
    Statistic,
    Button,
    List,
    Descriptions,
    Avatar,
    Flex,
  } from "antd";
  
  import { PlusOutlined, ExclamationOutlined } from "@ant-design/icons";
  import mastercard from "../../../../assets/images/manager/mastercard-logo.png";
  import paypal from "../../../../assets/images/manager/paypal-logo-2.png";
  import visa from "../../../../assets/images/manager/visa-logo.png";
  import Calender from "./components/icon/Calender";
  import Deletebtn from "./components/icon/Deletebtn";
  import Mins from "./components/icon/Mins";
  import Pencil from "./components/icon/Pencil";
  import { useAppSelector } from "../../../../app/hooks";
  import Wifi from "./components/icon/Wifi";
  import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
  import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
  import AddRoundedIcon from '@mui/icons-material/AddRounded';
  
const Billing = () => {
    const {darkColor} = useAppSelector(state => state.web)

    const data = [
      {
        title: "March, 01, 2021",
        description: "#MS-415646",
        amount: "$180",
      },
      {
        title: "February, 12, 2021",
        description: "#RV-126749",
        amount: "$250",
      },
      {
        title: "April, 05, 2020",
        description: "#FB-212562",
        amount: "$550",
      },
      {
        title: "June, 25, 2019",
        description: "#QW-103578",
        amount: "$400",
      },
      {
        title: "March, 03, 2019",
        description: "#AR-803481",
        amount: "$700",
      },
    ];

    const newest = [
      {
        headding: <h6>NEWEST</h6>,
        avatar: <Mins/>,
        title: "Netflix",
        description: "27 March 2021, at 12:30 PM",
        amount: "- $2,500",
        textclass: "text-light-danger",
        amountcolor: "text-danger",
      },
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "Apple",
        description: "27 March 2021, at 04:30 AM",
        amount: "+ $2,000",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
    ];
    const yesterday = [
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "Stripe",
        description: "26 March 2021, at 12:30 AM",
        amount: "+ $750",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "HubSpot",
        description: "26 March 2021, at 11:30 AM",
        amount: "+ $1,050",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "Creative Tim",
        description: "26 March 2021, at 07:30 AM",
        amount: "+ $2,400",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
      {
        avatar: <ExclamationOutlined style={{ fontSize: 10 }} />,
        title: "Webflow",
        description: "26 March 2021, at 04:00 AM",
        amount: "Pending",
        textclass: "text-warning",
        amountcolor: "text-warning-b",
      },
    ];

    const information = [
      {
        title: "Oliver Liam",
        description: "Viking Burrito",
        address: "oliver@burrito.com",
        vat: "FRB1235476",
      },
      {
        title: "Lucas Harper",
        description: "Stone Tech Zone",
        address: "lucas@syone-tech.com",
        vat: "FRB1235476",
      },
      {
        title: "Oliver Liam",
        description: "ethan@fiber.com",
        vat: "NumberFRB1235476",
      },
    ];
  
    return (
      <>
        <Row gutter={[24, 0]}>
          <Col xs={24} md={16}>
            <Row gutter={[24, 0]}>
              <Col xs={24} xl={12} className="mb-24">
                <Card
                  title={<Wifi color={'#ffff'} style={{ width: '24px' }} />}
                  bordered={false}
                  className="card-credit header-solid h-ful"
                  style={{ backgroundColor: 'rgb(52, 71, 103)' }}
                >
                  <h5 className="card-number">4562 1122 4594 7852</h5>
  
                  <div className="card-footer">
                    <div className="mr-30">
                      <p>Card Holder</p>
                      <h6>Jack Peterson</h6>
                    </div>
                    <div className="mr-30">
                      <p>Expires</p>
                      <h6>11/22</h6>
                    </div>
                    <div className="card-footer-col col-logo ml-auto">
                      <img src={mastercard} alt="mastercard" />
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={12} xl={6} className="mb-24">
                <Card bordered={false} className="widget-2 h-full">
                  <Statistic
                    title={
                      <>
                        <div className="icon text-white">{<AccountBalanceRoundedIcon/>}</div>
                        <h6 style={{ color: '#3a416f' }}>Salary</h6>
                        <p style={{ color: '#3a416f' }}>Belong Interactive</p>
                      </>
                    }
                    value={'$2,000'}
                    prefix={<AddRoundedIcon/>}
                  />
                </Card>
              </Col>
              <Col xs={12} xl={6} className="mb-24">
                <Card bordered={false} className="widget-2 h-full">
                  <Statistic
                    title={
                      <>
                        <div className="icon">
                          <img src={paypal} alt="paypal" />
                        </div>
                        <h6 style={{ color: '#3a416f' }}>Paypal</h6>
                        <p style={{ color: '#3a416f' }}>Freelance Paymente</p>
                      </>
                    }
                    value={"$49,000"}
                    prefix={<AddRoundedIcon />}
                  />
                </Card>
              </Col>
              <Col xs={24} className="mb-24">
                <Card
                  className="header-solid h-full ant-card-p-0"
                >
                  <Flex
                    className="ant-row-flex ant-row-flex-middle"
                    align="center"
                    justify="space-between"
                  >
                    <h6 className="font-semibold m-0">Payment Methods</h6>
                    <Button style={{ background: darkColor, color: 'white', fontSize: '12px'}} className=" hover:scale-110">ADD NEW CARD</Button>
                  </Flex>
                  <Row gutter={[24, 0]} className=" pt-5">
                    <Col span={24} md={12}>
                      <Card className="payment-method-card">
                          <Flex align="center" justify="space-between">
                            <img src={mastercard} alt="mastercard" />
                            <h6 className="card-number">**** **** **** 7362</h6>
                            <Button type="link" className="ant-edit-link">
                              {<Pencil/>}
                            </Button>
                          </Flex>
                      </Card>
                    </Col>
                    <Col span={24} md={12}>
                      <Card className="payment-method-card">
                        <Flex align="center" justify="space-between">
                          <img src={visa} alt="visa" />
                          <h6 className="card-number">**** **** **** 3288</h6>
                          <Button type="link" className="ant-edit-link">
                            {<Pencil/>}
                          </Button>
                        </Flex>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24} md={8} className="mb-24">
            <Card
              bordered={false}
              className="header-solid h-full ant-invoice-card"
              title={<h6 className=" font-bold m-0">Invoices</h6>}
              extra={
                <Button className={`h-[30px] w-[100px] text-[#17c1e8] border-[#17c1e8] font-bold hover:scale-110`}>
                  <span className="font-bold text-[11px]">VIEW ALL</span>
                </Button>
              }
            >
              <List
                itemLayout="horizontal"
                className="invoice-list"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    actions={[<Button type="link"><Flex align="center" justify="center" style={{ color: '#3a416f' }}><PictureAsPdfRoundedIcon/> <span>PDF</span></Flex></Button>]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <div className="amount">{item.amount}</div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col span={24} md={16} className="mb-24">
            <Card
              className="header-solid h-full"
              bordered={false}
              title={<h6 className="font-semibold m-0">Billing Information</h6>}
            >
              <Row gutter={[24, 24]}>
                {information.map((i, index) => (
                  <Col span={24} key={index}>
                    <Card className="card-billing-info" bordered={false}>
                      <div className="col-info">
                        <Descriptions title="Oliver Liam">
                          <Descriptions.Item label="Company Name" span={3}>
                            Viking Burrito
                          </Descriptions.Item>
  
                          <Descriptions.Item label="Email Address" span={3}>
                            oliver@burrito.com
                          </Descriptions.Item>
                          <Descriptions.Item label="VAT Number" span={3}>
                            FRB1235476
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                      <div className="col-action">
                        <Button type="link" danger>
                          <Flex align="center">
                            {<Deletebtn/>}
                            <span>
                              DELETE
                            </span>
                          </Flex>
                        </Button>
                        <Button type="link" className="darkbtn">
                          <Flex align="center">
                            {<Pencil/>}
                            <span>
                              EDIT
                            </span>
                          </Flex>
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
          <Col span={24} md={8} className="mb-24">
            <Card
              bordered={false}
              className="header-solid h-full  ant-list-yes"
              title={<h6 className="font-bold text-[#3a416f]">Your Transactions</h6>}
              extra={
                <p className="card-header-date">
                  <Flex align="center">
                    {<Calender/>}
                    <span>23 - 30 March 2021</span>
                  </Flex>
                </p>
              }
            >
              <List
                header={<p className=" font-bold text-[#3a416f]">NEWEST</p>}
                className="transactions-list ant-newest"
                itemLayout="horizontal"
                dataSource={newest}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar size="small" className={item.textclass}>
                          {item.avatar}
                        </Avatar>
                      }
                      title={item.title}
                      description={item.description}
                    />
                    <div className="amount">
                      <span className={item.amountcolor}>{item.amount}</span>
                    </div>
                  </List.Item>
                )}
              />
  
              <List
                className="yestday transactions-list"
                header={ <p className=" font-bold text-[#3a416f]">YESTERDAY</p>}
                itemLayout="horizontal"
                dataSource={yesterday}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar size="small" className={item.textclass}>
                          {item.avatar}
                        </Avatar>
                      }
                      title={item.title}
                      description={item.description}
                    />
                    <div className="amount">
                      <span className={item.amountcolor}>{item.amount}</span>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
  
  export default Billing;
  