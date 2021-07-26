import Swal from "sweetalert2";
import {useEffect} from "react";


export const  useAlert = () => {
    const SweetAlert = (error: any, clearError:() => void) => {
        useEffect(() => {
            if (error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: `<a href="#">${error}</a>`
                })
            }
            clearError()
        },[error, clearError])
    }
    return {SweetAlert}
}