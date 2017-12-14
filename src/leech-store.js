let leechData;

const refresh = (apiKey) => (
  fetch(`https://wanikanitools-golang.curiousattemptbunny.com/leeches/lesson?api_key=${apiKey}`)
    .then((r) => r.text())
    .then((l) => {
      leechData = JSON.parse(l);
    })
);

const count = () => leechData.leeches_available;

module.exports = {
  refresh,
  count
};
