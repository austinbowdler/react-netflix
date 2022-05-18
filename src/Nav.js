import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener('scroll', () => { });
        }
    }, []);

    return (
        <div className={`nav ${show && 'navBlack'}`} >
            <img className='navLogo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' alt='Netflix Logo' />
            <img className='navAvatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Netflix Avatar' />
        </div >

    )
}

export default Nav