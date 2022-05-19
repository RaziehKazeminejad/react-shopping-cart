import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useCart, useCartActions } from '../Providers/CartProvider';

export default function CartPage() {
  const { cart, total } = useCart();
  const dispatch = useCartActions();
  if (!cart.length)
    return (
      <Layout>
        <main className="container">
          <h2>Cart is empty!</h2>
        </main>
      </Layout>
    );

  const incHandler = (cartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };
  const decHandler = (cartItem) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: cartItem });
  };
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem" key={item.id}>
                  <div className="itemImg">
                    <img src={item.thumbnail} alt={item.title}></img>
                  </div>
                  <div>{item.title}</div>
                  <div>{item.price * item.quantity} $</div>
                  <div>{item.discountPercentage * item.quantity} $</div>
                  <div className="btnGroup">
                    <button onClick={() => decHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummery cart={cart} total={total} />
        </section>
      </main>
    </Layout>
  );
}

const CartSummery = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;

  return (
    <section className="cartSummery">
      <h2 style={{ marginBottom: '30px' }}>Order Summary</h2>
      <div className="summeryItem">
        <p>Order Total</p>
        <p> {originalTotalPrice} $</p>
      </div>
      <div className="summeryItem">
        <p>Discount</p>
        <p>{total} $</p>
      </div>
      <div className="summeryItem">
        <p>SubTotlal</p>
        <p> {originalTotalPrice - total} $</p>
      </div>

      <div className="summeryItem net">
        <p>Total</p>
        <p> {originalTotalPrice - total} $</p>
      </div>
      <Link to="/signup?redirect=/checkout">
        <button className="btn" style={{ marginTop: '25px', width: '100%' }}>
          Go to checkout
        </button>
      </Link>
    </section>
  );
};
