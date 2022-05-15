import { isReactive, reactive, readonly, isReadOnly } from '../reactive';

describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 };
        const observed = reactive(original);
        const readOnly = readonly(original);
        expect(observed).not.toBe(original);
        expect(observed.foo).toBe(1);
        expect(isReactive(observed)).toBe(true);
        expect(isReactive(original)).toBe(false);
        expect(isReadOnly(readOnly)).toBe(true);
        expect(isReadOnly(original)).toBe(false);
    });

    test('nested reactive', () => {
        const original = {
            nested: {
                foo: 1,
            },
            array: [{ bar: 2 }],
        };

        const observed = reactive(original);
        expect(isReactive(observed.nested)).toBe(true);
        expect(isReactive(observed.array)).toBe(true);
        expect(isReactive(observed.array[0])).toBe(true);
    });
});
