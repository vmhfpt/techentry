import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import BaseModalActions from './BaseModalActions';

interface Props {
    visible: boolean;
    loadingModal?: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    title?: string;
    content?: string;
}

export default class ConfirmModal extends React.PureComponent<Props> {
    render() {
        const { visible, title, handleOk, handleCancel, loadingModal, content } = this.props;
        return (
            <Modal
                visible={visible}
                title={title}
                onOk={handleOk}
                onCancel={handleCancel}
                width={382}
                centered
                footer={
                    <BaseModalActions
                        okText="Xác nhận"
                        onCancel={handleCancel}
                        onOk={handleOk}
                        loading={loadingModal}
                    />
                }
            >
                <div>{content}</div>
            </Modal>
        );
    }
}
