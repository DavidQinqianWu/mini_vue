const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
};

export const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        // setupState
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        // $el

        const publicGetter = publicPropertiesMap[key];
        return publicGetter && publicGetter(instance);
    },
};
