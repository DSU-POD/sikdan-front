import { useState } from "react";
import SuccessToast from "./success-toast";
import ErrorToast from "./error-toast";

export default function ToastComponent() {
  const [toast, setToast] = useState({
    isShow: false,
    isError: false,
    message: "",
  });

  const setToastInfo = (message, isError = false) => {
    console.log(isError);
    setToast({
      isShow: true,
      isError,
      message,
    });

    setTimeout(() => {
      setToast({
        isShow: false,
        isError: false,
        message: "",
      });
    }, 5000);
  };
  ToastComponent.setToastInfo = setToastInfo;

  return (
    <>
      {console.log(toast.isError)}

      {toast.isShow ? (
        toast.isError ? (
          <ErrorToast message={toast.message} setToast={setToast} />
        ) : (
          <SuccessToast message={toast.message} setToast={setToast} />
        )
      ) : (
        ""
      )}
    </>
  );
}

export const showToast = (message, isError = false) => {
  console.log(isError);
  ToastComponent.setToastInfo(message, isError);
};
