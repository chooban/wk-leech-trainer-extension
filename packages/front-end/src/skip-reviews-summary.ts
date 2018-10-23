export default function skipSummary(skip) {
  const reviewsNode = document.querySelector('ul.nav > li.reviews > a')

  if (!reviewsNode) {
    return
  }

  if (skip) {
    reviewsNode.setAttribute('href', '/review/start')
  } else {
    reviewsNode.setAttribute('href', '/review')
  }
}
