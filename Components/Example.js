import React,{useState} from "react";
import { Button, Modal } from "react-bootstrap";

export default function Example() {
  const [show, setShow] = useState();

   

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Conirm Delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => setShow(false) }>
            Close
          </Button>
          <Button variant="primary" onClick={e => setShow(true)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
