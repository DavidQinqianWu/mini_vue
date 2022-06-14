import { h } from '../../lib/guide-mini-vue.esm.js';

export const App = {
    // .vue
    // <template> </template>
    // render 必须写
    render() {
        return h('div', 'hi, ' + this.msg);
    },

    setup() {
        // composition api
        return {
            msg: 'mini-vue',
        };
    },
};
