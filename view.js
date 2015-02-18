 var canvas = document.getElementById('myCanvas');

 function wrapText(context, text, x, y, maxWidth, lineHeight) {
 	var words = text.split(' ');
 	var line = '';

 	for (var n = 0; n < words.length; n++) {
 		var testLine = line + words[n] + ' ';
 		var metrics = context.measureText(testLine);
 		var testWidth = metrics.width;
 		if (testWidth > maxWidth && n > 0) {
 			context.fillText(line, x, y);
 			line = words[n] + ' ';
 			y += lineHeight;
 		} else {
 			line = testLine;
 		}
 	}
 	context.fillText(line, x, y);
 }

 function Point(x, y) {
 	this.x = x;
 	this.y = y;
 }
 Point.prototype.right = function(shift) {
 	return new Point(this.x + shift, this.y);
 }
 Point.prototype.left = function(shift) {
 	return new Point(this.x - shift, this.y);
 }
 Point.prototype.down = function(shift) {
 	return new Point(this.x, this.y + shift);
 }
 Point.prototype.up = function(shift) {
 	return new Point(this.x, this.y - shift);
 }

 function TreeRenderer(canvas, tree) {
 	this.tree = tree;
 	this.c = canvas.getContext('2d');
 	this.H = canvas.height;
 	this.W = canvas.width;
 	this.canvas = canvas;
 }
 TreeRenderer.prototype.renderLink = function(from, to) {
 	this.c.beginPath();
 	this.c.moveTo(from.x, from.y);
 	this.c.lineTo(to.x, to.y);
 	this.c.stroke();
 }


 TreeRenderer.prototype.renderNode = function(center, node) {
 	this.c.beginPath();
 	this.c.arc(center.x, center.y, 15, 0, 2 * Math.PI, false);
 	this.c.fillStyle = (node instanceof RBTree.prototype.Node) ? node.color : 'black';
 	this.c.fill();
 	this.c.lineWidth = 2;
 	this.c.strokeStyle = '#003300';
 	this.c.stroke();
 	this.c.font = '10pt Calibri';
 	this.c.textAlign = 'center';
 	this.c.textBaseline = 'middle';
 	this.c.fillStyle = 'white';
 	this.c.fillText(node.value, center.x, center.y);

 }
 TreeRenderer.prototype.renderNill = function(center) {
 	this.c.beginPath();
 	this.c.rect(center.x - 10, center.y - 10, 20, 20);
 	this.c.fillStyle = 'black';
 	this.c.fill();
 	this.c.lineWidth = 2;
 	this.c.strokeStyle = '#003300';
 	this.c.stroke();
 	this.c.font = '10pt Calibri';
 	this.c.textAlign = 'center';
 	this.c.textBaseline = 'middle';
 	this.c.fillStyle = 'white';
 	this.c.fillText('nill', center.x, center.y);

 }

 TreeRenderer.prototype.renderTree = function(position) {
 	if (this.tree.root == undefined) {
 		return;
 	}
 	root = this.tree.root;
 	var treeHeight = 0;

 	function goDown(parent, pathLength) {
 		if (parent.left == undefined) {
 			if (pathLength > treeHeight) {
 				treeHeight = pathLength;
 			}

 		} else {
 			goDown(parent.left, ++pathLength);
 		}
 		if (parent.right == undefined) {
 			if (pathLength > treeHeight) {
 				treeHeight = pathLength;
 			}

 		} else {
 			goDown(parent.right, ++pathLength);
 		}
 	}

 	goDown(root, 0);
 	this.BOTTOM_WIDTH = this.W / (4.5 * Math.pow(2, treeHeight));
 	this.LEVEL_GAP = (this.H - position.y) / (2.2 * treeHeight);


 	function traverse($this, parent, currentPosition, level) {
 		if (parent == undefined) {
 			$this.renderNill(currentPosition);
 			return;

 		}
 		var halfWidth = Math.pow(2, treeHeight - level) * $this.BOTTOM_WIDTH;
 		var leftNodePosition = currentPosition.down($this.LEVEL_GAP).left(halfWidth);
 		var rightNodePosition = currentPosition.down($this.LEVEL_GAP).right(halfWidth);
 		$this.renderLink(currentPosition, leftNodePosition);
 		$this.renderLink(currentPosition, rightNodePosition);
 		$this.renderNode(currentPosition, parent);

 		traverse($this, parent.left, leftNodePosition, level + 1);
 		traverse($this, parent.right, rightNodePosition, level + 1);

 	}
 	traverse(this, root, position, 0)

 }
 var tree = new RBTree();
 var tr = new TreeRenderer(canvas, tree);

 function step(textParam) {

 	if (textParam) {
 		var maxWidth = 400;
 		var lineHeight = 25;
 		var y = 60;
 		tr.c.font = '16pt Calibri';
 		tr.c.fillStyle = '#333';
 		wrapText(tr.c, textParam, canvas.width/2, y, maxWidth, lineHeight);
 	} else {
 		tr.c.clearRect(0, 0, canvas.width, canvas.height);
 		tr.renderTree(new Point(canvas.width/2, canvas.height / 5));
 		text = '';
 	}

 }
 tree.callback = step;


 tree.insert(45);

 tree.insert(21);
 tree.insert(30);
 tree.insert(50);
 tree.insert(55);
 tree.insert(57);
 tree.insert(49);
 tree.insert(12);
 tree.insert(20);
 tree.insert(25);
 tree.insert(5);