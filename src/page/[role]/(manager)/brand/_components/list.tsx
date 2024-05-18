
import { Table, Typography } from 'antd';
import moment from 'moment';
import type { TableProps } from 'antd';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { IBrand } from '../../../../../common/types/brand.interface';
import useBrand from '../utils/brand.hooks';
import ConfirmModal from '../../../(base)/brand/confirm.modal';
import ModalCreateBrand from './add';



export default function ListBrand() {
  const hooks = useBrand();
  console.log(hooks.dataList);
  // const data: IBrand[] = [
  //     {
  //       key: '1',
  //       name: 'John Brown',
  //       age: 32,
  //       address: 'New York No. 1 Lake Park',
  //       tags: ['nice', 'developer'],
  //     },
  //     {
  //       key: '2',
  //       name: 'Jim Green',
  //       age: 42,
  //       address: 'London No. 1 Lake Park',
  //       tags: ['loser'],
  //     },
  //     {
  //       key: '3',
  //       name: 'Joe Black',
  //       age: 32,
  //       address: 'Sydney No. 1 Lake Park',
  //       tags: ['cool', 'teacher'],
  //     },
  //   ];

  const columns: TableProps<IBrand>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '5%',
      render: (_: any, __: IBrand, index: number) => {
        return index + 1;
      },
    },
    {
      title: 'Tên hãng',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, item: IBrand) => {
        return item.name;
      },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'age',
      key: 'age',
      render: (_: any, item: IBrand) => {
        return item.logo;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'age',
      key: 'age',
      render: (_: any, item: IBrand) => {
        // print(item.create_at);
        return <>
          <p>{moment(item.create_at).format("DD-MM-YYYY")}</p>
        </>
          ;
      },
    },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Flex wrap="wrap" gap="small">
          <Button type="primary" onClick={() => hooks.onEditBrand(record)}  >
            Edit
          </Button>
          <Button type="primary" danger onClick={() => hooks.onShowDeletePopup(record)}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];


  return <>
    <Typography.Title editable level={2} style={{ margin: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        List Brand <Flex wrap="wrap" gap="small">
          {/* <Link to="add"> */}
          <Button type="primary" danger onClick={() => hooks.onShowModalDetail()}>
            Add Brand
          </Button>
          {/* </Link> */}
        </Flex>
      </div>

    </Typography.Title>

    <Table columns={columns} dataSource={hooks.dataList} loading={hooks.loading} />



    <ConfirmModal
      handleCancel={hooks.onHideConfirmPopup}
      handleOk={hooks.handleOkPopup}
      visible={hooks.modalParams.visible}
      title={hooks.modalParams.title}
      content={hooks.modalParams.content}
    />


    <ModalCreateBrand
      form={hooks.form}
      isEdit={hooks.Index}
      onCancelModalCreate={hooks.onCancelModalDetail}
      onSubmit={hooks.onSubmit}
      visible={hooks.visibleModalBrandDetail}
    />
    {/* {
      hooks.visibleModalBrandDetail &&
      <ModalNewsDetail
        visible={hooks.visibleModalBrandDetail}
        onCancel={hooks.onCancelModalDetail}
        dataEdit={hooks.BrandEdit}
        onSubmit={hooks.onSubmitModalDetail}
      />
    } */}
  </>
}