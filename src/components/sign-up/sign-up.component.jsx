import React from 'react';
import './sign-up.component';

import { FormInput } from '../../components/form-input/form-input.component';
import { CustomButton } from '../../components/custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component{
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword:''
		}
	}

	handleSubmit = async (ev) => {
		ev.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			alert('Password does not match');
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await createUserProfileDocument(user, { displayName });

			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			})	
		} catch (err) {
			console.log('Auth error' + err)
		}
	}

	handleChange = (ev) => {
		const { value, name } = ev.target;

		this.setState({ [name]: value });
	}
	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className='sign-up'>
				<h2 className='title'>I do not have an account</h2>
				<span>Sign up with email and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						type="text"
						name='displayName'
						value={displayName}
						handleChange={this.handleChange}
						required
						label='Display Name'
					/>
					<FormInput
						type="email"
						name='email'
						value={email}
						handleChange={this.handleChange}
						required
						label='Email'
					/>
					<FormInput
						type="password"
						name='password'
						value={password}
						handleChange={this.handleChange}
						required
						label='Password'
					/>
					<FormInput
						type="password"
						name='confirmPassword'
						value={confirmPassword}
						handleChange={this.handleChange}
						required
						label='Confirm Password'
					/>
					<CustomButton type='submit'>Sign Up</CustomButton>
				</form>
			</div>
		)
	}
}
export default SignUp;