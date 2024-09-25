import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fto-do-list_6194029&psig=AOvVaw1F7Dqs5DYE9BdDXtHvQlhR&ust=1727327373030000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCylIWq3YgDFQAAAAAdAAAAABAE"
              alt="website logo"
            />
          </Link>

          <ul className="nav-bar-mobile-icons-container">
            <li>
              <Link to="/">
                <AiFillHome className="nav-item-mobile-link nav-link" />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsFillBriefcaseFill className="nav-item-mobile-link nav-link" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-mobile-btn nav-link"
                onClick={onClickLogout}
              >
                <FiLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2alyj13UOpV5gihvNxxR0XZ57aFRAtzz4_Q&s"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                TODO LIST
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
