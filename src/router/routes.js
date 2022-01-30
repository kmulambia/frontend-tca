import { SessionStorage } from "quasar";
const serial = process.env.SERIAL;

const routes = [
  //Root
  {
    path: '/',
    component: () => import('layouts/plain.layout.vue'),
    children: [
      {
        path: "",
        redirect: "/signin"
      },
      {
        path: '/signin',
        component: () => import('pages/signin.page.vue'),
      },
      {
        path: '/signup',
        component: () => import('pages/signup.page.vue'),
      },
      {
        path: '/forgot-password',
        component: () => import('pages/forgot-password.page.vue'),
      },
      {
        path: '/reset-password',
        component: () => import('pages/reset-password.page.vue'),
      }
    ]
  },
  //Admin
  {
    path: '/admin',
    component: () => import('layouts/admin.layout.vue'),
    children: [
      {
        path: '/admin',
        redirect: '/admin/home',
      },
      {
        path: '/admin/home',
        component: () => import('pages/admin/home/index.page.vue'),
      },
      //USERS
      {
        path: '/admin/users',
        component: () => import('pages/admin/users/index.page.vue'),
      },
      {
        path: '/admin/users/edit/:id',
        component: () => import('pages/admin/users/edit.page.vue'),
      },
      {
        path: '/admin/users/logs/:id',
        component: () => import('pages/admin/users/logs.page.vue'),
      },
      //SETTINGS
      {
        path: '/admin/settings',
        component: () => import('pages/admin/settings/index.page.vue'),
      },
      //OTHERS
      {
        path: '/admin/help',
        component: () => import('pages/help.page.vue'),
      },
      {
        path: '/admin/about',
        component: () => import('pages/about.page.vue'),
      },

    ],
    beforeEnter: (to, from, next) => {
      let role = SessionStorage.getItem(serial + "-ROLE");
      if (SessionStorage.has(serial + "-JWT") == true && role.name == "admin") {
        next();
      } else {
        next("/signin");
      }
    }
  },


  //User
  {
    path: '/user',
    component: () => import('layouts/user.layout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/home',
      },
      {
        path: '/user/home',
        component: () => import('pages/user/home/index.page.vue'),
      },

      //Reporting
      {
        path: '/user/reporting',
        component: () => import('pages/user/reporting/index.page.vue'),
      },
      //Response

      {
        path: '/user/response',
        component: () => import('pages/user/response/index.page.vue'),
      },


      //SETTINGS
      {
        path: '/user/settings',
        component: () => import('pages/user/settings/index.page.vue'),
      },
      //OTHERS
      {
        path: '/user/help',
        component: () => import('pages/help.page.vue'),
      },
      {
        path: '/user/about',
        component: () => import('pages/about.page.vue'),
      },

    ],
    beforeEnter: (to, from, next) => {
      let role = SessionStorage.getItem(serial + "-ROLE");
      if (SessionStorage.has(serial + "-JWT") == true && role.name == "user") {
        next();
      } else {
        next("/signin");
      }
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Errors/404.error.vue')
  }
]

export default routes
