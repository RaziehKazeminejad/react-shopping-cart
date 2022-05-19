import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import { useCart } from '../../Providers/CartProvider';
import DarkMode from '../DarkMode/DarkMode';
import './Navigation.css';

export default function Navigation() {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <div className="nav">
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? 'activeLink' : '')}
        >
          Home
        </NavLink>
      </div>
      <div className="cartLink nav">
        <NavLink
          to="/cart"
          className={(navData) => (navData.isActive ? 'activeLink' : '')}
        >
          Cart
        </NavLink>
        <span>{cart.length}</span>
        <NavLink
          to={userData ? '/profile' : '/login'}
          className={(navData) => (navData.isActive ? 'activeLink' : '')}
        >
          {userData ? (
            <p style={{ fontSize: '14px' }}>Profile</p>
          ) : (
            <p style={{ fontSize: '14px' }}>Login / Sign Up</p>
          )}
        </NavLink>
        <DarkMode />
      </div>
    </header>
  );
}
