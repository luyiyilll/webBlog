export default [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/',
    name: 'Home',
    alias: '/topics',
    component: () => import('@/views/Home')
  },
  {
    path: '*',
    redirect: '/'
  },

  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/type/:type',
    name: 'Type',
    component: () => import('@/views/type/Type'),
  },
  {
    path: '/users/edit',
    component: () => import('@/views/users/Edit'),
    children: [
      {
        path: '/users/edit',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile'),
        meta: { auth: true }
      },
      {
        path: '/users/edit_avatar',
        name: 'EditAvatar',
        component: () => import('@/views/users/Avatar'),
        meta: { auth: true }
      },
      {
        path: '/users/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password'),
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },

  // Edit
  {
    path: '/articles/:articleId/edit',
    name: 'Edit',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
  // Search
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/Search')
  },

  {
    path: '/:user',
    component: () => import('@/views/articles/Column'),
    children: [
      {
        path: '',
        name: 'Column',
        component: () => import('@/views/articles/List')
      },
      {
        path: '/:user/articles/:articleId/content',
        name: 'Content',
        component: () => import('@/views/articles/Content')
      }
    ]
  },

  /*后台管理*/
  {
    path: '/admin/manage',
    component: () => import('@/views/admin/AdminNav'),
    children: [
      {
        path: '',
        name: 'AdminUser',
        component: () => import('@/views/admin/AdminUser'),
        meta: { auth: true }
      },
      {
        path: '/admin/manage_article',
        name: 'EditAvatar',
        component: () => import('@/views/admin/AdminArticle'),
        meta: { auth: true }
      },
      {
        path: '/admin/manage_comment',
        name: 'AdminComment',
        component: () => import('@/views/admin/AdminComment'),
        meta: { auth: true }
      }
    ]
  },



]