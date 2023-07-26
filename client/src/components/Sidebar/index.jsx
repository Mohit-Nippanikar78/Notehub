import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import { MdGridView } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { getNoteFields, getNoteHeads, newNote, setactiveTitleId, setViewAllToggle } from '../../features/notes'
import './styles.css'
import { InView } from 'react-intersection-observer';
import { Dna } from 'react-loader-spinner'
const Sidebar = () => {
    let dispatch = useDispatch()
    let btnRef = useRef()
    let { heads, activeTitleId, navbarHeight } = useSelector(state => state.notes)
    const [page, setpage] = useState(0)
    useEffect(() => {
        dispatch(getNoteHeads(page))
    }, [page])
    return (
        <div className="relative bg-white  z-40  min-w-[14vw] shadow-light-side dark:bg-offblack dark:shadow-none"   >
            <div ref={btnRef} className='sticky top-0 bg-white shadow-light-nav py-3 px-6 flex items-center justify-between '>
                <button className={`rounded-md py-2 px-3 font-bold  flex text-md items-center justify-start gap-4 shadow-lg text-white`} style={{ background: "linear-gradient(130deg,#e91e63,#272a80)" }} onClick={() => { dispatch(newNote()) }}>Create Note</button>
                <MdGridView className='text-xl text-main hover:text-black cursor-pointer' onClick={() => { dispatch(setViewAllToggle(true)) }} />
            </div>
            <div className='sidebar-heads overflow-y-scroll pb-20' style={{ height: window.innerHeight - navbarHeight - btnRef.current?.getBoundingClientRect().height - 20 }}  >
                {heads.data.map((item, index) => {
                    return <SidebarBtn item={item} key={index} active={activeTitleId == item.id} />
                })}
                {heads.hasMore && (
                    <InView onChange={(inView, entry) => { if (inView) { setpage(v => v + 1) } }} >
                        <div className="flex justify-center items-center py-4">
                            <Dna color="#e91e63" height={50} width={50} />
                        </div>
                    </InView>
                )}

            </div>
        </div>
    )
}
const SidebarBtn = ({ item, active }) => {
    let dispatch = useDispatch()
    let { id, head } = item
    return (
        <button className={`w-full py-3 font-thin px-4 flex text-md items-center justify-start gap-4 bg-opacity-10 border-l-4 ${active ? "bg-myrtle  border-myrtle text-myrtle" : "border-white hover:bg-gray-100 dark:border-offblack"} dark:text-white`}
            onClick={() => { dispatch(setactiveTitleId(id)); dispatch(getNoteFields(id)) }}>
            <AiOutlineFile className='text-xl' /> {head.length > 20 ? head.slice(0, 20) + "..." : head}
        </button>
    )
}
export default Sidebar;