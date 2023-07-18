import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { store } from './features/store'
import { Navbar, Sidebar } from './components'
import { getInitTheme } from './features/user'

const Root = () => {

    return (
        <Provider store={store}>
            <Navbar />
            <Sidebar />
            <Overlays />
            <Outlet />
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