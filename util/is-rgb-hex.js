const isRGBHex = hex => {
	if (typeof hex !== 'string') {
		return false;
	}
	const hexPattern = /^#?([A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?)$/;
	const result = hexPattern.test(hex);
	return result;
};

module.exports = isRGBHex;
