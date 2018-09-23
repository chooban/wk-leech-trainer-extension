const makeElement = (domString) => {
  const html = new DOMParser().parseFromString(domString, 'text/html')
  return html.body.firstChild
}

export default makeElement
