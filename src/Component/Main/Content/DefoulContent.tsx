import {Container, makeStyles} from "@material-ui/core"

import React from "react";
import errorPage from '../../../assets/404.png';

const useStyle = makeStyles((theme) => ({

    cardMedia:{
        textAlign: 'center'
    },
}))


export const DefaultContent = () => {

    const classes = useStyle()
    return <Container  className={classes.cardMedia}>
        <img src={errorPage} alt="spinner"/>


    </Container>
}