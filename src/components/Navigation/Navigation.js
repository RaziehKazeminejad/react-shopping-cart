import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import { useCart } from '../../Providers/CartProvider';
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
          خانه
        </NavLink>
      </div>
      <div className="cartLink nav">
        <NavLink
          to="/cart"
          className={(navData) => (navData.isActive ? 'activeLink' : '')}
        >
          سبد خرید
        </NavLink>
        <span>{cart.length}</span>
        <NavLink
          to={userData ? '/profile' : '/login'}
          className={(navData) => (navData.isActive ? 'activeLink' : '')}
        >
          {userData ? (
            <p style={{ fontSize: '14px' }}>پروفایل</p>
          ) : (
            <p style={{ fontSize: '14px' }}>ورود / ثبت نام</p>
          )}
        </NavLink>
      </div>
    </header>
  );
}
