import Title from "./StyledHomePage";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button, Col, Row } from "react-bootstrap";
import { AddProfile } from "./profile/AddProfile";
import { useEffect, useState } from "react";
import { ProfilesListView } from "./profile/ProfilesListView";
import { AddFriend } from "./friends/AddFriend";
import { ShowComparision } from "./connects/ShowComparision";

const HomePage = () => {
  const data = JSON.parse(localStorage.getItem('profilesKey') || '[]');
  const [profiles, setProfiles] = useState(data);
  const [showSignup, setShowSignup] = useState(false);
  const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
  const [parentId, setParentId] = useState('');
  const [friendsList, setFriendsList] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('profilesKey', JSON.stringify(profiles));
  }, [profiles]);

  return (
    <>
      <Title className="fw-bold fs-3">Connect with people</Title>
      <Tabs
        defaultActiveKey="add-profile"
        id="home-page"
        className="mb-3"
      >
        <Tab eventKey="add-profile" title="Add Profile">
          <Row className="mb-3" ><Col lg="10" className="d-flex justify-content-end"><Button onClick={() => setShowSignup(true)}>New Profile</Button></Col>
            <Col lg='2'>
              <Button onClick={() => { localStorage.removeItem('profilesKey'); setProfiles([]) }}>Remove All Users</Button>
            </Col>
          </Row>
          <Row style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
            <ProfilesListView
              profiles={profiles}
              showAddingPopup={() => setShowAddFriendPopup(true)}
              setParentId={setParentId}
              setFriendsList={setFriendsList}
            />
          </Row>
          {showSignup &&
            <AddProfile addProfiles={setProfiles} profiles={profiles} onClose={() => setShowSignup(false)} />}
          {showAddFriendPopup &&
            <AddFriend
              addProfiles={setProfiles}
              profiles={profiles}
              onClose={() => setShowAddFriendPopup(false)}
              setParentId={setParentId}
              parentId={parentId}
              friendsList={friendsList}
              setFriendsList={setFriendsList}
            />}
        </Tab>
        <Tab eventKey="connect-profile" title="Connect Profiles">
          <ShowComparision profiles={profiles} />
        </Tab>
      </Tabs>
    </>
  );
}

export default HomePage;
