export function extraUrl (imageHash) {
  if (imageHash.search(/jpeg$/) > -1) {
    return `https://fuss10.elemecdn.com/${imageHash.substring(0, 1)}/${imageHash.substring(1, 3)}/${imageHash.substring(3)}.jpeg`
  } else {
    return `https://fuss10.elemecdn.com/${imageHash.substring(0, 1)}/${imageHash.substring(1, 3)}/${imageHash.substring(3)}.png`
  }
}
