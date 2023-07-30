import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { copy, useDebounce, useOutsideClick } from '../../elements/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { changeText, deleteField, updateField } from '../../../features/notes'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, nightOwl, nnfx } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const Codebox = ({ item }) => {
    let { id, con, title } = item;
    let dispatch = useDispatch()
    let debounce = useDebounce()
    let codeDropRef = useRef()
    let codeConRef = useRef()
    let textareaRef = useRef()
    let titleRef = useRef()
    let { doc, editor } = useSelector(state => state.notes)
    const [drop, setDrop] = useState(false);
    useOutsideClick(codeDropRef, () => {
        setDrop(false)
    })
    useEffect(() => {
        debounce(() => dispatch(updateField(
            { noteId: doc.docId, boxId: id, type: "codebox", text: textareaRef.current.value, ele: "con" }
        )))
    }, [con])
    useEffect(() => {
        debounce(() => dispatch(updateField(
            { noteId: doc.docId, boxId: id, type: "codebox", text: titleRef.current.value, ele: "title" }
        )))
    }, [title])
    return (
        <div className=" border rounded-md overflow-hidden">
            <div className="bg-offwhite px-4 py-2 flex justify-between items-center">
                <input readOnly={!editor} ref={titleRef} type="text" value={title == "Untitled" ? `Untitled ${id}` : title} className='bg-transparent focus:outline-0 w-full' onChange={(e) => { dispatch(changeText({ id, type: "title", text: e.target.value })) }} />
                <div className="py-0 flex gap-4">
                    <button type="button" className="inline-flex  justify-center  rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => { copy(con); }} >
                        <AiOutlineCopy className='text-xl' />
                    </button>
                    {editor && <div className="relative" ref={codeDropRef}>
                        <button type="button" className="inline-flex  w-full justify-center  rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => { setDrop(v => !v) }}  >
                            <BsThreeDotsVertical className='text-xl text-icon-grey cursor-pointer hover:text-black' />
                        </button>
                        <div className={`${drop ? "block" : "hidden"} absolute  py-1 right-0 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} >
                            <button className='text-gray-700 block px-4 py-2 text-sm hover:text-black w-full text-left' onClick={() => { dispatch(deleteField({ noteId: doc.docId, type: "codebox", boxId: id })) }}>Delete</button>
                        </div>
                    </div>}
                </div>
            </div>
            <div className={`${editor ? "p-2" : "p-0"}`} ref={codeConRef}>
                {editor ?
                    <textarea key={editor} value={con} spellCheck={false} ref={textareaRef} className='h-max w-full outline-0 [resize:none]' style={{ height: textareaRef.current?.scrollHeight }} type="text" onChange={(e) => { dispatch(changeText({ id, type: "con", text: e.target.value })) }} />
                    :
                    <SyntaxHighlighter language="javascript" style={nightOwl}>
                        {con}
                    </SyntaxHighlighter>
                }
            </div>
        </div>
    )
}
export default Codebox;