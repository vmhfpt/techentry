import { Flex, Spin } from "antd";

export default function LoadingPage(){
    return <>
    
    <div className="flex justify-center items-center w-[100%] h-[80vh] text-red-500 text-[20px] ">
        <Flex gap="small" vertical>
        <Flex gap="small">
        
        
        <Spin tip="Loading" size="large">
            This can get a few minutes
        </Spin>
        </Flex>
        
    </Flex>
    </div>
    
    
    
    </>
}