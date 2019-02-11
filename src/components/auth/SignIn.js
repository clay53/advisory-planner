import React, { Component } from 'react'
import { Firebase as firebase } from '../../api'
var provider = new firebase.auth.GoogleAuthProvider();

export default class SignIn extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: true,
			authError: ""
		}

		this.signInWithGoogle = this.signInWithGoogle.bind(this);
	}

	componentDidMount () {
		document.title = "Clayton Does Things - Sign In"
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is logged in");
                this.setState({
                    loading: false
                });
            }
		});
	}

	signInWithGoogle (event) {
		firebase.auth().signInWithPopup(provider).then((result) => {
		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
			console.log(errorCode);
			console.log(errorMessage);
			console.log(email);
			console.log(credential);
			this.setState({
				authError: errorMessage
			});
		});
	}

	render () {
		if (this.state.loading) {
			return (
				<div>
					<h1>Sign In</h1>
					<button onClick={this.signInWithGoogle}>Sign In With Google</button>
					<br/>
					<span>{this.state.authError}</span>
				</div>
			);
		} else {
			return (
				<Redirect url="/"/>
			);
		}
	}
}

class Redirect extends Component {
	constructor (props) {
		super(props);
		this.state = {
			url: this.props.url
		}
	}

	componentDidMount () {
		console.log(this.state.url);
		window.location.replace(this.state.url);
	}

	render () {
		return (
			<span>Redirecting...</span>
		)
	}
}