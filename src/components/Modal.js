import React, { useEffect } from "react";

const Modal = (props) => {
  const { setModalStatus } = props;

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      setModalStatus(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div class="fixed top-0 right-0 bottom-0 left-0 md:w-1/2 w-9/12 my-24 flex justify-center items-center mx-auto bg-gray-200 rounded-md">
      {props.children}
    </div>
  );
};

export default Modal;
