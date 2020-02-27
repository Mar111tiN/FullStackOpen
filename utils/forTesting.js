const palindrome = (s) => s.split('').reverse().join('');

const average = (a) => a.reduce((s, i) => s + i, 0) / a.length;

module.exports = {
	palindrome,
	average
};
