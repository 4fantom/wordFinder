class WordFinder {

    constructor(str1, str2) {
        this.str1 = str1;
        this.str2 = str2;
        this.str1Arr = this.createMatrix();
        this.str2Arr = Array.from(str2);
        this.iteration = 0;
        this.wordCords = [];
        this.wordCheckMatrix = [];
    }

    createMatrix() {
        let string1 = Array.from(this.str1);
        let dimension = this.findDimension(string1);

        return this.fillMatrix([], string1, dimension)
    }

    createCheckMatrix() {
        for (let x = 0; x < this.str1Arr.length; x++) {
            this.wordCheckMatrix[x] = [];
            for (let y = 0; y < this.str1Arr.length; y++) {
                this.wordCheckMatrix[x][y] = 0;
            }
        }
    }

    fillMatrix(matrix, arr, dimension) {
        for (let i = 0; i < dimension; i++) {
            matrix.push(arr.splice(0, dimension));
        }
        return matrix
    }

    findDimension(arr) {
        let dimension;
        if (Math.sqrt(arr.length) % 1 !== 0) {
            console.log('first string must be of size N^2');
            return;
        }
        dimension = Math.sqrt(arr.length);
        return dimension
    }

    getNeighboursCords(indexArr, dimension) {
        let neighbours = [];
        if (indexArr[0] !== 0) {
            neighbours.push([indexArr[0] - 1, indexArr[1]]);
        }
        if (indexArr[1] !== 0) {
            neighbours.push([indexArr[0], indexArr[1] - 1])
        }
        if (indexArr[1] !== dimension - 1) {
            neighbours.push([indexArr[0], indexArr[1] + 1])
        }
        if (indexArr[0] !== dimension - 1) {
            neighbours.push([indexArr[0] + 1, indexArr[1]])
        }
        return neighbours;
    }

    findFirstLetterCords(matrix, letter) {
        const dimension = matrix.length;
        for (let x = 0; x < dimension; x++) {
            for (let y = 0; y < dimension; y++) {
                if (matrix[x][y] === letter && !this.wordCheckMatrix[x][y]) {
                    return [x, y];
                }
            }
        }
        return console.log('no word found');
    }

    findLetterCord(letter = '', matrix = [], ngArr) {
        const curLettersCords = [];
        if (!ngArr) {
            curLettersCords.push(this.findFirstLetterCords(matrix, letter))
        } else {
            for (let ngCord of ngArr) {
                const x = ngCord[0];
                const y = ngCord[1];
                if (matrix[x][y] === letter && !this.wordCheckMatrix[x][y]) {
                    curLettersCords.push([x, y]);
                }
            }
        }

        if (!curLettersCords.length) {
            if (this.iteration === 0) {
                return console.log('no word found');
            } else {
                return false;
            }
        }

        for (let letterCord of curLettersCords) {
            const x = letterCord[0];
            const y = letterCord[1];
            this.wordCheckMatrix[x][y] = 1;
            this.wordCords.push([x, y]);
            if (this.iteration === this.str2Arr.length - 1) {
                return true;
            }
            const ng = this.getNeighboursCords([x, y], matrix.length);
            this.iteration++;
            if (this.findLetterCord(this.str2Arr[this.iteration], matrix, ng)) {
                return true
            } else {
                this.iteration--;
                this.wordCheckMatrix[x][y] = 0;
                this.wordCords.pop();
            }

        }

        return console.log('no word found');

    }

    findWordCords() {
        this.createCheckMatrix();
        const a = this.findLetterCord(this.str2Arr[0], this.str1Arr);
        if (a) {
            return this.wordCords;
        }
    }

    find() {
        return this.findWordCords();
    }

}