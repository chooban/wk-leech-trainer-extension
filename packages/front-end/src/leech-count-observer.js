const leechCount = (node, listener) => (mutations) => {
  const mutation = mutations[0]
  const count = Number(mutation.target.innerText)

  if (count <= 0) {
    node.removeEventListener('click', listener)
  } else {
    node.addEventListener('click', listener)
  }
}

export default leechCount
