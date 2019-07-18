import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyAPG4UzB8G5Ovam8ronjEdde9GeaiGqV2I",
	authDomain: "crwn-db-a2814.firebaseapp.com",
	databaseURL: "https://crwn-db-a2814.firebaseio.com",
	projectId: "crwn-db-a2814",
	storageBucket: "",
	messagingSenderId: "1085110107153",
	appId: "1:1085110107153:web:2307e936a51d653d"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`)
	const snapShot = await userRef.get();
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (err) {
			console.log('error creating user', err.message)
		}
	}
	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
