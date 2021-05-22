import React, { Component } from 'react'
import Header from '../../components/User/Header'
import Footer from '../../components/User/Footer'

export default class LoginLayout extends Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}