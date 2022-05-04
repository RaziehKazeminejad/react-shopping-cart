import { NavLink } from 'react-router-dom';
import { useCart } from '../../Providers/CartProvider';
import './Navigation.css';

export default function Navigation() {
  const {cart}= useCart()
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={(navData) => navData.isActive ? "activeLink" : "" }>
              Home
            </NavLink>
          </li>
          <li className='cartLink'>
            <NavLink to="/cart" className={(navData) => navData.isActive ? "activeLink" : "" }>Cart</NavLink>
            <span>{cart.length}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
