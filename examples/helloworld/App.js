import { h } from '../../lib/guide-mini-vue.esm.js';

export const App = {
    // .vue
    // <template> </template>
    // render 必须写
    render() {
        return h(
            'div',
            {
                id: 'root',
                class: ['red', 'hard'],
            },
            // 'hi, mini-vue'
            [
                h('p', { class: 'red' }, 'hi'),
                h('p', { class: 'blue' }, 'mini-vue'),
            ]
        );
    },

    setup() {
        // composition api
        return {
            msg: 'mini-vue',
        };
    },
};
