var Arrays = {
	minMax: function(array) {
		if (!array || array.length == 0) {
			throw new Error('Array shouldn\'t be undefined or empty!');
		}
		var min = max = array[array.length - 1];
		var compares = 0;

		function compare(minPretender, maxPretender) {

			if (minPretender < min) {
				min = minPretender;
			}
			if (maxPretender > max) {
				max = maxPretender;
			}
			compares += 2;
		}
		var range = 0;
		if (array.length % 2 == 0) {
			range = array.length;
		} else {
			range = array.length - 1;
		}
		for (var i = 0; i < range; i += 2) {
			if (array[i] < array[i + 1]) {
				compare(array[i], array[i + 1])
			} else {
				compare(array[i + 1], array[i])
			}
			compares++;

		}

		console.log('N :' + array.length + ', compares: ' + compares + ', ratio: ' + compares/array.length);
		return [min, max];
	}
}