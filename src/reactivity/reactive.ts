import { mutableHandler, readonlyHandler } from './baseHandler';
function createActiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers);
}

export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly',
}

export function reactive(raw) {
    return createActiveObject(raw, mutableHandler);
}
export function readonly(raw) {
    return createActiveObject(raw, readonlyHandler);
}

export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadOnly(value) {
    return !!value[ReactiveFlags.IS_READONLY];
}
