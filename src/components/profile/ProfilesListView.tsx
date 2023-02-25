import { User } from "../../interfaces/interface";
import { UserCard } from "../../modules/UserCard";

export interface IProps {
    profiles: User[]
    showAddingPopup: () => void
    setParentId: (val: string) => void
    setFriendsList: (friends: string[]) => void
}

export const ProfilesListView = (props: IProps) => {
    const { profiles, showAddingPopup, setParentId, setFriendsList } = props;
    return (
        <>
            {profiles.map((profile: User) => {
                return <UserCard
                    key={profile.id}
                    id={profile.id}
                    name={profile.name}
                    age={profile.age}
                    gender={profile.gender}
                    location={profile.location}
                    showAddingPopup={showAddingPopup}
                    setParentId={setParentId}
                    setFriendsList={setFriendsList}
                    friendsList={profile.friendsList}
                />
            })}
        </>
    );
}