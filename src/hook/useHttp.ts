import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request: any = useCallback(async (value = '', page = 1) => {
        const url = 'https://pixabay.com/api/'
        const key = '21822388-90e2619eec9f9ca7d32baa228'
        setLoading(true)

    try {
        const response = await fetch(`${url}?q=${value}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'something went not well')
        }
        setLoading(false)
        return data
    }
    catch (e) {
        setLoading(false)
        setError(e.message)
        throw e
    }
    },[])

    const clearError = useCallback(() => setError(null), [])
    return {loading, request, error, clearError }
}