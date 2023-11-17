import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { postCreateUser } from "../service/UserService";
import React from "react";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { handleUpdateTable } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSubmit = async () => {
    const res = await postCreateUser(name, job);
    console.log("check User Info =>> ", res);
    if (res && res.id && res.name && res.job) {
      setShow(false);
      setName("");
      setJob("");
      toast.success(`Create User ${name} success !`);
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.warning("create user fail ! Try again");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-plus"></i>
        Add New User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new User Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </Form.Group>
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

export default ModalAddNew;
