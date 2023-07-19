import React, { useRef } from 'react'
import { AiOutlineFile } from 'react-icons/ai';
import { LuCross } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTitle, setViewAllToggle } from '../../features/notes';
import { useOutsideClick } from '../elements/hooks';

const ViewAll = () => {
    let dispatch = useDispatch()
    let viewallRef = useRef(null);
    let { titles, viewallToggle } = useSelector(state => state.notes)
    return (
        <div ref={viewallRef} className={`z-50 fixed bg-gray-100 w-2/3 mt-1 ${viewallToggle ? "left-0" : "-left-full"} transition-all duration-1000 ease-in-out shadow-light-side h-full overflow-hidden`}>
            <div className="flex flex-wrap relative">
                <div className="absolute top-4 rotate-45 right-4">
                    <LuCross className='text-3xl [stroke-width:1.5px] cursor-pointer' onClick={() => { dispatch(setViewAllToggle(false)) }} />
                </div>
                {titles.map((item, index) => {
                    return (
                        <button key={index} className={`transition-all duration-300 py-3 border h-max font-thin rounded-lg m-3 px-4 flex text-md items-center justify-start gap-4 bg-white dark:border-offblack dark:text-white hover:bg-navy hover:bg-opacity-20 hover:text-navy hover:border-navy hover:border-opacity-20 hover:shadow-md`}
                            onClick={() => {
                                dispatch(setActiveTitle(item.id))
                                dispatch(setViewAllToggle(false))
                            }}>
                            <AiOutlineFile className='text-xl' /> {item.title}
                        </button>
                    )
                })}
            </div>
        </div >
    )
}

export default ViewAll;