//这个 就是插件的文件，在这里面配置你需要的组件，组件放在common中。
import header from './header/Header'
import tabs from './tabs/Tabs'
import tabItem from './tabs/TabItem'
import content from './content/Content'
import Scroll from './scroll/Scroll'


// 输出组件
export default {
    //编写插件
    install(Vue){
         console.log(111);
        Vue.component(tabs.name,tabs);
        Vue.component(tabItem.name,tabItem);
        Vue.component(header.name,header);
        Vue.component(content.name,content);
        Vue.component(Scroll.name,Scroll)
        
    }

}

