const list = async (basePath: string, jwt: string) => {
  console.log('basePath:', basePath);
  const response = await fetch(`${basePath}/projects`, {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
  });
  return response.json();
};

export default list;
