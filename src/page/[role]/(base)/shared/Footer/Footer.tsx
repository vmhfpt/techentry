import Logo from '../Logo/Logo'
import SocialsList1 from '../SocialsList1/SocialsList1'
import { CustomLink } from '../../../../../data/types'
import React from 'react'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '5',
    title: 'Hỗ trợ miễn phí',
    menus: [
      { href: '#', label: 'Gọi mua hàng 0123456789' },
      { href: '#', label: 'Gọi khiếu nại 123456789' },
      { href: '#', label: 'Gọi bảo hành 123456789' },
  
    ]
  },
  {
    id: '1',
    title: 'Thông tin và chính sách',
    menus: [
      { href: '#', label: 'Mua hàng và thanh toán Online' },
      { href: '#', label: 'Chính sách giao hàng' },
      { href: '#', label: 'Thông tin hoá đơn mua hàng' },
      { href: '#', label: 'Mua hàng và thanh toán Online' }
    ]
  },
  {
    id: '2',
    title: 'Dịch vụ và thông tin khác',
    menus: [
      { href: '#', label: 'Ưu đãi thanh toán' },
      { href: '#', label: 'Chính sách Bảo hành' },
      { href: '#', label: 'Developers' },
      { href: '#', label: 'Learn design' }
    ]
  },
  {
    id: '4',
    title: 'Giới thiệu',
    menus: [
      { href: '#', label: 'Tuyển dụng' },

    ]
  }
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className='text-sm'>
        <h2 className='font-semibold text-neutral-700 dark:text-neutral-200'>{menu.title}</h2>
        <ul className='mt-5 space-y-4'>
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className='text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white'
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className='nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700'>
      <div className='container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 '>
        <div className='grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col'>
          <div className='col-span-2 md:col-span-1'>
            <Logo />
          </div>
          <div className='col-span-2 flex items-center md:col-span-3'>
            <SocialsList1 className='flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start' />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  )
}

export default Footer
