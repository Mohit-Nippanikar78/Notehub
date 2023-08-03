import React from 'react'
import Codebox from './Codebox'
import Textbox from './Textbox'
import { BiSolidRightArrow } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { newField } from '../../../features/notes'
import HomeNavbar from './HomeNavbar'
const Editor = () => {
    let { doc, editor, navbarHeight } = useSelector(s => s.notes)
    return (
        <div className='col-span-5 overflow-y-scroll editbox' style={{ height: window.innerHeight - navbarHeight }}>
            <HomeNavbar />
            <div className="bg-offwhite text-black p-4 ">
                <div className="bg-white  rounded-md shadow-xl p-4 flex flex-col gap-6 pb-32">
                    {doc.data.map((item, i) => {
                        if (item.type == "codebox") {
                            return <Codebox item={item} key={i} />
                        } else if (item.type == "textbox") {
                            return <Textbox item={item} key={i} />
                        }
                    })}
                    {editor &&
                        <EditdocAdd />
                    }
                </div>
            </div>
        </div>
    )
}
const EditdocAdd = () => {
    let dispatch = useDispatch()
    let { doc } = useSelector(s => s.notes)
    return (
        <div className='flex items-center gap-4'>
            <BiSolidRightArrow className="text-md" />
            <button className={` rounded-md py-2 px-3 font-bold  flex text-md items-center justify-start gap-4 shadow-lg text-white`} style={{ background: "linear-gradient(130deg,#276880,#60c689)" }}
                onClick={() => { dispatch(newField({ noteId: doc.docId, type: "textbox" })) }}
            >Add Textbox</button>
            <button className={` rounded-md py-2 px-3 font-bold  flex text-md items-center justify-start gap-4 shadow-lg text-white`} style={{ background: "linear-gradient(130deg,#572780,#276880)" }}
                onClick={() => { dispatch(newField({ noteId: doc.docId, type: "codebox" })) }}
            >Add Codebox</button>
        </div>
    )
}


export default Editor;