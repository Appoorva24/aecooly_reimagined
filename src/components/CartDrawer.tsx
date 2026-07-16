import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      <div 
        className={`${styles.cartOverlay} ${isCartOpen ? styles.active : ''}`} 
        onClick={toggleCart} 
      />
      
      <div className={`${styles.cartDrawer} ${isCartOpen ? styles.active : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Your Cart <span className={styles.cartCount}>({cart.reduce((a, b) => a + b.quantity, 0)})</span></h2>
          <button className={styles.closeCart} onClick={toggleCart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <div className={styles.cartEmpty}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <p>Your cart is empty</p>
              <button className={styles.continueBtn} onClick={toggleCart}>Continue Shopping</button>
            </div>
          ) : (
            <div className={styles.cartList}>
              {cart.map((item, i) => (
                <div key={`${item.id}-${item.selectedVariant.id}`} className={styles.cartItem} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className={styles.cartItemImgWrap}>
                    <img 
                      src={item.images[0]?.src || item.selectedVariant.featured_image?.src} 
                      alt={item.title} 
                      className={styles.cartItemImg} 
                    />
                  </div>
                  <div className={styles.cartItemDetails}>
                    <div className={styles.cartItemTopRow}>
                      <h4 className={styles.cartItemTitle}>{item.title}</h4>
                      <button 
                        className={styles.removeItem} 
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    {item.options.length > 0 && item.selectedVariant.title !== 'Default Title' && (
                       <div className={styles.cartItemVariant}>Color: {item.selectedVariant.title}</div>
                    )}
                    <div className={styles.cartItemBottomRow}>
                      <div className={styles.cartItemQty}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className={styles.cartItemPrice}>${parseFloat(item.selectedVariant.price).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartSubtotal}>
              <span>Subtotal</span>
              <span className={styles.totalPrice}>${cartTotal.toFixed(2)}</span>
            </div>
            <p className={styles.cartTaxes}>Taxes and shipping calculated at checkout.</p>
            <button className={styles.checkoutBtn}>
              Checkout • ${cartTotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
