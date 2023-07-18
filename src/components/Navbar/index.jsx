import React from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../features/user'

const Navbar = () => {
    let dispatch = useDispatch()
    let { theme } = useSelector(state => state.user)
    return (
        <div className="z-20 flex w-full items-center justify-between pr-8 shadow-light-nav dark:bg-offblack dark:shadow-dark-nav">
            {theme == "light" ?
                <img src="/images/dark-logo.png" className='w-40' alt="" /> :
                <img src="/images/light-logo.png" className='w-40' alt="" />
            }
            {theme == "light" ? (
                <MdOutlineDarkMode className='text-2xl text-icon-grey cursor-pointer hover:text-black' onClick={() => { dispatch(setTheme("dark")) }} />
            ) : (
                <MdOutlineLightMode className='text-2xl text-white cursor-pointer hover:text-white-500' onClick={() => { dispatch(setTheme("light")) }} />
            )}
        </div>
    )
}


export default Navbar