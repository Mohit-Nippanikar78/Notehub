import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { RiAdminLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../features/user'
import { setEditor, setNavbarHeight } from '../../features/notes'
import { useOutsideClick } from '../elements/hooks'
import process from "process";
const Navbar = () => {
    let dispatch = useDispatch()
    let navRef = useRef(null)
    let { theme } = useSelector(state => state.user)
    let { editor } = useSelector(state => state.notes)
    const [passbox, setPassbox] = useState(false)
    useOutsideClick(navRef, () => {
        setPassbox(false)
    })
    useEffect(() => {
        dispatch(setNavbarHeight(navRef.current.getBoundingClientRect().height))
    }, [])
    return (
        <div ref={navRef} className="col-span-6 bg-white z-40 flex w-full items-center justify-between pr-8 shadow-light-nav dark:bg-offblack dark:shadow-dark-nav">
            {theme == "light" ?
                <img src="/images/dark-logo.png" className='w-40' alt="" /> :
                <img src="/images/light-logo.png" className='w-40' alt="" />
            }
            <div className="flex gap-8 items-center">
                {!editor ?
                    <span class="align-middle bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Viewer</span>
                    : <span class="align-middle bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Editor</span>}
                {passbox &&
                    <input type="password" autoFocus={true} placeholder='Enter passcode' className='selection-none text-md border py-1 px-3 focus:outline-0' onChange={(e) => {
                        if (e.target.value == import.meta.env.VITE_EDITOR_PASSCODE) {
                            setPassbox(false)
                            dispatch(setEditor(true))
                        }
                    }} />
                }
                {!editor &&
                    <RiAdminLine className='text-2xl text-icon-grey cursor-pointer hover:text-black' onClick={() => { setPassbox(true) }} />
                }
                {theme == "light" ? (
                    <MdOutlineDarkMode className='text-2xl text-icon-grey cursor-pointer hover:text-black' onClick={() => { dispatch(setTheme("dark")) }} />
                ) : (
                    <MdOutlineLightMode className='text-2xl text-white cursor-pointer hover:text-white-500' onClick={() => { dispatch(setTheme("light")) }} />
                )}
            </div>
        </div>
    )
}


export default Navbar