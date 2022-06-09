import { render } from './render';
import { createVNode } from './vnode';

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先转成虚拟节点
            // component -> vnode
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}
