import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    { //调解员 
      name: '矛盾纠纷处置',
      path: '/mediator',
      component: './mediator',
    },
    { //调解员 
      name: '事件办理',
      path: '/handle',
      component: './mediator/handle',
    },
    { //调解员 
      name: '事件详情',
      path: '/mediator/detail',
      component: './mediator/detail',
    },
    { //登记员
      name: '矛盾纠纷上报',
      path: '/registrar',
      component: './registrar',
    },
  ],
  npmClient: 'npm',
  proxy: {
    '/api': {
      target: 'https://eeds.eedssszcs.com:10075',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
      secure: false,  // 忽略自签名证书（仅开发环境）
    },
  },
});

