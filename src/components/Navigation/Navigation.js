import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={(navData) => navData.isActive ? "activeLink" : "" }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={(navData) => navData.isActive ? "activeLink" : "" }>Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
