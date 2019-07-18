import React from 'react';

import './sign-in.styles.scss';
import { FormInput } from '../form-input/form-input.component';
import { CustomButton } from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit = async (ev) => {
		ev.preventDefault();

		const { email, password } = this.state;

		try{

			await auth.signInWithEmailAndPassword(email, password);

			this.setState({
				email: '',
				password: ''
			})
			
		} catch (err) {
			console.log('Login fail' + err);
		}

	}

	handleChange = (ev) => {
		const { value, name } = ev.target;

		this.setState({ [name]: value });
	}

	render() {
		return (
			<div className='sign-in'>
				<h2>I allready have an account</h2>
				<span>Sign in with you email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						type="email"
						name='email'
						value={this.state.email}
						handleChange={this.handleChange}
						required
						label='email'
					/>
					
					<FormInput
						type="password"
						name='password'
						value={this.state.password}
						handleChange={this.handleChange}
						required
						label='password'
					/>
					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>{' '}Sign In with Google{' '}</CustomButton>
					</div>
				</form>
			</div>
			
		)
	}
}

export default SignIn;