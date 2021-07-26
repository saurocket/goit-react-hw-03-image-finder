import {Card,Grid, makeStyles} from "@material-ui/core"
import React from "react";
import {ImagesType} from "../../../Contecst/TypesContecst";
import {SRLWrapper} from "simple-react-lightbox";
import {options} from "../../../assets/options";
import styles from './ContentWithProps.module.css'


const useStyle = makeStyles(() => ({
    card: {
        width: '280px',
        height: '160px',
        animation: 'showImage 1s forwards ',
    },
    cardMedia: {
        paddingTop: "56.25%",

    },
    wrapperGrid: {
        animation: 'showImage 1s forwards ',
    }
}))



type  propsType = {
    img: Array<ImagesType>

}


export const ContentWithProps: React.FC<propsType> = ({img}) => {


    const classes = useStyle()
    return (
        <SRLWrapper options={options}>
            <Grid className={classes.wrapperGrid} container spacing={4}>
                {img.map(card => <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <a className={styles.link} href={card.largeImageURL}>
                            <img
                                className={styles.wrapper}
                                src={card.previewURL}
                                alt={card.tags}/>
                        </a>
                    </Card>
                </Grid>)}
            </Grid>
        </SRLWrapper>
    )
}