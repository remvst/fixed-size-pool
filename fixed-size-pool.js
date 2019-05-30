'use strict';

module.exports = class FixedSizePool {

    constructor(size) {
        if (isNaN(size) || size <= 0) {
            throw new Error('Pool size must be greater than zero');
        }

        this.size = size;
        this.list = new Array(size);
        this.firstItemIndex = 0;
        this.currentLength = 0;
    }

    add(item) {
        if (this.currentLength >= this.size) {
            throw new Error('Pool is full');
        }

        const itemIndex = (this.firstItemIndex + this.currentLength) % this.size;
        this.list[itemIndex] = item;
        this.currentLength++;
    }

    remove() {
        if (this.currentLength === 0) {
            return null;
        }

        const item = this.list[this.firstItemIndex];
        this.list[this.firstItemIndex] = null;
        this.firstItemIndex = (this.firstItemIndex + 1) % this.size;
        this.currentLength--;
        return item;
    }

};
