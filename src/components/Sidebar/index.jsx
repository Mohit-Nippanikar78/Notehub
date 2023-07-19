import React, { useRef } from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import { MdGridView } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTitle, setViewAllToggle } from '../../features/notes'
import './styles.css'
const Sidebar = () => {
    let dispatch = useDispatch()
    let btnRef = useRef(null)
    let { titles, activeTitle, navbarHeight } = useSelector(state => state.notes)
    return (
        <div className="relative bg-white  z-40  min-w-[14vw] shadow-light-side dark:bg-offblack dark:shadow-none"   >
            <div ref={btnRef} className='sticky top-0 bg-white shadow-light-nav py-3 px-6 flex items-center justify-between '>
                <button className={`rounded-md py-2 px-3 font-bold  flex text-md items-center justify-start gap-4 shadow-lg text-white`} style={{ background: "linear-gradient(130deg,#e91e63,#272a80)" }}>Create Note</button>
                <MdGridView className='text-xl text-main hover:text-black cursor-pointer' onClick={() => { dispatch(setViewAllToggle(true)) }} />
            </div>
            <div className='sidebar-heads overflow-y-auto' style={{ height: window.innerHeight - navbarHeight - btnRef.current.getBoundingClientRect().height }} >
                {titles.map((item, index) => {
                    return <SidebarBtn item={item} key={index} active={activeTitle == item.id} />
                })}
            </div>
        </div>
    )
}
const SidebarBtn = ({ item, active }) => {
    let dispatch = useDispatch()
    let { id, title } = item
    return (
        <button className={`w-full py-3 font-thin px-4 flex text-md items-center justify-start gap-4 bg-opacity-10 border-l-4 ${active ? "bg-myrtle  border-myrtle text-myrtle" : "border-white hover:bg-gray-100 dark:border-offblack"} dark:text-white`}
            onClick={() => { dispatch(setActiveTitle(id)) }}>
            <AiOutlineFile className='text-xl' /> {title}
        </button>
    )
}
export default Sidebar;