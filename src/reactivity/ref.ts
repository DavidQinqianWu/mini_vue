import { isTracking, trackEffects, triggerEffects } from './effect';
import { hasChanged, isObject } from '../shared/index';
import { reactive } from './reactive';

/**
 * 总结:
 * ref 主要来用vue中的简单类型的响应式, 如: 1 true '1'
 * 因为简单类型不是obj, 没有办法通过proxy去拦截, 所以需要自己去创建{}, 就是RefImpl
 * 通过get set value来获得操作
 */
class RefImpl {
    private _value: any;
    public dep;
    private _rawValue: any;
    constructor(value) {
        this._rawValue = value;
        this._value = convert(value);
        // 1. 看看 value 是否是一个对象的话, 我们需要把value这个对象转换为object

        this.dep = new Set();
    }
    get value() {
        trackRefValue(this);
        return this._value;
    }
    set value(newValue) {
        // Object.is 用来判断两个值是否相等
        // 两个普通的obj的来对比
        if (hasChanged(newValue, this._rawValue)) {
            // 先修改值
            this._rawValue = newValue;
            this._value = convert(newValue);
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

function convert(value) {
    return isObject(value) ? reactive(value) : value;
}
export function ref(value) {
    return new RefImpl(value);
}
