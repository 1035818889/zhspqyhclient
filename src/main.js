import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App.vue'
import Global from './components/Global.vue'
import '../src/assets/my-style.css'
import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
});
import VueResource from 'vue-resource'
import { Button } from 'vant';
import { List } from 'vant';
import { Cell } from 'vant';
import { NavBar } from 'vant';
import router from './router'
import { Popup } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Row, Col } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Panel } from 'vant';
import { Sticky } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { CellGroup } from 'vant';
import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
} from 'vant';
import { Field } from 'vant';
import { ActionSheet } from 'vant';
import { Toast } from 'vant';
import { Step, Steps } from 'vant';
import { Icon } from 'vant';
import { Tab, Tabs } from 'vant';
import { TreeSelect } from 'vant';
import { Dialog } from 'vant';
import { PullRefresh } from 'vant';
Vue.use(PullRefresh);
Vue.use(Dialog);
Vue.use(TreeSelect);
Vue.use(Tab).use(Tabs);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Step).use(Steps);
Vue.use(VueResource);
Vue.use(ActionSheet);
Vue.use(Field);
Vue.use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton);
Vue.use(router);
Vue.use(List);
Vue.use(Button);
Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Popup);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid).use(GridItem);
Vue.use(Row).use(Col);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Panel);
Vue.use(Sticky);
Vue.use(Collapse).use(CollapseItem);
Vue.use(CellGroup);
Vue.use(require('vue-wechat-title'));

Vue.config.productionTip = false;
Vue.prototype.GLOBAL = Global;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
