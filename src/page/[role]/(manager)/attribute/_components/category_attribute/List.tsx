import { Col, Row, Table, Form, Select, Button, TableColumnsType, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetCategoriesAttributesQuery, useCreateCategoryAttributesMutation, useDeleteCategoryAttributesMutation} from "./CategoryAttributeEndpoints";
import { ICategoryAttribute } from "../../../../../../common/types/categoryAttribute.interface";
import { useGetAttributesQuery } from "../attribute/AttributeEndpoints";
import { IAttribute } from "../../../../../../common/types/attribute.interface";
import { popupSuccess,popupError } from '@/page/[role]/shared/Toast'
import { Typography } from 'antd';

const { Title } = Typography;
export default function CategoryAttribute(){
  const [id, setId] = useState<number | string>();
  const [deleteCategoryAttribute, {isLoading : isDeleting}, ] = useDeleteCategoryAttributesMutation();
    const [createCategoryAttribute, { isLoading: loadingCreateCategoryAttribute }] = useCreateCategoryAttributesMutation()
     const {data, isLoading : loadingCategoryAttribute} = useGetCategoriesAttributesQuery({});
    const {data : attributes, isLoading : loadingAttributes} = useGetAttributesQuery({});
    const dataItem = data?.map((item : ICategoryAttribute, key : number) => {
        return {
          ...item,
          key : key
        }
    })
    const dataAttributes = attributes?.map((item : IAttribute) => {
         return {
           value : item.id,
           label : item.name
         }
    })
    const validateMessages = {
      required: '${label} is required!',
    }
    const [categories, setCategory] = useState([]);

    useEffect(() => {
      (async () => {
         const response = await axios.get('http://localhost:3000/categories');
         setCategory(response.data);
      })();
    

    }, [])

    const filterCategory = categories?.map((item : {id : number, name : string}) => {
         return {
            text : item.name,
            value : item.id
         };
    })

    const dataCategories = categories?.map((item : {id : number, name : string}) => {
      return {
         value : item.id,
         label : item.name
      }
    });

    const confirm = async (id : number | string) => {
      setId(id)
      await deleteCategoryAttribute(id);
       popupSuccess('Delete success');
    };
    const columns: TableColumnsType<ICategoryAttribute> = [ // 
        {
          title: 'ID',
          width: 40,
          dataIndex: 'id',
          fixed: 'left',
        },
        {
          title: 'Category',
          width: 100,
          dataIndex: 'category',
          render: (category: { name: string }) => category.name,
          filters: filterCategory,
          onFilter: (value, record) => record.categoryId == value,
       
        },
        { title: 'Attribute', 
          dataIndex: 'attribute', 
          fixed: 'left',
          render: (attribute: { name: string }) => attribute.name,
        
        },
        
        {
          title: 'Action',
          fixed: 'right',
          width: 90,
          render: (data : ICategoryAttribute) => (
            <Popconfirm
            disabled={isDeleting}
            title="Delete the user"
            description={`Are you sure to delete  ?`}
            onConfirm={() => confirm(String(data.id))}
            okText="Yes"
            cancelText="No"
          >
          <Button type="primary" danger loading={isDeleting && id == data.id}>
              Delete
          </Button>
         
          </Popconfirm>
            
          ),
        },
      ];

      const onFinish = async (values: ICategoryAttribute) => {
         try {
            await createCategoryAttribute(values);
            popupSuccess("Add category attribute success");
         } catch (error) {
            popupError("Add category attribute error");
         }
      }
    
    return (<>
    <Title level={2}>Danh mục thuộc tính sản phẩm</Title>
    <Table columns={columns} dataSource={dataItem}  
      loading={loadingCategoryAttribute}
      
      pagination={{ 
        defaultPageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '50', '100']
      }} 
      
      
      bordered />

    <Form 
      layout="vertical"
      onFinish={onFinish}
      validateMessages={validateMessages}
    
    >

    <Row gutter={16}>
      <Col span={12}>

      <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
          <Select
        placeholder="Select category"
          style={{ width: '100%' }}
          onChange={() => {}}
          options={dataCategories}
        />
      </Form.Item>


      </Col>
      <Col span={12}>
      <Form.Item label="Atribute" name="attributeId" rules={[{ required: true }]}>
          <Select
          placeholder="Select attribute"
          loading={loadingAttributes}
         
          style={{ width: '100%' }}
          onChange={() => {}}
          options={dataAttributes}
        />
      </Form.Item>
      </Col>
      <Col span={24}>

      <Form.Item >
            <Button loading={loadingCreateCategoryAttribute} disabled={loadingCreateCategoryAttribute} type='primary' htmlType='submit'>
              Add
            </Button>
          </Form.Item>

      </Col>
    </Row>

    </Form>
    
    </>);
}