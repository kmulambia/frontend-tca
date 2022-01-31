
export default () => {
  return {
    admin: [
      {
        title: 'home',
        icon: "home",
        path: "/admin/home",
      },
      {
        title: 'users',
        icon: "person",
        path: "/admin/users",
      }
    ],
    manager: [
      {
        title: 'home',
        icon: "home",
        path: "/manager/home",
      },
    ],
    user: [
      {
        title: 'home',
        icon: "home",
        path: "/user/home",
      },
      {
        title: 'reporting',
        icon: "text_snippet",
        path: "/user/reporting",
      },
      {
        title: 'response (5Ws)',
        icon: "medical_services",
        path: "/user/response",
      },
    ],
    options: [
      {
        title: "settings",
        icon: "settings",
        path: "/settings",
      },
      {
        title: "help",
        icon: "help",
        path: "/help",
      },
      {
        title: "about",
        icon: "info",
        path: "/about",
      }
    ]
  }
}
