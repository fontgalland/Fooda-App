import { Modal } from '../UI/Modal/Modal'
import classes from './Cart.module.css'
import { Fragment, useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import CartItem from './CartItem'
import Checkout from './Checkout/Checkout';
import { useState } from 'react';

export const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext)
    const totalAmount = `R$ ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://react-food-app-355cc-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        console.log(response);
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => {
                return <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)} />
            })}
        </ul>
    )

    const modalActions = (
        <div className={classes.actions}>
            <button onClick={props.onCloseCart} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
            {!isCheckout && modalActions}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending order...</p>

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent your order!</p>
            <div className={classes.actions}>
                <button onClick={props.onCloseCart} className={classes.button}>Close</button>
            </div>
        </Fragment>
    )

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}