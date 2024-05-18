import { Outlet } from 'react-router-dom'
import ListBanner from './_components/list'

export default function BannerManagement() {
  return (
    <div>
      <ListBanner />
      <Outlet />
    </div>
  )
}
