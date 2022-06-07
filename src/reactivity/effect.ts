import { extend } from '../shared';

export class ReactiveEffect {
    private _fn: any;
    deps = [];
    // 用来通过stop 来停止触发effect
    active = true;
    onStop?: () => void;
    scheduler?: () => void;
    constructor(fn, scheduler_?) {
        this._fn = fn;
        this.scheduler = scheduler_;
    }
    run() {
        // 1. 会收集依赖
        // shouldTrack来区分
        if (!this.active) {
            return this._fn();
        }

        shouldTrack = true;
        activeEffect = this;

        const result = this._fn();
        // reset
        shouldTrack = false;
        return result;
    }

    stop() {
        if (this.active) {
            cleanupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            this.active = false;
        }
    }
}

function cleanupEffect(effect) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect);
    });
    // 这里就可以清空了
    effect.deps.length = 0;
}

const targetMap = new Map();
export function track(target, key) {
    if (!isTracking()) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }

    let dep: Set<ReactiveEffect> = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    trackEffects(dep);
}

export function trackEffects(dep) {
    // 看看dep 之前有没有添加过, 添加过的话,那么就不添加了
    if (dep.has(activeEffect)) return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
}

export function isTracking() {
    return shouldTrack && activeEffect !== undefined;
}

export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    triggerEffects(dep);
}

export function triggerEffects(dep) {
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    }
}

export function stop(runner) {
    runner.effect.stop();
}

let activeEffect;
let shouldTrack;
export function effect(fn, options: any = {}) {
    const effect = new ReactiveEffect(fn);
    extend(effect, options);

    effect.run();
    const runner: any = effect.run.bind(effect);
    runner.effect = effect;
    return runner;
}
