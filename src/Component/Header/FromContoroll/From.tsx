import React, {ChangeEvent, FormEvent, useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {useHttp} from "../../../hook/useHttp";
import {Preloader} from "../Preloader/Preloader";
import {useData} from "../../../Contecst/DataContecst";
import {useAlert} from "../../../hook/useAlert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            position: 'relative'
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

export const SearchPanel = () => {
    const classes = useStyles();

    const {SweetAlert} = useAlert() //Кастомный хук который будет выводить нам ошибки при запросе на сервер
    const {actions, dispatch, state}:any = useData(); //Наш контект с ашенкреетерами, и диспатчем
    const {request, loading, error, clearError} = useHttp() //Запрос на сервак вынес в отдельный хук, так как его буем зать и в другой компоненте.
    const [value, setValue] = useState<string>(state.searchValue) // состояние нашего инпута


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    }


    const onSubmit = (e:FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        const getImages = async () => {
            try {
                const images = await request(value)
                dispatch(actions.setSearchValue(value)) //диспатчим строку поиска в стэйт
                dispatch(actions.clearStateImage()) // чистим массив картинок, если в нем что-то есть в нашем стэйте
                dispatch(actions.setImage({images:images.hits, total:images.total})) //диспатчим весь поллученный массив в стейт
            }catch (e) {
                throw e
            }
        }
        getImages()
    }
    SweetAlert(error,clearError) // выводим ошибки если они будут

    return (
        <Paper
            component="form"
            className={classes.root}
            onSubmit={(e:FormEvent<HTMLDivElement>) => onSubmit(e)}
        >
            <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
            >
                <SearchIcon/>
            </IconButton>
            <Divider className={classes.divider} orientation="vertical"/>
            <InputBase
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
                className={classes.input}
                placeholder="Search image by name"
                inputProps={{'aria-label': 'Search image by names'}}
            />
            <Divider className={classes.divider} orientation="vertical"/>
            {loading && <Preloader/>}
        </Paper>
    );
}