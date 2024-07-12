const list = async (basePath: string, jwt: string) => {
  const response = await fetch(`${basePath}/projects`, {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
  });
  return response.json();
};

export default list;
