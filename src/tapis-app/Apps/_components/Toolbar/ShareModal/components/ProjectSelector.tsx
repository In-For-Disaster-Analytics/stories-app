import { useState } from 'react';
import { Container, FormGroup, Input, Label } from 'reactstrap';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useList } from 'upstream-hooks/projects';

interface ProjectSelectorProps {
  setUsers: (users: Array<string>) => void;
  users: Array<string>;
}

const ProjectSelector = ({ setUsers, users }: ProjectSelectorProps) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const { data, isLoading, error } = useList();
  const handleCheckboxChange = (project) => {
    if (selectedProjects.includes(project.id)) {
      setSelectedProjects(selectedProjects.filter((p) => p !== project.id));
    } else {
      setSelectedProjects([...selectedProjects, project.id]);
      const usernames = project.members.map((member) => member.username);
      setUsers([...users, ...usernames]);
    }
  };

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <FormGroup>
        {data &&
          data?.map((project, index) => (
            <FormGroup check key={index}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={selectedProjects.includes(project.id)}
                  onChange={() => handleCheckboxChange(project)}
                />
                {project.title}
              </Label>
              {/* <Button color="danger" size="sm" onClick={() => setCategories(categories.filter(c => c !== category))}>
                        Remove
                    </Button> */}
            </FormGroup>
          ))}
      </FormGroup>
    </QueryWrapper>
  );
};

export default ProjectSelector;
