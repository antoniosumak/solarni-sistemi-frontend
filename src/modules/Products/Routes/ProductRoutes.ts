import { RouteRecordRaw } from 'vue-router';
import Index from '../Pages/Index.vue';
import Create from '../Pages/Create.vue';
import Edit from '../Pages/Edit.vue';

export function createProductIndexRoute(): RouteRecordRaw {
  return {
    name: 'products',
    path: '/products',
    component: Index,
    meta: {
      id: 'productsIndex',
      label: 'Proizvodi i usluge',
      icon: 'ShoppingCartIcon',
      showInNavigation: true,
    },
  };
}

export function createProductCreateRoute(): RouteRecordRaw {
  return {
    name: 'createProduct',
    path: '/products/create',
    component: Create,
    meta: {
      showInNavigation: false,
    },
  };
}

export function createProductEditRoute(): RouteRecordRaw {
  return {
    name: 'editProduct',
    path: '/products/:id/edit',
    component: Edit,
    meta: {
      showInNavigation: false,
    },
  };
}
