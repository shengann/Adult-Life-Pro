import { FiAlignLeft } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { IoMdExit } from "react-icons/io";
import Section from '../styles/Header';

const Header = ({ handleShowSidebar }) => {
  return (
    <Section>
      <div className="d-flex justify-content-between">
        <button 
          className="sidebar-button border-0 align-self-center"
          onClick={handleShowSidebar}
        >
          <FiAlignLeft />
        </button>
        <div className='align-self-center'>
          <span className='profile-pic me-1'><RxAvatar /></span><span className='name me-2'>Sheng Ann Wong</span><span><button className='border-0 exit-icon me-3'><IoMdExit /></button></span>
        </div>

      </div>
    </Section>
  )
}
export default Header