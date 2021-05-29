export default function isRGBHex(value) {
	if (typeof value !== 'string') {
		return false;
	}

	return /^#?([a-f\d]{3}([a-f\d]{3})?)$/i.test(value);
}
