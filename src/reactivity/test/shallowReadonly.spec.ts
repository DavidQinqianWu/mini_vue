import { isReadOnly, shallowReadonly } from '../reactive';

describe('shallowReadonly', () => {
    test('should note make non-reactive properties readonly', () => {
        const props = shallowReadonly({ n: { foo: 1 } });
        expect(isReadOnly(props)).toBe(true);
        expect(isReadOnly(props.n)).toBe(false);
    });
});
