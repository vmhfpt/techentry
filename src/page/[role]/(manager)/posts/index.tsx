import { Outlet } from 'react-router-dom'
import ListPosts from './_components/list'

export default function PostsManagement() {
  return (
    <div>
      <ListPosts />
      <Outlet />
    </div>
  )
}
