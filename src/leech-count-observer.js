const leechCount = (node) => (mutations) => {
  const mutation = mutations[0];
  const count = Number(mutation.target.innerText);

  console.log('leech count: ' + count);
};

export {
  leechCount
};
