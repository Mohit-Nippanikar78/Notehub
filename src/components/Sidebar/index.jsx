import React from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTitle } from '../../features/notes'
const Sidebar = () => {
    let { titles, activeTitle } = useSelector(state => state.notes)
    return (
        <div className="fixed h-full min-w-[14vw] shadow-light-side dark:bg-offblack dark:shadow-none" >
            {titles.map((item, index) => {
                return <SidebarBtn item={item} key={index} active={activeTitle == item.id} />
            })}
        </div>
    )
}
const SidebarBtn = ({ item, active }) => {
    let dispatch = useDispatch()
    let { id, title } = item
    return (
        <button className={`w-full py-3 font-thin px-4 flex text-md items-center justify-start gap-4 bg-opacity-10 border-l-4 ${active ? "bg-purple  border-purple text-purple" : "border-white hover:bg-gray-100 dark:border-offblack"} dark:text-white`}
            onClick={() => { dispatch(setActiveTitle(id)) }}>
            <AiOutlineFile className='text-xl' /> {title}
        </button>
    )
}
export default Sidebar;