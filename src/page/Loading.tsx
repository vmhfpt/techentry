import { Spin } from 'antd';
import { LoadingOutlined  } from '@ant-design/icons';

const Loading = () => {
    
    return (
        <div style={{ position: "fixed", backgroundColor: "rgba(0, 0, 0, 0.5)",inset: 0, zIndex: 9999999 }} className=' h-full top-0 bottom-0'>
          <Spin
            style={{ 
              fontSize: 24, 
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)" 
              }}
            indicator={<LoadingOutlined spin />} 
          />
        </div>
    )
}

export default Loading