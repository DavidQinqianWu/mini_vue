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
    const el = document.createElement(vnode.type);
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

function mountComponent(vnode: any, container) {
    // 创建组件实例
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container: any) {
    const { proxy } = instance;

    const subTree = instance.render.call(proxy);

    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container);
}
