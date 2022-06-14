import { createComponentInstance, setupComponent } from './component';

export function render(vnode, container) {
    // patch
    patch(vnode, container);
}

function patch(vnode, container) {
    // 处理组件
    // 1.判断我们额vnode是不是一个element/component
    processElement();
    // 去处理我们的组件
    processComponent(vnode, container);
}
function processElement() {}

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
    const subTree = instance.render();

    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container);
}
