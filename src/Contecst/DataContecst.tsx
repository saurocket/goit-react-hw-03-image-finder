import React, {createContext, useContext, useReducer} from 'react'

import {InferActionTypes, SetImageType, StateType} from "./TypesContecst";





const DataContext = createContext({
  state: {
      images: [],
      total: 0,
      searchValue: null,
      currentPage: 1,
  } as StateType,
})

export const DataProvider = ({children}: any) => {
    const initialState:StateType = {
        images: [],
        total: 0,
        searchValue: 'girl',
        currentPage:1
    }

    const reducer = (state:StateType, action: ActionType) => {
        switch (action.type) {
            case 'SET_IMAGES' : {
                return  {...state, total: action.payload.total, images: [...state.images, ...action.payload.images]}
            }
            case 'SET_SEARCH_VALUE': {
                return {...state, searchValue: action.payload}
            }
            case 'CLEAR_STATE':{
                return {...state, images: [], currentPage: 1, total: 0}
            }
            case 'SET_CURRENT_PAGE': {
                return {...state, currentPage: action.payload}
            }
            default: return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)



    const actions = {
        setImage: (payload:SetImageType) => ({type: 'SET_IMAGES',payload} as const),
        setSearchValue: (payload: string) => ({type: 'SET_SEARCH_VALUE', payload} as const),
        clearStateImage: () => ({type: 'CLEAR_STATE'} as const),
        setCurrentPage: (payload: number) => ({type: 'SET_CURRENT_PAGE', payload} as const)
    }
    type ActionType = InferActionTypes<typeof actions>





    // @ts-ignore
    return <DataContext.Provider value={{state, actions, dispatch}}>
        {children}
    </DataContext.Provider>
}

export const useData = () => useContext(DataContext)









