const isRGBHex = hex => {
	if (typeof hex !== 'string') {
		return false;
	}

	return /^#?([A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?)$/.test(hex);
};

module.exports = isRGBHex;
