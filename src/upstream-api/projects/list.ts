import members from './members';

const list = async (basePath: string, jwt: string) => {
  const response = await fetch(`${basePath}/projects`, {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
  });
  const projects = await response.json();
  return Promise.all(
    projects.map(async (project: any) => {
      project.members = await members(project.id, basePath, jwt);
      return project;
    })
  );
};

export default list;
