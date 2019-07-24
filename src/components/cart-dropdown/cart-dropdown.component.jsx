import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.action'; 

import { connect } from 'react-redux';

const CartDropDown = ({ cartItems, history, dispatch }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'/>
		{
			cartItems.length ? 
				(cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />))
				:
				(<span className='empty-message'>Your cart is empty</span>)
		}
		
		<CustomButton className='custom-button inverted' onClick={() => {
			history.push('/checkout')
			dispatch(toggleCartHidden())
		}}>GO TO CHECKOUT</CustomButton>
		
		
	</div>
)

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropDown));