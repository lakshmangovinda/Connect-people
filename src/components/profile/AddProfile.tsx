import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { uniqueUserId } from "../../utils";
import { User } from "../../interfaces/interface";


interface IProps {
  addProfiles: (profiles: User[]) => void,
  profiles: User[],
  onClose: () => void,
}


export const AddProfile = (props: IProps) => {
  const { addProfiles, profiles, onClose } = props;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const submittingProfile = (e: any) => {
    e.preventDefault();
    addProfiles([...profiles, { id: uniqueUserId(), name: name, age: age, gender: gender, location: location, friendsList: [] }]);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            
          </Form.Group>
          <Form.Group className="mb-3" controlId="age" >
            <Form.Label>Age</Form.Label>s
            <Form.Control type="age" placeholder="age" value={age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)} />
            
          </Form.Group>
          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select placeholder="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
              <option value='select'>Select</option>
              <option value='Male'>Male</option>
              <option value='FeMale'>FeMale</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="location" placeholder="location" value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer  >
        <Container fluid>
          <Row lg='12' >
            <Col lg='2'>
              <Button variant="primary" type="submit" onClick={onClose}>
                Cancel
              </Button>
              </Col>
              <Col lg='2'>
              <Button variant="primary" type="submit" disabled={!!(!name || !age || !gender || !location)} onClick={(e: any) => submittingProfile(e)}>
                Add
              </Button>
              </Col>
              
            
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}


AddProfile.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  addProfiles: PropTypes.func,
  onClose: PropTypes.func,
};