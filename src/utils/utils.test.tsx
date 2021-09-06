import { getMaxAndMinValues } from './utils';

test('getMaxAndMinValues with object {min,max}', () => {
    const filter = { min: 10, max: 100 };
    const maxAndMin = getMaxAndMinValues(filter);
    expect(filter.min).toBe(maxAndMin.min);
});

test('getMaxAndMinValues with array of values', () => {
    const filter = [1, 2, 3, 4, 5, 6];
    const maxAndMin = getMaxAndMinValues(filter);
    expect(filter[0]).toBe(maxAndMin.min);
    expect(filter[filter.length - 1]).toBe(maxAndMin.max);
});
