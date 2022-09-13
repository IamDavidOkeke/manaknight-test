let rowPosition = [0, 0]
let observer = null

function emitChange() {
  observer(rowPosition)
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function moveRow(toX, toY) {
  rowPosition = [toX, toY]
  emitChange()
}
/* ... */

export function canMoveRow(toX, toY) {
  const [x, y] = rowPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}