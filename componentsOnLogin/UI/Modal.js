import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <Backdrop onClick={props.onClick} />,
          document.getElementById("modal-root")
        )}
        {ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          document.getElementById("modal-root")
        )}
      </React.Fragment>
    );
  }
};

export default Modal;
