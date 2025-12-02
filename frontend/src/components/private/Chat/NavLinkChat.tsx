import { IoChatbubbles } from 'react-icons/io5';

import './NavLinkChats.css';
import { Link } from 'react-router';
const NavLinkChats = () => {
  return (
    <>
      <Link to={'/to/chats'}>
        <IoChatbubbles size={20} className='btn__chats cursor-pointer' />
      </Link>
    </>
  );
};

export default NavLinkChats;
