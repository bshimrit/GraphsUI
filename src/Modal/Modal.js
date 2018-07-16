import React from "react";

import "./Modal.css";

const Modal = ({ handleCancel, handleUpdate, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleUpdate}>Update</button>
      </section>
    </div>
  );
};

export default Modal;
