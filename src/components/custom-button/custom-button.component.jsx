import React from 'react';

import './custom-button.styles.scss';

export const CustomButton = ({ children,isGoogleSignIn,inverted, ...otherProps}) => (
	<button {...otherProps} className={`custom-button ${isGoogleSignIn ? 'google-sign-in' : ''} ${inverted ? 'inverted' : ''}`}>
		{children}
	</button>
)