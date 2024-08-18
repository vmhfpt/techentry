import {
  Card,
  Col,
  Flex,
  Row,
  Typography,
} from "antd";
  
import LineChart from "./components/charts/lineChart";
import cart from "./components/icon/Cart";
import heart from "./components/icon/Heart";
import dollor from "./components/icon/Dollor";
import profile from "./components/icon/Profile";
import Overview from "./components/Overview";
import { useAppSelector } from "../../../../app/hooks";
import { useGetStatisticalTodayQuery } from "./StatisticalEnpoint";
import { VND } from "@/utils/formatVietNamCurrency";
import CountUp from 'react-countup';
import Piechart from "./components/charts/pieChart";

export default function Dashboard() {
    const {backgroundColor} = useAppSelector(state => state.web)
    const {data, isLoading} = useGetStatisticalTodayQuery({})
    const { Title, Text } = Typography;  
  
    return (
      <>
        <div className="layout-content">
          <Row className="rowgap-vbox" gutter={[24, 0]}>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>Doanh số bán hàng</span>
                        <Title level={3}>
                          <CountUp end={data ? data.salesByDay.title : 100000000} style={{color: 'black', fontSize: '24px'}}/> <small className={`${data && data.salesByDay.percent < 0 ? 'redtext' : 'bnb2'}`}>{data ? data.salesByDay.percent : 0}%</small>
                        </Title>
                      </Col>
                      <Col xs={5} xl={2}>
                        <Flex align="center" justify="center" className="w-[48px] h-[48px] text-[#ffff] rounded-[0.5rem]" style={{background: backgroundColor}}>{dollor}</Flex>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>Người dùng mới</span>
                        <Title level={3}>
                          <CountUp end={data ? data.userByDay.title : 100000000} style={{color: 'black', fontSize: '24px'}}/> <small className={`${data && data.userByDay.percent < 0 ? 'redtext' : 'bnb2'}`}>{data ? data.userByDay.percent : 0}%</small>
                        </Title>
                      </Col>
                      <Col xs={5} xl={2}>
                        <Flex align="center" justify="center" className="w-[48px] h-[48px] text-[#ffff] rounded-[0.5rem]" style={{background: backgroundColor}}>{profile}</Flex>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>Số lượng khuyến mãi</span>
                        <Title level={3}>
                          <CountUp end={data ? data.totalCoupon.title : 100000000} style={{color: 'black', fontSize: '24px'}}/> <small className={`${data && data.totalCoupon.percent < 0 ? 'redtext' : 'bnb2'}`}>{data ? data.totalCoupon.percent : 0}%</small>
                        </Title>
                      </Col>
                      <Col xs={5} xl={2}>
                        <Flex align="center" justify="center" className="w-[48px] h-[48px] text-[#ffff] rounded-[0.5rem]" style={{background: backgroundColor}}>{heart}</Flex>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>Tổng giá trị đơn hàng</span>
                        <Title level={3}>
                          <CountUp end={data ? data.orderByDay.title : 100000000} style={{color: 'black', fontSize: '24px'}}/> <small className={`${data && data.orderByDay.percent < 0 ? 'redtext' : 'bnb2'}`}>{data ? data.orderByDay.percent : 0}%</small>
                        </Title>
                      </Col>
                      <Col xs={5} xl={2}>
                        <Flex align="center" justify="center" className="w-[48px] h-[48px] text-[#ffff] rounded-[0.5rem]" style={{background: backgroundColor}}>{cart}</Flex>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
          </Row>
  
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={15} className="mb-24">
              <Overview/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={9} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <Flex vertical gap={20}>
                <Flex justify="space-between" className="flex-col md:flex-row md:align-items-center " flex={1}>
                  <Text className=" font-bold text-[24px]">
                    Danh mục được quan tâm nhất
                  </Text>
                </Flex>
                <Piechart color={'#3a416f'}/>
                </Flex>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}
