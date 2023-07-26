import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDebounce, useOutsideClick } from '../elements/hooks'
import Editdoc from './Editdoc'
import './styles.css'
import Poster from './Poster'
import Loading from '../elements/Loading'
import { deleteNote, updateNotehead } from '../../features/notes'
import { FiRefreshCw } from 'react-icons/fi'
const Editbox = () => {
  let { navbarHeight, activeTitleId, doc, heads } = useSelector(state => state.notes);
  if (doc.loading) {
    return <div className="col-span-5"><Loading text={`Fetching ${heads.data.find(item => item.id == activeTitleId).head}`} /></div>
  } else if (activeTitleId == 0) {
    return <Poster />
  } else {
    return (
      <div className='col-span-5 overflow-y-scroll editbox' style={{ height: window.innerHeight - navbarHeight }}>
        <EditboxNavbar />
        <Editdoc />
      </div>
    )
  }
}
const EditboxNavbar = () => {
  let dispatch = useDispatch()
  let debounce = useDebounce();
  let { heads, activeTitleId, editor, doc } = useSelector(state => state.notes);
  const [delBtn, setDelBtn] = useState(false)
  let deleteBtnRef = useRef()
  const [title, setTitle] = useState("")
  useOutsideClick(deleteBtnRef, () => {
    setDelBtn(false)
  })
  useEffect(() => {
    setTitle(heads.data.find(item => item.id == activeTitleId)?.head)
  }, [activeTitleId]);
  useEffect(() => {
    debounce(() => dispatch(updateNotehead({ "id": activeTitleId, "head": title })))
  }, [title])


  return (
    <div className='z-30 sticky top-0 bg-white shadow-light-nav py-3 px-6 flex items-center justify-between '>
      <input className={` border-white border-b text-lg font-bold tracking-wider focus:outline-0 focus:border-black`} readOnly={!editor} value={title} onChange={(e) => { setTitle(e.target.value) }} />
      <div className={`flex gap-4 items-center`}>
        <FiRefreshCw className={`animate-spin ${!doc.saving && "hidden"}`} />
        <div ref={deleteBtnRef} className="relative flex  items-center bg-navy cursor-pointer  rounded-md text-white hover:shadow-md" onClick={() => { delBtn && dispatch(deleteNote(activeTitleId)); setDelBtn(v => !v); }}>
          <div className={`${delBtn ? "max-w-full" : "max-w-0"} pl-2 overflow-hidden transition-all duration-500 `}>Confirm</div>
          <div className={`${delBtn ? "px-2" : " delay-500 pr-2"} py-2 ml-auto`}><AiOutlineDelete className='text-xl' /></div>
        </div>
      </div>
    </div>

  )
}

export default Editbox