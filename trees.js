function extend(Child, Parent) {
	var F = function() {}
	F.prototype = Parent.prototype
	Child.prototype = new F()
	Child.prototype.constructor = Child
	Child.superclass = Parent.prototype
}



function BSTree() {

}
BSTree.prototype.Node = function(value) {
	this.value = value;
}
BSTree.prototype.insert = function(value) {
	var node = new this.Node(value);
	this.insertNode(node);
}
BSTree.prototype.insertNode = function(node) {

	var currentNode = this.root;
	var parentNode;
	while (currentNode != undefined) {
		parentNode = currentNode;
		if (node.value > currentNode.value) {
			currentNode = currentNode.right
		} else {
			currentNode = currentNode.left;
		}
	}
	node.parent = parentNode;
	if (parentNode == undefined) {
		this.root = node;
	} else {
		if (node.value > parentNode.value) {
			parentNode.right = node;
		} else {
			parentNode.left = node;
		}
	};
}


function RBTree(callback) {
	this.callback = callback;
}

extend(RBTree, BSTree);
RBTree.prototype.Node = function(value, color) {
	this.value = value;
	this.color = color;
}
extend(RBTree.prototype.Node, BSTree.prototype.Node);
RBTree.prototype.rotateRight = function(x) {
	y = x.left;
	x.left = y.right;
	if (y.right != undefined) {
		y.right.parent = x;
	}
	y.parent = x.parent;
	if (x.parent == undefined) {
		this.root = y;
	} else {
		if (x.parent.left == x) {
			x.parent.left = y;
		} else {
			x.parent.right = y;
		}
	}
	y.right = x;
	x.parent = y;
}
RBTree.prototype.rotateLeft = function(x) {
	y = x.right;
	x.right = y.left;
	if (y.left != undefined) {
		y.left.parent = x;
	}
	y.parent = x.parent;
	if (x.parent == undefined) {
		this.root = y;
	} else {
		if (x.parent.left == x) {
			x.parent.left = y;
		} else {
			x.parent.right = y;
		}
	}
	y.left = x;
	x.parent = y;
}
RBTree.prototype.insert = function(value) {
	if (this.callback) this.callback('Adding ' + value);
	var node = new this.Node(value, 'red');
	RBTree.superclass.insertNode.call(this, node);
	if (this.callback) this.callback();
	console.log();
	while (node != this.root && node.parent.color == 'red') {
		if (node.parent.parent != undefined) {
			if (node.parent == node.parent.parent.left) {
				if (node.parent.parent.right != undefined && node.parent.parent.right.color == 'red') {
					if (this.callback) this.callback('Recoloring nodes, as uncle is red');
					node.parent.parent.right.color = 'black';
					node.parent.parent.color = 'red';
					node.parent.color = 'black';
					node = node.parent.parent;
					if (this.callback) this.callback();
					console.log();
				} else { // uncle Ben's
					if (node.parent.right == node) {
						if (this.callback) this.callback('This node is right to it\'s parent, so rotate it\'s parent to left');
						node = node.parent;
						this.rotateLeft(node);
						if (this.callback) this.callback();
						console.log();
					}
					if (this.callback) this.callback('And perform right rotation');
					this.rotateRight(node.parent.parent);
					node.parent.color = 'black';
					node.parent.right.color = 'red';
					if (this.callback) this.callback();
					console.log();
				}

			} else {

				if (node.parent.parent.left != undefined && node.parent.parent.left.color == 'red') {
					if (this.callback) this.callback('Recoloring nodes, as uncle is red');
					node.parent.parent.left.color = 'black';
					node.parent.parent.color = 'red';
					node.parent.color = 'black';
					node = node.parent.parent;
					if (this.callback) this.callback();
					console.log();
				} else { // uncle Ben's
					if (node.parent.left == node) {
						if (this.callback) this.callback('This node is left to it\'s parent, so rotate it\'s parent to right');
						node = node.parent;
						this.rotateRight(node.parent);
						if (this.callback) this.callback();
						console.log();
					}
					if (this.callback) this.callback('And perform left rotation');
					this.rotateLeft(node.parent.parent);
					node.parent.color = 'black';
					node.parent.left.color = 'red';
					if (this.callback) this.callback();
					console.log();
				}

			}
		} else {
			break;
		}
		if(node == this.root){
			if (this.callback) this.callback('Root node, leaving the loop');
			if (this.callback) this.callback();
		} else if(node.parent.color == 'black'){
			if (this.callback) this.callback('Parent is black, leaving the loop');
			if (this.callback) this.callback();
		}
	}
	this.root.color = 'black';
}

//tree.rotateRight(toRotate);
/*root.left.right = new Red(20);
root.left.right.left = new Black(24);
root.left.right.right = new Red(8);
root.right.right = new Red(20);
root.right.right.left = new Black(24);
root.right.right.right = new Red(8);
root.right.right.right.right = new Red(18);
root.right.right.right.left = new Black(188);
root.right.right.right.left.right = new Black(188);
root.right.right.right.right = new Black(188);
root.right.right.right.right.right = new Black(188);
root.right.right.right.right.right.right = new Black(188);*/