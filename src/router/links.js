export const links = [
  {
    name: "Dashboard",
    path: "dashboard",
    isRequireAuth: true,
    icon: "clarity:home-solid",
  },
  {
    pages: [
      {
        name: "Credits",
        path: "credits",
        isRequiresAuthentication: true,
        component: "",
        icon: "fluent:credit-card-clock-20-regular",
      },
      {
        name: "Delivery",
        path: "delivery",
        isRequiresAuthentication: true,
        component: "",
        icon: "carbon:delivery-truck",
      },
      {
        name: "Inventory",
        path: "inventory",
        isRequiresAuthentication: true,
        component: "",
        icon: "material-symbols:inventory-sharp",
      },
      {
        name: "Customers",
        path: "customers",
        isRequiresAuthentication: true,
        component: "",
        icon: "fluent:people-32-regular",
      },
      {
        name: "Reports",
        path: "reports",
        isRequiresAuthentication: true,
        component: "",
        icon: "icon-park-outline:sales-report",
      },
      {
        name: "Employees",
        path: "employees",
        isRequiresAuthentication: true,
        component: "",
        icon: "fa6-solid:people-roof",
      },
      // "bi:shop"
      {
        name: "Shop",
        path: "shop",
        isRequiresAuthentication: true,
        component: "",
        icon: "bi:shop",
      },
    ],
  },
];
