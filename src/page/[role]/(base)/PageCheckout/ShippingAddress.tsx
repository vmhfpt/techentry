import Label from '../components/Label/Label'
import { FC, useEffect, useState } from 'react'
import ButtonPrimary from '../shared/Button/ButtonPrimary'
import ButtonSecondary from '../shared/Button/ButtonSecondary'
import Input from '../shared/Input/Input'
import Radio from '../shared/Radio/Radio'

import { useGetProvincesQuery, useLazyGetDistrictsQuery, useLazyGetWardsQuery } from '@/utils/addressRTKQuery'

import { Form, Select, SelectProps } from 'antd'
import axios from 'axios'
import { useLocalStorage } from '@uidotdev/usehooks'
import { ICart } from '@/common/types/cart.interface'
import { popupSuccess } from '../../shared/Toast'
import { useNavigate } from 'react-router-dom'
interface Props {
  isActive: boolean
  onCloseActive: () => void
  onOpenActive: () => void
  form : any
}

const ShippingAddress: FC<Props> = ({  isActive, onCloseActive, onOpenActive, form }) => {
  const renderShippingAddress = () => {
    const navigate = useNavigate();
    const [optionsWard, setOptionWard] = useState<SelectProps['options']>([])
    const [optionsDistrict, setOptionDistrict] = useState<SelectProps['options']>([])
    const validateMessages = {
      required: '${label} is required!',
     
      
    }
  const { data: provinces, isLoading : isLoadingProvinces, isError } = useGetProvincesQuery({})
  const [getWard, { data: dataWards, isLoading: wardLoading }] = useLazyGetWardsQuery()
  const [getDistrict, { data: dataDistricts, isLoading: districtLoading }] = useLazyGetDistrictsQuery()
  const options: SelectProps['options'] = []
  const [carts, setCart] = useLocalStorage('carts', [] as ICart[]);
  useEffect(() => {
    setOptionDistrict(() => {
      return dataDistricts?.data.map((item: { id: number; name: string }) => {
        return {
          value: `${item.name}-${item.id}`,
          label: item.name
        }
      })
    })
  }, [dataDistricts])



  useEffect(() => {
    setOptionWard(() => {
      return dataWards?.data.map((item: { id: number; name: string }) => {
        return {
          value: `${item.name}`,
          label: item.name
        }
      })
    })
  }, [dataWards])

  
  provinces?.data.forEach((item: { id: number; name: string }) => {
    options.push({
      value: `${item.name}-${item.id}`,
      label: item.name
    })
  })
  
  

  const onChangeProvince = async (value: string) => {
    form.resetFields(['district', 'ward']);
    setOptionWard([])
    if (value) {
      const splitStr = value.split(/-(\d+)/)
      const provinceId = splitStr[1]
     
      await getDistrict(provinceId)
    } else {
      setOptionDistrict([])
    }
  }
  const onChangeDistrict = async (value : any) => {
    form.resetFields(['ward'])
    if (value) {
      const splitStr = value.split(/-(\d+)/)
      const districtId = splitStr[1]
     
      await getWard(districtId)
    } else {
      setOptionWard([])
    }
  }

  const onFinish = async (values : any) => {
    
    
    const response = await axios.post('http://localhost:3000/orders', {...values, order_date : new Date()});
   
    const orderId = response.data.id;
    carts.map(async (item) => {
      const payload = {
         orderId : orderId,
         name : item.name,
         price : item.price_sale,
         quantity : item.quantity,
         image : item.image,
         variant : item.variant
      }
       await axios.post('http://localhost:3000/orderDetails', payload);
    })
    popupSuccess('order success');
    setCart([]);
    navigate('/')
    // Handle form values here
  };
    return (
      <div className='border border-slate-200 dark:border-slate-700 rounded-xl '>
        <div className='p-6 flex flex-col sm:flex-row items-start'>
          <span className='hidden sm:block'>
            <svg
              className='w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7.14008 6.75L5.34009 8.55L7.14008 10.35'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M16.8601 6.75L18.6601 8.55L16.8601 10.35'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>

          <div className='sm:ml-8'>
            <h3 className=' text-slate-700 dark:text-slate-300 flex '>
              <span className='uppercase'>SHIPPING ADDRESS</span>
              <svg
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2.5'
                stroke='currentColor'
                className='w-5 h-5 ml-3 text-slate-900 dark:text-slate-100'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
              </svg>
            </h3>
          </div>
          <ButtonSecondary
            sizeClass='py-2 px-4 '
            fontSize='text-sm font-medium'
            className='bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg'
            onClick={onOpenActive}
          >
            Change
          </ButtonSecondary>
        </div>
      <Form
        form={form}
        layout="vertical"
        name='nest-messages'
        validateMessages={validateMessages}
        onFinish={onFinish}
      
      >

      <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7  ${
            isActive ? 'block' : 'hidden'
          }`}
        >
          {/* ============ */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3'>
            <div>
              
              <Form.Item name='first_name' label='First name' rules={[{ required: true }]}>
                 <Input  placeholder='Dung' />
              </Form.Item>
              
            </div>
            <div>
              <Form.Item name='last_name' label='Last name' rules={[{ required: true }]}>
                  <Input  placeholder='Nguyen' />
              </Form.Item>
             
              
            </div>
          </div>

          {/* ============ */}
          <div className='sm:flex space-y-4 sm:space-y-0 sm:space-x-3'>
            <div className='w-full'>
              
              <Form.Item name='phone_number' label='Phone number' rules={[{ required: true }]}>
                   <Input  placeholder='03456789' />
              </Form.Item>
            </div>
          </div>

          {/* ============ */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3'>
            <div className='app__select--input'>

            <Form.Item name='provinces' label='Pronvinces' rules={[{ required: true }]}>
            <Select
              
              loading={isLoadingProvinces}
                
                placeholder='Select province'
                options={options}
                onChange={(value) => onChangeProvince(value)}
              />
          </Form.Item>
             
             
            </div>
            <div className="app__select--input">
            <Form.Item name='district' label='District' rules={[{ required: true }]}>
            <Select
              loading={districtLoading}
              onChange={(value) => onChangeDistrict(value)}
              placeholder='Enter name district'
              options={optionsDistrict}
            />
          </Form.Item>
             
            </div>
          </div>

          <div className='sm:flex space-y-4 sm:space-y-0 sm:space-x-3'>
            <div className='w-full app__select--input'>
            <Form.Item name='ward' label='Ward' rules={[{ required: true }]}>
            <Select
              
              loading={wardLoading}
              placeholder='Enter name ward'
              options={optionsWard}
            />
          </Form.Item>
            </div>
          </div>

          <div className='sm:flex space-y-4 sm:space-y-0 sm:space-x-3'>
            <div className='w-full'>

            <Form.Item name='address' label='Address' rules={[{ required: true }]}>
            <Input  placeholder='56 Tran Duy Hung' />
              </Form.Item>
            
              
            </div>
          </div>

          <div className='sm:flex space-y-4 sm:space-y-0 sm:space-x-3'>
            <div className='w-full'>

            <Form.Item name='note' label='Note' rules={[{ required: true }]}>
               <Input  placeholder='...' />
              </Form.Item>


        
            </div>
          </div>

          {/* ============ */}
          <div>
            <Label className='text-sm'>Address type</Label>
            <div className='mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3'>
              <Radio
                label={`<span class="text-sm font-medium">Home <span class="font-light">(All Day Delivery)</span></span>`}
                id='Address-type-home'
                name='Address-type'
                defaultChecked
              />
              <Radio
                label={`<span class="text-sm font-medium">Office <span class="font-light">(Delivery <span class="font-medium">9 AM - 5 PM</span>)</span> </span>`}
                id='Address-type-office'
                name='Address-type'
              />
            </div>
          </div>

          {/* ============ */}
          <div className='flex flex-col sm:flex-row pt-6'>
            <ButtonPrimary className='sm:!px-7 shadow-none' onClick={onCloseActive}>
              Save and next to Payment
            </ButtonPrimary>
            <ButtonSecondary className='mt-3 sm:mt-0 sm:ml-3' onClick={onCloseActive}>
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </Form>
      </div>
    )
  }
  return renderShippingAddress()
}

export default ShippingAddress
