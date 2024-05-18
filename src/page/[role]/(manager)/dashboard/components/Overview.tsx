import { Card, Col, Flex, Row, Select, Typography } from 'antd'
import Barchart from './charts/barChart'

export default function Overview() {
    const { Title, Text } = Typography;    

    return (
        <Card bordered={false} className="criclebox h-full">
            <Flex justify="space-between" className="flex-col md:flex-row md:align-items-center ">
                <Text className=" font-bold text-[24px]">
                Sales Overview
                </Text>
                <Select
                showSearch
                style={{ width: 150 }}
                placeholder="Year"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                    {
                    value: '1',
                    label: '2015',
                    },
                    {
                    value: '2',
                    label: '2016',
                    },
                    {
                    value: '3',
                    label: '2017',
                    },
                    {
                    value: '4',
                    label: '2018',
                    },
                    {
                    value: '5',
                    label: '2019',
                    },
                    {
                    value: '6',
                    label: '2020',
                    },
                ]}
                />
            </Flex>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={4}>
                <Text className=" font-bold text-[24px] text-gray-400">
                    $3.600.000
                </Text>

                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={20}>
                <Barchart color={'#3a416f'}/>
                </Col>
            </Row>
        </Card>
    )
}
