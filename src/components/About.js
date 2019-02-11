import React, { Component } from 'react'

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        document.title = "Advisory Planner - About";
    }

    render () {
        return (
            <div className="centered">
                <h1 style={{fontSize: "48px"}}>About</h1>
                <hr/>
                <p style={{width: "60%", margin: "auto"}}>
                    Programmed by <a href="https://github.com/clay53">Clayton Does Things</a> of <a href="https://claytondoesthings.xyz/">Clayton Does Things</a>
                </p>
            </div>
        );
    }
}