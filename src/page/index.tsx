import { Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import Loading from "./Loading"

const Layout = () => {
    const {loading} = useAppSelector(state => state.web)
    return (
        <>
            {loading && <Loading/>}
            <Outlet/>
        </>
    )
}

export default Layout