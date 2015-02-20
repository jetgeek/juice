QUnit.test( "Funtion should return minumum and maximum of the input array", function( assert ) {
	var expected = [1,1];
  assert.deepEqual(Arrays.minMax([1]), expected);
});
QUnit.test( "Test array with two elements", function( assert ) {
	var expected = [1,2];
  assert.deepEqual(Arrays.minMax([2,1]), expected);
});
QUnit.test( "Odd number of elements", function( assert ) {
	var expected = [1,3];
  assert.deepEqual(Arrays.minMax([3,2,1]), expected);
});
QUnit.test( "Random input", function( assert ) {
	var expected = [-6,345];
  assert.deepEqual(Arrays.minMax([25, 14, 89,345, 4, 4, 90, -6, 3,2,1]), expected);
});
QUnit.test( "Long random input", function( assert ) {
	var expected = [-7,649586];
  assert.deepEqual(Arrays.minMax([-7, 123, 12, 34, 649586, 34,25, 14, 89,345, 4, 4, 90, -6, 3,2,1,123, 12, 34, 649586, 34,25, 14, 89,345, 4, 4, 90, -6, 3,2,1,123, 12, 34, 649586, 34,25, 14, 89,345, 4, 4, 90, -6, 3,2,1,123, 12, 34, 649586, 34,25, 14, 89,345, 4, 4, 90, -6, 3,2,1,123, 12, 34, 649586, 34,25, 14, 89,345, 4, 4, 90, -6, 3,2,1,123, 12, 34, 649586, 34,25, 14, 89,345, 4, 4, 90, -6, 3,2,1,123, 12, 34, 649586, 34,25, 14, 89,345, 4, 4, 90, -6, 3,2,1]), expected);
});
QUnit.test( "Simple multiply example", function( assert ) {
	var expected = [[7,10],[15,22],[23,34]];
  assert.deepEqual(Matrix.multiply([[1,2],[3,4],[5,6]], [[1,2],[3,4]]),expected);
});
QUnit.test( "Multiply empty matrixes", function( assert ) {

  assert.deepEqual(Matrix.multiply([], []),[]);
});
QUnit.test( "Multiply empty and non-empty matrixes", function( assert ) {

  assert.throws(Matrix.multiply([], [1,2]), new Error('Uncompatible dimensions!'));
});