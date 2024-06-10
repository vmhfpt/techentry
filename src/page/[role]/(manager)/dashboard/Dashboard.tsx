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

export default function Dashboard() {
    const { Title } = Typography;    
    const {backgroundColor} = useAppSelector(state => state.web)
    const count = [
      {
        today: "Today’s Sales",
        title: "$53,000",
        persent: "+30%",
        icon: dollor,
        bnb: "bnb2",
      },
      {
        today: "Today’s Users",
        title: "3,200",
        persent: "+20%",
        icon: profile,
        bnb: "bnb2",
      },
      {
        today: "New Clients",
        title: "+1,200",
        persent: "-20%",
        icon: heart,
        bnb: "redtext",
      },
      {
        today: "New Orders",
        title: "$13,200",
        persent: "10%",
        icon: cart,
        bnb: "bnb2",
      },
    ];
  
    return (
      <>
        <div className="layout-content">
          <Row className="rowgap-vbox" gutter={[24, 0]}>
            {count.map((c, index) => (
              <Col
                key={index}
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
                        <span>{c.today}</span>
                        <Title level={3}>
                          {c.title} <small className={c.bnb}>{c.persent}</small>
                        </Title>
                      </Col>
                      <Col xs={5} xl={2}>
                        <Flex align="center" justify="center" className="w-[48px] h-[48px] text-[#ffff] rounded-[0.5rem]" style={{background: backgroundColor}}>{c.icon}</Flex>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
  
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={15} className="mb-24">
              <Overview/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={9} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <LineChart color={'#3a416f'}/>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}
