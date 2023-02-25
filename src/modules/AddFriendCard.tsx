import { Button, Card, Col, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import { User } from "../interfaces/interface";


interface IProps {
  Id:string,
  name: string,
  gender: string,
  location: string,
  friendsList: string[]
  profiles:any,
  parentId:string
  addProfiles:(profiles:User[])=>void
  setFriendsList: (friends: string[]) => void
}

export const AddFriendCard = (props: IProps) => {
    const { name, location, gender, Id, friendsList, profiles, parentId, addProfiles } = props;
    const srcURL= gender=== "Male" ? "./Images/Male.png": "./Images/Female.png";
    const [parentData] = profiles.filter((value: User)=> value.id === parentId);
    const [childData] = profiles.filter((value: User)=> value.id === Id);
    const isFriend = parentData.friendsList.includes(Id);

    const addingFriendToParent = () => {
        let updatedFriendsList = friendsList;
        let childFriendsList = childData.friendsList;
        updatedFriendsList.push(Id);
        childFriendsList.push(parentId);
        let updatedProfilesInfo = profiles;
        const parentIndex = updatedProfilesInfo.findIndex((obj: User) => obj.id === parentId);
        const childIndex = updatedProfilesInfo.findIndex((obj: User) => obj.id === Id);
        updatedProfilesInfo[parentIndex].friendsList = updatedFriendsList;
        updatedProfilesInfo[childIndex].friendsList = childFriendsList;
        addProfiles(JSON.parse(JSON.stringify(updatedProfilesInfo)));
    }

    return (<Row style={{ margin: '0rem'}}><Card> 
    <Card.Body style={{ display: 'flex'}}>
      <Col lg="2">
        <Card.Img variant="top" src={srcURL} style={{ borderRadius: '50%', height: '50px', width: '50px' }} /></Col>
      <Col lg="8"><div>
        <h5>{name}</h5>
        <span>{location}</span>
      </div></Col>
      {isFriend ? 
      <Col lg="2" className="pt-2"><Button variant="primary">Friends</Button></Col>: 
      <Col lg="2" className="pt-2"><Button variant="primary" onClick={addingFriendToParent}>Add</Button></Col>}
    </Card.Body>
  </Card></Row>)
};

AddFriendCard.propTypes = {
    Id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    friendsList: PropTypes.arrayOf(PropTypes.string),
    addProfiles: PropTypes.func,
    setFriendsList: PropTypes.func,
    profiles: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          age: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          gender: PropTypes.string.isRequired,
          location: PropTypes.string.isRequired,
        })
      ).isRequired, 
  };
