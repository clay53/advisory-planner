import React, { Component } from 'react'
import styles from '../index.css'
import { Router, Route, Link } from 'react-router-dom';
import { Firebase as firebase } from '../api'
import Home from './Home'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'
import CreateUserDB from './auth/CreateUserDB'
import config from '../config'

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentUser: null,
            displayName: "",
            loading: true
        }
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
                    this.setState({
                        displayName: doc.data().displayName
                    });
                });
            }
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
                </ul>
                {!this.state.loading ?
                    <div>
                        <Route path="/" exact component={Home}/>
                    </div> :
                    <div>
                        <span>Loading...</span>
                    </div>
                }
            </div>
        )
    }
}