export const links = [
  {
    name: "Dashboard",
    path: "dashboard",
    isRequireAuth: true,
    icon: "mdi:view-dashboard-edit",
  },
  {
    pages: [
      {
        name: "Inventory",
        path: "inventory",
        isRequiresAuthentication: true,
        component: "",
        icon: "material-symbols:inventory-2",
      },
      {
        name: "Delivery",
        path: "delivery",
        isRequiresAuthentication: true,
        component: "",
        icon: "mdi:truck",
      },
      {
        name: "Credits",
        path: "credits",
        isRequiresAuthentication: true,
        component: "",
        icon: "mdi:credit-card",
      },
      {
        name: "Customers",
        path: "customers",
        isRequiresAuthentication: true,
        component: "",
        icon: "mdi:people-group",
      },
      {
        name: "Employees",
        path: "employees",
        isRequiresAuthentication: true,
        component: "",
        icon: "clarity:employee-group-solid",
      },
      {
        name: "Schedules",
        path: "schedules",
        isRequiresAuthentication: true,
        component: "",
        icon: "grommet-icons:schedules",
      },
      {
        name: "Reports",
        path: "reports",
        isRequiresAuthentication: true,
        component: "",
        icon: "material-symbols:insert-chart-rounded",
      },

      // "bi:shop"
      // {
      //   name: "Shop",
      //   path: "shop",
      //   isRequiresAuthentication: true,
      //   component: "",
      //   icon: "mdi:shop-alert",
      // },
    ],
  },
];
