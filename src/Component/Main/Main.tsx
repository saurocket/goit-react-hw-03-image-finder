import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core/";
import {Button} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core";
import {useData} from "../../Contecst/DataContecst";
import {DefaultContent} from "./Content/DefoulContent";
import {ContentWithProps} from "./Content/ContentWithProps";
import {ImagesType} from "../../Contecst/TypesContecst";
import {useHttp} from "../../hook/useHttp";
import {useAlert} from "../../hook/useAlert";
import * as Scroll from 'react-scroll';
import {Element} from 'react-scroll'
import {PreloaderPage} from "./Content/PreloaderPage";




const useStyle = makeStyles((theme) => ({
    mainContent: {
        paddingTop: theme.spacing(10)
    },
    cardGrid: {
        marginTop: theme.spacing(4),
        textAlign: 'center'
    },
    button: {
        marginTop: theme.spacing(2)
    }

}))

export const TableSection = () => {
    const {request, error, loading, clearError} = useHttp() //наш запрос
    const {SweetAlert} = useAlert() //всплывашка для ошибок
    const {state, actions, dispatch}: any = useData() // контект

    const [showBtn, setShowBtn] = useState(false)
    const [imgS, setImgS] = useState<[] | Array<ImagesType>>([]) //сюда будем подгружать картинки из контекста
    const [page, setPage] = useState<number>(1) // тут будем хранить конкренную страницу


    //Показывает или прячем кнопку
    useEffect(() => {

        if (state.total > page * 12) {
            setShowBtn(true)
        } else {
            setShowBtn(false)
        }
    }, [state.total, page])


    useEffect(() => {
        // @ts-ignore
        setImgS(state.images.filter((item, index, array) => {
            // @ts-ignore
            return index === array.findIndex(a => a.id === item.id)
        }))
        // Фильтруем массив полученных элементов на повторения. Так как при запросе бывает, что картинки повторяются, а key
        // привязан к id картинки и реакт ругается
        // куча игноров, так как до конца не разобрался с типизацией контекста
    }, [state.images])
// EseEffectoм привязались к обновлению стейта, что б при каждом чихе у нас был актуальный массив картинок

    // При клике диспатчим страницу в стейт
    const onChangePage = () => {
        dispatch(actions.setCurrentPage(page + 1))
        Scroll.scroller.scrollTo('scrollBtn', {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: 50,
        })
    }
    //Подписавшись на обновления конкретной страницы в стейте обновляем наш локальный стейт
    useEffect(() => {
        setPage(state.currentPage)
    }, [state.currentPage])


    //Подписавшись на обновление локального стейта (кокда страница будет изменена) будем делать запрос на сервер за новой порцией картинок
    useEffect(() => {
        const addImage = async () => {
            try {
                const images = await request(state.searchValue, page)
                dispatch(actions.setImage({images: images.hits, total: images.total}))
            } catch (e) {
                throw e
            }
        }
        addImage()
    }, [page])

    SweetAlert(error, clearError) // Опять же, если есть ошибки информируем.


    const classes = useStyle();

    return (
        <div className={classes.mainContent}>
            <Container className={classes.cardGrid} maxWidth="md">

                {imgS.length > 0 ?
                        <ContentWithProps img={imgS}/>
                    :
                    loading ?
                        <PreloaderPage/> :
                        <DefaultContent/>

                }
                {showBtn &&
                <Element name='scrollBtn'>
                    <Button
                        disabled={loading}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={onChangePage}
                    >
                        load more
                    </Button>
                </Element>
                }
            </Container>
        </div>
    )
}