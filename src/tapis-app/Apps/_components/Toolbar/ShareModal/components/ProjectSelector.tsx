import { Container, FormGroup, Input, Label } from 'reactstrap';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useList } from 'upstream-hooks/projects';

const ProjectSelector = () => {
  const { data, isLoading, error } = useList();
  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <Container>
        <FormGroup>
          {data &&
            data?.map((project, index) => (
              <FormGroup check key={index}>
                <Label check>
                  <Input
                    type="checkbox"
                    //   checked={selectedCategories.includes(category.id)}
                    //   onChange={() => handleCheckboxChange(category)}
                  />{' '}
                  {project.title}
                </Label>
                {/* <Button color="danger" size="sm" onClick={() => setCategories(categories.filter(c => c !== category))}>
                        Remove
                    </Button> */}
              </FormGroup>
            ))}
        </FormGroup>
      </Container>
    </QueryWrapper>
  );
};

export default ProjectSelector;
