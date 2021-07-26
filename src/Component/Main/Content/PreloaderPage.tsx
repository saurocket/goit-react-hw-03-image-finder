import {Container, makeStyles} from "@material-ui/core"

import React from "react";
import spiner from '../../../assets/spiner.svg';

const useStyle = makeStyles((theme) => ({

    cardMedia:{
        textAlign: 'center'
    },
}))


export const PreloaderPage = () => {

    const classes = useStyle()
    return <Container  className={classes.cardMedia}>
        <img src={spiner} alt="spinner"/>


    </Container>
}