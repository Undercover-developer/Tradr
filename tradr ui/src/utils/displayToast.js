import { Toast } from "bootstrap"
export default () =>{
    let toastElList = [].slice.call(document.querySelectorAll('.toast'))
    let toastList = toastElList.map(function(toastEl) {
        return new Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}