function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
    };
    return component;
}
function setupComponent(instance) {
    // todo
    // initProps()
    // initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var component = instance.type;
    var setup = component.setup;
    if (setup) {
        var setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var component = instance.type;
    if (component.render) {
        instance.render = component.render;
    }
}

var isObject = function (val) {
    return val !== null && typeof val === 'object';
};

function render(vnode, container) {
    // patch
    patch(vnode, container);
}
function patch(vnode, container) {
    // 处理组件
    // 1.判断我们额vnode是不是一个element/component
    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    } else if (isObject(vnode.type)) {
        debugger;
        // 去处理我们的组件
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    var el = document.createElement(vnode.type);
    var children = vnode.children;
    if (typeof children === 'string') {
        el.textContent = children;
    } else if (Array.isArray(children)) {
        mountChildren(children, el);
    }
    var props = vnode.props;
    for (var key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            debugger;
            var element = props[key];
            el.setAttribute(key, element);
        }
    }
    container.append(el);
}
function mountChildren(children, container) {
    children.forEach(function (child) {
        patch(child, container);
    });
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    // 创建组件实例
    var instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render();
    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container);
}

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children,
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            // 先转成虚拟节点
            // component -> vnode
            debugger;
            var vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}

/**
 * h 方法是为了创建虚拟节点
 * @param {*} type
 * @param {*} props
 * @param {*} children
 * @returns
 */
function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };