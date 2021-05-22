import React from 'react'
//import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../components/User/Header'
import Footer from '../../components/User/Footer'
// Material-UI


export default function UserLayout(props) {
    return (
        <React.Fragment>
            <Header/>
             {props.children}
            <Footer />
        </React.Fragment>
    )

}