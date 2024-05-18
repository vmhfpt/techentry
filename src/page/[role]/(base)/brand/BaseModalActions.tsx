import { Button, Space } from 'antd';
import React from 'react';

interface Props {
    onOk: () => void;
    loading?: boolean;
    onCancel: () => void;
    okText: string;
    hideOkBtn?: boolean;
}

export default function BaseModalActions({ onOk, loading, onCancel, okText, hideOkBtn }: Props) {
    return (
        <Space>
            <Button size="large" key="back" type="primary" ghost onClick={onCancel}>
                {"Thoát"}
            </Button>
            {!hideOkBtn && <Button size="large" key="submit" type="primary" loading={loading} onClick={onOk}>
                {okText}
            </Button>}
        </Space>
    );
}
