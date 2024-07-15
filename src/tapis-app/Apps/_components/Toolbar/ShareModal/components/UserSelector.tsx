import { useState } from 'react';
import { Button, Container, FormGroup, Input, Label } from 'reactstrap';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useList } from 'upstream-hooks/projects';
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
  const handleCheckboxChange = (user) => {
    if (users.includes(user)) {
      setUsers(users.filter((u) => u !== user));
      setRemovedUsers([...removedUsers, user]);
    }
  };

  return (
    <div id="my-element" style={{ height: '200px', overflow: 'scroll' }}>
      <h3>Manage existing permissions</h3>
      Shared with {initialUsers.length} users
      {removedUsers.length > 0 && (
        <button
          className="link-button"
          onClick={() => {
            setRemovedUsers(users);
            setUsers([]);
          }}
        >
          Remove all users
        </button>
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
