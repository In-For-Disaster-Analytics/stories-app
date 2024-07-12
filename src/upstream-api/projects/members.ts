const members = async (project_id: number, basePath: string, jwt: string) => {
  const response = await fetch(`${basePath}/projects/${project_id}/members`, {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
  });
  return response.json();
};

export default members;
