import { Outlet } from 'react-router-dom'
import ListCategory from './_components/list'

export default function CategoryManagement() {
  return (
    <div>
      <ListCategory />
      <Outlet />
    </div>
  )
}
