


 export type ImagesType = {
    id: number,
     largeImageURL: string
    previewURL: string
     tags: string
}


export type SetImageType = {
    images: Array<ImagesType>
    total: number
}

export type StateType = {
    images: Array<ImagesType>
    total: null | number
    searchValue: null | string
    currentPage: null | number
}
 export type InferActionTypes<T> = T extends {[key: string]: (...arg:any[]) => infer U } ? U: never