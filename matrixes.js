var Matrix = {
	multiply: function(a, b) {
		if (!a || !b) {
			throw new Error('Matrixes shouldn\'t be undefined !');
		}

		if ( a.length != b[0].length) {
			throw new Error('Uncompatible dimensions!');
		}
		var result = [];
		var count = 0;
		for (var i = 0; i < a.length; i++) {
			result[i] = [];
			for (var k = 0; k < b[0].length; k++) {
				var sum = 0;

				for (var j = 0; j < a[0].length; j++) {
					sum += a[i][j] * b[j][k];
					count++;
				}

				result[i][k] = sum;
			}
		}
		console.log("Multiplications: " + count);
		return result;
	}
}