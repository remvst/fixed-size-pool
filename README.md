# Fixed Size Pool

Can be used in cases where a pool with a fixed size is required and few memory allocations are executed.

The pool is backed by a single list whose size never varies.

## Example Usage

```javascript
const FixedSizePool = require('@remvst/fixed-size-pool');

const particlePool = new FixedSizePool(100);

// Insert values
particlePool.add(1);
particlePool.add(2);
particlePool.add(3);

// Dequeue particles
particlePool.remove(); // 1
particlePool.remove(); // 2
particlePool.remove(); // 3
```
