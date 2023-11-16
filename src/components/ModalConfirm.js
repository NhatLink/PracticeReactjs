import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { deleteUser } from "../service/UserService";
import React from "react";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { userDeleteData, showProp, handleClose, handleDeleteUserFromModal } =
    props;
  const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const res = await deleteUser(userDeleteData.id);
    console.log("check delete status =>> ", res);
    if (res && +res.statusCode === 204) {
      setShow(false);
      toast.success(`Delete User ${userDeleteData.first_name} success !`);
      handleClose();
      handleDeleteUserFromModal(userDeleteData);
    } else {
      toast.warning("Delete user fail !");
      handleClose();
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add New User
      </Button> */}

      <Modal
        show={showProp}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            You want to delete {userDeleteData.first_name} with email{" "}
            {userDeleteData.email}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
