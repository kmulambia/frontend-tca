
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
    ],
    options: [
      {
        title: "settings",
        icon: "settings",
        path: "/admin/settings",
      },
      {
        title: "help",
        icon: "help",
        path: "/admin/help",
      },
      {
        title: "about",
        icon: "info",
        path: "/admin/about",
      }
    ]
  }
}
