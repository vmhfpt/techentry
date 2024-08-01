
import { Table, Typography } from 'antd';
import moment from 'moment';
import type { TableProps } from 'antd';
import { Button, Flex } from 'antd';

import ModalCreateVoucher from './add';
import useVoucher from '../utils/brand.hooks';
import { IVoucher } from '@/common/types/voucher.interface copy';
import ConfirmModal from '@/page/[role]/(base)/brand/confirm.modal';



export default function ListVoucher() {
  const hooks = useVoucher();
  const columns: TableProps<IVoucher>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '5%',
      render: (_: any, __: IVoucher, index: number) => {
        return index + 1;
      },
    },
    {
      title: 'Mã giảm giá',
      dataIndex: 'code',
      key: 'code',
      render: (_: any, item: IVoucher) => {
        return item.code;
      },
    },
    {
      title: 'Tên Mã giảm giá',
      dataIndex: 'age',
      key: 'age',
      render: (_: any, item: IVoucher) => {
        return item.name;
      },
    },
    {
      title: 'Số tiền chiết khấu ',
      dataIndex: 'discount_amount',
      key: 'discount_amount',
      render: (_: any, item: IVoucher) => {
        return item.discount_amount;
      },
    },

    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      key: 'tart_date',
      render: (_: any, item: IVoucher) => {
        // print(item.create_at);
        return <>
          <p>{moment(item.start_date).format("YYYY-MM-DD")}</p>
        </>
          ;
      },
    },

    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (_: any, item: IVoucher) => {
        // print(item.create_at);
        return <>
          <p>{moment(item.end_date).format("YYYY-MM-DD")}</p>
        </>
          ;
      },
    },


    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Flex wrap="wrap" gap="small">
          <Button type="primary" onClick={() => hooks.onEditVoucher(record)}  >
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
        Danh sách mã giảm giá <Flex wrap="wrap" gap="small">
          {/* <Link to="add"> */}
          <Button type="primary" danger onClick={() => hooks.onShowModalDetail()}>
            Thêm mã giảm giá
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


    <ModalCreateVoucher
      form={hooks.form}
      isEdit={hooks.Index}
      onCancelModalCreate={hooks.onCancelModalDetail}
      onSubmit={hooks.onSubmit}
      visible={hooks.visibleModalVoucherDetail}
    />
  </>
}