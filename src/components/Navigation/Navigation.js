import { NavLink } from 'react-router-dom';
import { useCart } from '../../Providers/CartProvider';
import './Navigation.css';

export default function Navigation() {
  const {cart}= useCart()
  return (
    <header className="mainNavigation">

          <div className='nav'>
            <NavLink to="/" className={(navData) => navData.isActive ? "activeLink" : "" }>
              خانه
            </NavLink>
          </div>
          <div className='cartLink nav'>
            <NavLink to="/cart" className={(navData) => navData.isActive ? "activeLink" : "" }>سبد خرید</NavLink>
            <span>{cart.length}</span>
          </div>
    </header>
  );
}
