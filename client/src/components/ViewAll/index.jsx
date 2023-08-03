import React, { useEffect, useState } from 'react'
import { AiOutlineFile } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { getNoteFields, setactiveTitleId, setViewAllToggle } from '../../features/notes';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../elements/hooks';
import axios from 'axios';

const ViewAll = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [heads, setHeads] = useState([]);
    useEffect(() => {
        axios.get(`${serverUrl}/notes/heads?page=${page}&type=viewall`).then(res => {
            setHeads(res.data.data);
        })
    }, [page])

    return (
        <div className={`col-span-5 z-50 bg-gray-100 w-full`}>
            <div className="flex flex-wrap w-full">
                {heads.map((item, index) => {
                    return (
                        <button key={index} className={`transition-all duration-300 py-3 border h-max font-thin rounded-lg m-3 px-4 flex text-md items-center justify-start gap-4 bg-white dark:border-offblack dark:text-white hover:bg-navy hover:bg-opacity-20 hover:text-navy hover:border-navy hover:border-opacity-20 hover:shadow-md`}
                            onClick={() => {
                                navigate(`/${item.shorturl}`)
                            }}>
                            <AiOutlineFile className='text-xl' /> {item.head}
                        </button>
                    )
                })}
            </div>
        </div >
    )
}

export default ViewAll;