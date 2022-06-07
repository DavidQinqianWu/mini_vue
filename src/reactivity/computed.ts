import { ReactiveEffect } from './effect';

class ComputedRefImp {
    private _getter: () => void;
    private _dirty: boolean = true;
    private _value: any;
    _effect: ReactiveEffect;
    constructor(getter) {
        this._getter = getter;

        this._effect = new ReactiveEffect(getter, () => {
            if (!this._dirty) {
                this._dirty = true;
            }
        });
    }

    get value() {
        // get
        // get value -> dirty true
        if (this._dirty) {
            this._dirty = false;
            this._value = this._effect.run();
        }
        return this._value;
    }
}

export function computed(getter) {
    return new ComputedRefImp(getter);
}
