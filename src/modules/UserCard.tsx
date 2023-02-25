import { Button, Card, Col } from "react-bootstrap";
import PropTypes from 'prop-types';
 interface IProps{
id:string,
name:string,
age:string
gender:string,
location:string,
showAddingPopup:()=>void,
 setParentId:(id:string)=>void,
 friendsList:string[]
  setFriendsList:(friends: string[])=>void,
   
 }

export const UserCard = (props: IProps) => {
    const { id, name, age, gender, location, showAddingPopup, setParentId, setFriendsList, friendsList } = props;
    const showAddPopup = () => {
        setParentId(id);
        showAddingPopup();
        setFriendsList(friendsList);
    }
    return (<Col lg="2"><Card>
    {gender === 'Male' ? <Card.Img variant="top" src="./Images/Male.png" style={{ height: '100px', width: '100px' }} />: <Card.Img variant="top" src="./Images/Female.png" style={{ height: '100px', width: '100px' }}  />}
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>age: {age}</Card.Text>
      <Card.Text>gender: {gender}</Card.Text>
      <Card.Text>location: {location}</Card.Text>
      <Button variant="primary" onClick={showAddPopup}>Add Friend</Button>
    </Card.Body>
  </Card></Col>)
};

UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    showAddingPopup: PropTypes.func.isRequired,
    setParentId: PropTypes.func.isRequired,
    setFriendsList: PropTypes.func.isRequired,
    friendsList: PropTypes.arrayOf(PropTypes.string),
  };
