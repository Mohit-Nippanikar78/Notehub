import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDebounce, useOutsideClick } from '../elements/hooks'
import { deleteNote, updateNotehead, updateShorturl } from '../../features/notes'
import { FiRefreshCw } from 'react-icons/fi'
import { TbTableShortcut } from 'react-icons/tb'
const HomeNavbar = () => {
    let dispatch = useDispatch()
    let debounce = useDebounce();
    let deleteBtnRef = useRef(null)
    let { editor, doc } = useSelector(state => state.notes);
    const [delBtn, setDelBtn] = useState(false)
    const [title, setTitle] = useState("")
    useOutsideClick(deleteBtnRef, () => {
        setDelBtn(false)
    })
    useEffect(() => {
        setTitle(doc.head)
    }, []);
    useEffect(() => {
        debounce(() => dispatch(updateNotehead({ "id": doc.docId, "head": title })))
    }, [title]);
    return (
        <div className='z-30 sticky top-0 bg-white shadow-light-nav py-3 px-6 flex items-center justify-between '>
            <input className={` border-white border-b text-lg font-bold tracking-wider focus:outline-0 focus:border-black`} readOnly={!editor} value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <div className={`flex gap-4 items-center`}>
                {editor && (
                    <>
                        <NavbarUrlBox />
                        <div ref={deleteBtnRef} className="relative flex  items-center bg-navy cursor-pointer  rounded-md text-white hover:shadow-md" onClick={() => { delBtn && dispatch(deleteNote(doc.docId)); setDelBtn(v => !v); }}>
                            <div className={`${delBtn ? "max-w-full" : "max-w-0"} pl-2 overflow-hidden transition-all duration-500 `}>Confirm</div>
                            <div className={`${delBtn ? "px-2" : " delay-500 pr-2"} py-2 ml-auto`}><AiOutlineDelete className='text-xl' /></div>
                        </div>
                    </>
                )}
                <FiRefreshCw className={`animate-spin ${!doc.saving && "opacity-0"}`} />
            </div>
        </div>

    )
}
const NavbarUrlBox = () => {
    const [urlbox, setUrlbox] = useState(false)
    let { doc } = useSelector(state => state.notes);
    let urlboxRef = useRef(null)
    let urlInputRef = useRef(null);
    let dispatch = useDispatch()
    let debounce = useDebounce();
    useOutsideClick(urlboxRef, () => {
        setUrlbox(false)
    })

    return (
        <div ref={urlboxRef} className="relative">
            {urlbox &&
                <div className=" rounded-md shadow-md p-2 bg-white absolute right-0 top-12">
                    <div className="text-xs py-1 font-bold">
                        Enter URL to wish to
                    </div>
                    <div className="flex">
                        <div className="text-md border border-r-0 align-middle  py-1 pl-3">https://notenova.vercel.app/</div>
                        <input ref={urlInputRef} type="text" defaultValue={doc.shorturl.data} autoFocus={true} className='selection-none min-w-[300px] text-md border border-l-0 py-1 pr-3 focus:outline-0'
                            onChange={(e) => { debounce(() => { dispatch(updateShorturl({ id: doc.docId, shorturl: urlInputRef.current.value })) }) }} />
                    </div>
                    {!doc.shorturl.unique &&
                        <div className=" text-xs font-semibold  py-1 text-red-500">
                            Url already taken
                        </div>
                    }
                </div>
            }
            <TbTableShortcut className={`cursor-pointer text-xl`} onClick={() => { setUrlbox(v => !v) }} />
        </div>
    )
}
export default HomeNavbar