export default function createTargetNode() {
  const targetNode = document.createElement('span')
  targetNode.setAttribute('data-wk-ext', 'true')
  return targetNode
}
