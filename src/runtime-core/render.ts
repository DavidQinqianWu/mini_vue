import { createComponentInstance, setupComponent } from './component';
import { isObject } from '../shared/index';

export function render(vnode, container) {
    // patch
    patch(vnode, container);
}

function patch(vnode, container) {
    // 处理组件
    // 1.判断我们额vnode是不是一个element/component

    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    } else if (isObject(vnode.type)) {
        // 去处理我们的组件
        processComponent(vnode, container);
    }
}

function processElement(vnode, container) {
    mountElement(vnode, container);
}

function mountElement(vnode: any, container) {
    const el = (vnode.el = document.createElement(vnode.type));

    const { children } = vnode;

    if (typeof children === 'string') {
        el.textContent = children;
    } else if (Array.isArray(children)) {
        mountChildren(children, el);
    }

    const { props } = vnode;
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const element = props[key];
            el.setAttribute(key, element);
        }
    }
    container.append(el);
}

function mountChildren(children, container) {
    children.forEach((child) => {
        patch(child, container);
    });
}
function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container);
}

function mountComponent(initialVNode: any, container) {
    // 创建组件实例
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, container, initialVNode);
}
function setupRenderEffect(instance: any, container: any, initialVNode: any) {
    const { proxy } = instance;

    const subTree = instance.render.call(proxy);

    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container);
    // 子树的$el就是当前的VNode
    initialVNode.el = subTree.el;
}
