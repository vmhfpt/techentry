import { Card, Col, Flex, Row, Select } from "antd";
import { Button, Form, Input, message, Space } from 'antd';

import { Typography } from 'antd';
import {  Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

import type { TableColumnsType } from 'antd';
import CategoryAttribute from "./category_attribute/List";
import Attribute from "./attribute/list";
import ValueAttribute from "./value_attribute/list";



export default function ListAttribute(){
 


  
 
    return (<>
    
    <Row gutter={16}>
      <Col span={8} >
     

      <CategoryAttribute  />

      </Col>


      <Col span={8}>

     
      <Attribute />




      </Col>
      <Col span={8}>

        <ValueAttribute />


      </Col>
    </Row>
        </>)
}