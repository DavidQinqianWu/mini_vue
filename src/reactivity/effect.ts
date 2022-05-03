class ReactiveEffect {
    private _fn: any;

    constructor(fn) {
        this._fn = fn;
    }
    run() {
        return this._fn();
    }
}

export function effect(fn, options?) {
    if (options) {
        const schedular = options.schedular;
    }

    const effect = new ReactiveEffect(fn);
    effect.run();
    return effect.run.bind(effect);
}
