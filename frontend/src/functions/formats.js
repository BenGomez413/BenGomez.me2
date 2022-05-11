//12:00 AM/PM
export const formatAMPM = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let ampm = hours >= 12 ? 'pm' : 'am'

  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes

  return `${hours}:${minutes}${ampm}`
}

//Mon DD, YYYY
export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const array = date.toDateString().split(' ')
  return `${array[1]} ${array[2]}, ${array[3]}`
}

//Color Formats
export const rgbToHex = (rgb) => {
  const rgbRegex = /rgb\((\d+),(\d+),(\d+)\)/
  const rgbArray = rgb.match(rgbRegex)
  const RGB = (rgbArray[1] << 16) | (rgbArray[2] << 8) | (rgbArray[3] << 0)
  return '#' + (0x1000000 + RGB).toString(16).slice(1)
}

export const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r},${g},${b})`
}
