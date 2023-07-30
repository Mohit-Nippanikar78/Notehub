
import Editdoc from './Editdoc/Editdoc'
import './styles.css'
import Poster from './Poster'
import Loading from '../elements/Loading'
import HomeNavbar from './HomeNavbar'
import { useSelector } from 'react-redux'
import ViewAll from '../ViewAll'
const Editbox = () => {
  let { navbarHeight, activeTitleId, doc, heads, viewallToggle } = useSelector(state => state.notes);
  if (doc.loading) {
    return <div className="col-span-5"><Loading text={`Fetching ${heads.data.find(item => item.id == activeTitleId).head}`} /></div>
  } else if (viewallToggle) {
    return <ViewAll />
  } else if (activeTitleId == 0) {
    return <Poster />
  } else {
    return (
      <div className='col-span-5 overflow-y-scroll editbox' style={{ height: window.innerHeight - navbarHeight }}>
        <HomeNavbar />
        <Editdoc />
      </div>
    )
  }
}


export default Editbox