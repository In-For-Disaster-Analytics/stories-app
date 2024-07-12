const list = (basePath: string, jwt: string) => {
  console.log('basePath:', basePath);
  return fetch(`${basePath}/projects`, {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
  });
};

export default list;
