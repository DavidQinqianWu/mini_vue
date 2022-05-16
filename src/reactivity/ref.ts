import { isTracking, trackEffects, triggerEffects } from './effect';
import { hasChanged } from '../shared/index';
class RefImpl {
    private _value: any;
    public dep;
    constructor(value) {
        this._value = value;
        this.dep = new Set();
    }
    get value() {
        trackRefValue(this);
        return this._value;
    }
    set value(newValue) {
        // Object.is 用来判断两个值是否相等

        if (hasChanged(newValue, this._value)) {
            // 先修改值
            this._value = newValue;
            // 再去通知改变
            triggerEffects(this.dep);
        }
    }
}

function trackRefValue(ref) {
    if (isTracking()) {
        trackEffects(ref.dep);
    }
}

export function ref(value) {
    return new RefImpl(value);
}
