import { Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { AddFriendCard } from "../../modules/AddFriendCard";
import { User } from "../../interfaces/interface";

export interface IProps {
  profiles: User[];
  parentId: string;
  friendsList: string[];
  addProfiles: (profiles: User[]) => void;
  onClose: () => void;
  setParentId: (val: string) => void;
  setFriendsList: (friends: string[]) => void;
}

export const AddFriend = (props: IProps) => {
  const { addProfiles, profiles, onClose, setParentId, parentId, setFriendsList, friendsList } = props;
  const profilesListCards = () => {
    const parentData = profiles.filter((value: User) => value.id !== parentId);
    return parentData.map((profile: User, index: number) => {
      return <AddFriendCard
        Id={profile.id}
        name={profile.name}
        gender={profile.gender}
        location={profile.location}
        friendsList={friendsList}
        setFriendsList={setFriendsList}
        addProfiles={addProfiles}
        profiles={profiles}
        parentId={parentId} />
    })
  }

  const backToHome = () => {
    setParentId('');
    setFriendsList([]);
    onClose();
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add friends to your profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
          </Form.Group>
        </Form>
        <div>{profilesListCards()}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={backToHome}>
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


AddFriend.propTypes = {
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
  setParentId: PropTypes.func,
  parentId: PropTypes.string,
  setFriendsList: PropTypes.func,
  friendsList: PropTypes.arrayOf(PropTypes.string),
};