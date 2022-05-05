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
});
