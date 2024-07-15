import { useState } from 'react';
import { FormGroup, Input, Label, Button } from 'reactstrap';
import './UserSelector.css';

interface UserSelectorProps {
  initialUsers: Array<string>;
  removedUsers: Array<string>;
  setRemovedUsers: (users: Array<string>) => void;
}

const UserSelector = ({
  initialUsers,
  removedUsers,
  setRemovedUsers,
}: UserSelectorProps) => {
  const [users, setUsers] = useState(initialUsers);
  const handleCheckboxChange = (user: string) => {
    if (users.includes(user)) {
      setUsers(users.filter((u) => u !== user));
      setRemovedUsers([...removedUsers, user]);
    }
  };

  return (
    <div id="my-element" style={{ height: '200px', overflow: 'scroll' }}>
      <h3>Manage existing permissions</h3>
      Shared with {initialUsers.length} users
      {initialUsers.length > 0 && (
        <Button
          color="none"
          outline={true}
          className="link-button"
          onClick={() => {
            setRemovedUsers(users);
            setUsers([]);
          }}
        >
          Remove all users
        </Button>
      )}
      <FormGroup>
        {users &&
          users?.map((user, index) => (
            <FormGroup check key={index}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={users.includes(user)}
                  onChange={() => handleCheckboxChange(user)}
                />
                {user}
              </Label>
              {/* <Button color="danger" size="sm" onClick={() => setCategories(categories.filter(c => c !== category))}>
                        Remove
                    </Button> */}
            </FormGroup>
          ))}
      </FormGroup>
    </div>
  );
};

export default UserSelector;
