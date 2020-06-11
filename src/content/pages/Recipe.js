import React from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../../actions'



const Recipe = props => {

    if (!props.user) {
        return <Redirect to="/" />
    }
    return (
        <div>RECIPE Stub
            
        </div>
    )
}

export default Recipe