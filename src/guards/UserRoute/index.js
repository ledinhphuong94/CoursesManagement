import React from 'react';
import {useSelector} from 'react-redux'
import { Route,Redirect} from "react-router-dom";

export default function UserRoute(props) {
    const {currentUser} = useSelector((state)=>state.loginReducer)
    const {component:Component, ...routerProps} = props;

    return <Route {...routerProps} render={(props)=>{
        if(currentUser){
            return <Component {...props}/>
        }
        return <Redirect to="/login"/>
    }

    }
    />
}
