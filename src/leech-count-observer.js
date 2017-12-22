const leechCount = (mutations) => {
  const mutation = mutations[0];
  const node = mutation.target;
  const leechCount = Number(mutation.target.innerText);

  console.log('Mutations: ' + mutations);
};

export {
  leechCount
};
