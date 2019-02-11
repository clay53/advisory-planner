import React, { Component } from 'react'
import styles from '../index.css'
import { Router, Route, Link } from 'react-router-dom';
import { Firebase as firebase } from '../api'
import Home from './Home'
import About from './About'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'
import CreateUserDB from './auth/CreateUserDB'
import config from '../config'
var provider = new firebase.auth.GoogleAuthProvider();

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentUser: null,
            displayName: "",
            authError: "",
            loading: true
        }

        this.signInWithGoogle = this.signInWithGoogle.bind(this);
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in");
                //console.log(user);
                CreateUserDB(user);
                this.setState({
                    currentUser: user
                });
                firebase.firestore().collection("users").doc(user.uid).onSnapshot((doc) => {
                    if (doc.exists) {
                        this.setState({
                            displayName: doc.data().displayName
                        });
                    }
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
        return (
            <div>
                <ul id="navbar">
                    <li><Link className="clickable" to="/">Home</Link></li>
                    <li><Link className="clickable" to="/about">About</Link></li>
                    <li>{this.state.currentUser != null ? <Link className="clickable" to="/signOut">Sign Out</Link> : <Link className="clickable" to="/signIn">Sign In</Link>}</li>
                    <li>{this.state.currentUser != null ? <Link className="clickable" to="/profile">Signed In as: {this.state.displayName}</Link> : null}</li>
                    <li>{this.state.authError}</li>
                </ul>
                <div>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/signIn" exact component={SignIn}/>
                    <Route path="/signOut" exact component={SignOut}/>
                </div>
            </div>
        )
    }
}