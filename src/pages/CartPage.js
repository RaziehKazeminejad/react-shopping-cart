import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useCart, useCartActions } from '../Providers/CartProvider';

export default function CartPage() {
  const { cart, total } = useCart();
  const dispatch = useCartActions();
  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>سبد خرید شما خالی است!</h2>
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
                    <img src={item.image} alt={item.name}></img>
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity}</div>
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
      <h2 style={{ marginBottom: '30px' }}>سفارش شما</h2>
      <div className="summeryItem">
        <p>قیمت کالا ها</p>
        <p> {originalTotalPrice} تومان</p>
      </div>
      <div className="summeryItem">
        <p>تخفیف</p>
        <p>{originalTotalPrice - total} تومان</p>
      </div>
      <div className="summeryItem">
        <p>مبلغ کل</p>
        <p> {total} تومان</p>
      </div>

      <div className="summeryItem net">
        <p>مبلغ قابل پرداخت</p>
        <p> {total} تومان</p>
      </div>
      <Link to="/checkout">
        <button
          className="btn"
          style={{ marginTop: '25px', width: '100%' }}
        >
          Go to checkout
        </button>
      </Link>
    </section>
  );
};
