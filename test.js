var array = [4, 9, -23, 14, -6, 20, 33, -8, 1, -52];
var x = 14;
var count = 0;

//how many values are less than x
for (var i = 0; i < array.length; i++) {
	if (array[i] < x) {
		count++;
	}
}

console.log(count);
