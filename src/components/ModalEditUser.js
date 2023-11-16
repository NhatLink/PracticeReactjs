import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { putEdiUser } from "../service/UserService";
import React from "react";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { handleEditUserFromModal, userEditData, showProp, handleClose } =
    props;
  // const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putEdiUser(userEditData.id, name, job);
    if (res) {
      handleEditUserFromModal({
        first_name: name,
        id: userEditData.id,
      });
      console.log("check ID edit: ", userEditData.id);
      toast.success(`Update User ${name} success !`);
      handleClose();
    } else {
      toast.warning(`Update User ${name} fail !`);
    }
    console.log("check res update: ", res);
  };

  useEffect(() => {
    if (showProp) {
      setName(userEditData.first_name);
    }
  }, [showProp, userEditData]);
  return (
    <>
      {/* <Button variant="primary" onClick={OnClick()}>
        Edit User
      </Button> */}

      <Modal show={showProp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Form</Modal.Title>
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
          <Button variant="primary" onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
