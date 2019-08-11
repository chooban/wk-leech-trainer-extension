const makeElement = (domString: string) => {
  const html: HTMLDocument = new DOMParser().parseFromString(domString, 'text/html')
  return html.body.firstChild as HTMLElement
}

export { makeElement }
