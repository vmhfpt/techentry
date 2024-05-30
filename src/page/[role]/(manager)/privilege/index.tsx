import { Col, Row } from "antd";
import ListPrivilegeGroup from "./_components/privilege_group/list";
import ListPrivilege from "./_components/privilege/list";
export default function PrivilegeManagement(){

 
    return (
       <>
        <Row gutter={16}>
      <Col span={12} >
        <ListPrivilegeGroup />
      </Col> 


      <Col span={12}>
        <ListPrivilege />
      </Col>
    </Row>
       
       </>
    )
}