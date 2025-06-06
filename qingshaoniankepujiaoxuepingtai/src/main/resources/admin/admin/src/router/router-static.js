import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'

     import users from '@/views/modules/users/list'
    import dictionary from '@/views/modules/dictionary/list'
    import kechuangzuopin from '@/views/modules/kechuangzuopin/list'
    import kechuangzuopinLiuyan from '@/views/modules/kechuangzuopinLiuyan/list'
    import news from '@/views/modules/news/list'
    import shipin from '@/views/modules/shipin/list'
    import shipinCollection from '@/views/modules/shipinCollection/list'
    import shipinLiuyan from '@/views/modules/shipinLiuyan/list'
    import wenzhang from '@/views/modules/wenzhang/list'
    import wenzhangCollection from '@/views/modules/wenzhangCollection/list'
    import wenzhangLiuyan from '@/views/modules/wenzhangLiuyan/list'
    import yonghu from '@/views/modules/yonghu/list'
    import config from '@/views/modules/config/list'
    import dictionaryKechuangzuopin from '@/views/modules/dictionaryKechuangzuopin/list'
    import dictionaryNews from '@/views/modules/dictionaryNews/list'
    import dictionarySex from '@/views/modules/dictionarySex/list'
    import dictionaryShipin from '@/views/modules/dictionaryShipin/list'
    import dictionaryShipinCollection from '@/views/modules/dictionaryShipinCollection/list'
    import dictionaryWenzhang from '@/views/modules/dictionaryWenzhang/list'
    import dictionaryWenzhangCollection from '@/views/modules/dictionaryWenzhangCollection/list'





//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    } ,{
        path: '/users',
        name: '管理信息',
        component: users
      }
    ,{
        path: '/dictionaryKechuangzuopin',
        name: '作品类型',
        component: dictionaryKechuangzuopin
    }
    ,{
        path: '/dictionaryNews',
        name: '公告类型',
        component: dictionaryNews
    }
    ,{
        path: '/dictionarySex',
        name: '性别',
        component: dictionarySex
    }
    ,{
        path: '/dictionaryShipin',
        name: '视频类型',
        component: dictionaryShipin
    }
    ,{
        path: '/dictionaryShipinCollection',
        name: '收藏表类型',
        component: dictionaryShipinCollection
    }
    ,{
        path: '/dictionaryWenzhang',
        name: '文章类型',
        component: dictionaryWenzhang
    }
    ,{
        path: '/dictionaryWenzhangCollection',
        name: '收藏表类型',
        component: dictionaryWenzhangCollection
    }
    ,{
        path: '/config',
        name: '轮播图',
        component: config
    }


    ,{
        path: '/dictionary',
        name: '字典表',
        component: dictionary
      }
    ,{
        path: '/kechuangzuopin',
        name: '作品信息',
        component: kechuangzuopin
      }
    ,{
        path: '/kechuangzuopinLiuyan',
        name: '作品评论',
        component: kechuangzuopinLiuyan
      }
    ,{
        path: '/news',
        name: '通知公告',
        component: news
      }
    ,{
        path: '/shipin',
        name: '视频信息',
        component: shipin
      }
    ,{
        path: '/shipinCollection',
        name: '视频收藏',
        component: shipinCollection
      }
    ,{
        path: '/shipinLiuyan',
        name: '视频评论',
        component: shipinLiuyan
      }
    ,{
        path: '/wenzhang',
        name: '文章信息',
        component: wenzhang
      }
    ,{
        path: '/wenzhangCollection',
        name: '文章收藏',
        component: wenzhangCollection
      }
    ,{
        path: '/wenzhangLiuyan',
        name: '文章评论',
        component: wenzhangLiuyan
      }
    ,{
        path: '/yonghu',
        name: '用户',
        component: yonghu
      }


    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

export default router;
