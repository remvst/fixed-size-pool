'use strict';

const FixedSizePool = require('../fixed-size-pool');

describe('a fixed size pool', () => {
    it('can be initialized', () => {
        expect(() => new FixedSizePool(123)).not.toThrow();
    });

    it('cannot be initialized with an invalid count', () => {
        expect(() => new FixedSizePool()).toThrow();
        expect(() => new FixedSizePool(0)).toThrow();
        expect(() => new FixedSizePool(-1)).toThrow();
        expect(() => new FixedSizePool('abc')).toThrow();
    });

    it('can be populated', () => {
        const pool = new FixedSizePool(10);
        pool.add(1);
        pool.add(2);
        pool.add(3);
    });

    it('can dequeue', () => {
        const pool = new FixedSizePool(10);
        pool.add(1);
        pool.add(2);
        pool.add(3);

        expect(pool.remove()).toBe(1);
        expect(pool.remove()).toBe(2);
        expect(pool.remove()).toBe(3);
    });

    it('cannot dequeue if empty', () => {
        const pool = new FixedSizePool(10);
        pool.add(1);
        pool.add(2);
        pool.add(3);

        expect(pool.remove()).toBe(1);
        expect(pool.remove()).toBe(2);
        expect(pool.remove()).toBe(3);

        expect(pool.remove()).toBe(null);
    });

    it('cannot add if full', () => {
        const pool = new FixedSizePool(2);
        pool.add(1);
        pool.add(2);

        expect(() => pool.add(3)).toThrow();
    });

    it('will rotate', () => {
        const pool = new FixedSizePool(2);
        pool.add(1);
        pool.add(2);

        expect(pool.remove()).toBe(1);

        pool.add(3);
        expect(pool.remove()).toBe(2);
        expect(pool.remove()).toBe(3);

        pool.add(4);
        pool.add(5);
        expect(pool.remove()).toBe(4);
        expect(pool.remove()).toBe(5);
    });
});
