const palindrome = s => s.split('').reverse().join('')

const average = a => (a.length)
  ? a.reduce((s, i) => s + i, 0) / a.length
  : 0

module.exports = {
  palindrome,
  average,
}
