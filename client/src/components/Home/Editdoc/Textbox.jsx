import React, { useEffect, useRef } from 'react'
import { changeText, updateField } from '../../../features/notes';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../elements/hooks';

const Textbox = ({ item }) => {
    let { id, con } = item;
    let { activeTitleId } = useSelector(state => state.notes)
    let textareaRef = useRef();
    let dispatch = useDispatch()
    let debounce = useDebounce()
    useEffect(() => {
        debounce(() => dispatch(updateField(
            { noteId: activeTitleId, boxId: id, type: "textbox", text: textareaRef.current.value, ele: "con" }
        )))
    }, [con])
    return (
        <textarea spellCheck={false} ref={textareaRef} className='h-max outline-0 [resize:none]' style={{ height: textareaRef.current?.scrollHeight }} type="text" defaultValue={con} onChange={(e) => { dispatch(changeText({ id, type: "con", text: e.target.value })) }} />
    )
}

export default Textbox