import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { store } from './features/store'
import { Navbar, Sidebar, ViewAll } from './components'
import { getInitTheme } from './features/user'

const Root = () => {
    return (
        <Provider store={store}>
            <Overlays />
            <div className="max-h-screen grid grid-cols-6">
                <Navbar />
                <Sidebar />
                <Outlet />
            </div>
        </Provider>
    )
}
const Overlays = () => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitTheme())
    }, [])
    return;
}


export default Root