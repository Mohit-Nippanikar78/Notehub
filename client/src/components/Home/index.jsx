import './styles.css'
import Poster from './Poster'
import Loading from '../elements/Loading'
import { useSelector } from 'react-redux'
import ViewAll from '../ViewAll'
import Editor from './Editor/Editor'
const Editbox = () => {
  let { activeTitleId, doc, heads, viewallToggle } = useSelector(state => state.notes);
  if (doc.loading) {
    return <div className="col-span-5"><Loading text={`Fetching ${heads.data.find(item => item.id == activeTitleId).head}`} /></div>
  } else if (viewallToggle) {
    return <ViewAll />
  } else if (activeTitleId == 0) {
    return <Poster />
  } else {
    return <Editor key={doc.docId} />
  }
}


export default Editbox