import { toast } from "react-toastify";


const ToastSucces= (message) => {
  return toast.success(message);
}


const ToastFailure = (message) => {
  return toast.error(message);
}

export {ToastSucces,ToastFailure};