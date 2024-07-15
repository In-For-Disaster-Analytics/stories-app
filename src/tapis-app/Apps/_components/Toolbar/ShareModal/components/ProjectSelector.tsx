import { useState } from 'react';
import { Container, FormGroup, Input, Label } from 'reactstrap';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { Project } from 'upstream-api/projects/types';
import { useList } from 'upstream-hooks/projects';

interface ProjectSelectorProps {
  setUsers: (users: Array<string>) => void;
  users: Array<string>;
}

const ProjectSelector = ({ setUsers, users }: ProjectSelectorProps) => {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const { data: projects, isLoading, error } = useList();
  const handleCheckboxChange = (project: Project) => {
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
        {projects &&
          projects?.map((project, index) => (
            <FormGroup check key={index}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={selectedProjects.includes(project.id)}
                  onChange={() => handleCheckboxChange(project)}
                />
                {project.title}
              </Label>
            </FormGroup>
          ))}
      </FormGroup>
    </QueryWrapper>
  );
};

export default ProjectSelector;
