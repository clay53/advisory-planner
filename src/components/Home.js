import React, { Component } from 'react'

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        document.title = "Advisory Planner - Home";
    }

    render () {
        return (
            <div className="centered">
                <h1 style={{fontSize: "48px"}}>Home</h1>
                <hr/>
                <p style={{width: "60%", margin: "auto"}}>
                    yee
                </p>
            </div>
        );
    }
}