import React, { useEffect, useRef } from 'react'
import { changeText, updateField } from '../../../features/notes';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../elements/hooks';

const Textbox = ({ item }) => {
    let { id, con } = item;
    let { activeTitleId, editor } = useSelector(state => state.notes)
    let textareaRef = useRef();
    let dispatch = useDispatch()
    let debounce = useDebounce()
    return (
        <textarea readOnly={!editor} spellCheck={false} ref={textareaRef} className='h-max outline-0 [resize:none]' style={{ height: textareaRef.current?.scrollHeight }} type="text" defaultValue={con}
            onChange={(e) => {
                debounce(() => dispatch(updateField(
                    { noteId: activeTitleId, boxId: id, type: "textbox", text: e.target.value, ele: "con" }
                )))
            }} />
    )
}

export default Textbox