import React from 'react';
import './header.styles.scss';
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/original.svg'
import {auth} from '../../firebase/firebase.utils'

const Header = ({currentUser}) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>Shop</Link>
            <Link className='option' to='/shop'>Contact</Link>
            {
                currentUser ?
                <div className='option' onClick={()=>auth.signOut()}>Sign out</div>
                :
                <link className='option' to='/signin'></link>
            }
        </div>
    </div>
)
export default Header