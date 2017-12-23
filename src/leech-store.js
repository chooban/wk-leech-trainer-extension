let leechData;

// eslint-disable-next-line
const refresh = (apiKey) => (
  // eslint-disable-next-line
  fetch(__LESSONS_URL__.replace(/apiKey/, apiKey))
    .then((r) => r.text())
    .then((l) => {
      leechData = JSON.parse(l);
    })
);

const count = () => leechData.leeches_available;

export {
  refresh,
  count
};
