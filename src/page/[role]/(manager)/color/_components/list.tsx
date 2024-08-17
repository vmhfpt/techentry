
import { Table, Typography } from 'antd';
import moment from 'moment';
import type { TableProps } from 'antd';
import { Button, Flex } from 'antd';

import ModalCreateColor from './add';
import ConfirmModal from '@/page/[role]/(base)/brand/confirm.modal';
import { IColor } from '@/common/types/color.interface';
import useColor from '../utils/color.hooks';



export default function ListColor() {
  const hooks = useColor();
  const columns: TableProps<IColor>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '5%',
      render: (_: any, __: IColor, index: number) => {
        return index + 1;
      },
    },
    {
      title: 'Tên màu sắc',
      dataIndex: 'age',
      key: 'age',
      render: (_: any, item: IColor) => {
        return item.name;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Flex wrap="wrap" gap="small">
          <Button type="primary" onClick={() => hooks.onEditColor(record)}  >
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => hooks.onShowDeletePopup(record)}>
            xóa
          </Button>
        </Flex>
      ),
    },
  ];


  return <>
    <Typography.Title editable level={2} style={{ margin: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        Danh sách màu sắc <Flex wrap="wrap" gap="small">
          {/* <Link to="add"> */}
          <Button type="primary" danger onClick={() => hooks.onShowModalDetail()}>
            Thêm màu sắc
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


    <ModalCreateColor
      form={hooks.form}
      isEdit={hooks.Index}
      onCancelModalCreate={hooks.onCancelModalDetail}
      onSubmit={hooks.onSubmit}
      visible={hooks.visibleModalColorDetail}
    />
  </>
}