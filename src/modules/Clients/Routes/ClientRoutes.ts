import { RouteRecordRaw } from 'vue-router';
import Index from '../Pages/Index.vue';
import Create from '../Pages/Create.vue';
import Edit from '../Pages/Edit.vue';

export function createClientIndexRoute(): RouteRecordRaw {
  return {
    name: 'clients',
    path: '/clients',
    component: Index,
    meta: {
      id: 'clientsIndex',
      label: 'Klijenti',
      icon: 'UserGroupIcon',
      showInNavigation: true,
    },
  };
}

export function createClientCreateRoute(): RouteRecordRaw {
  return {
    name: 'createClient',
    path: '/clients/create',
    component: Create,
    meta: {
      showInNavigation: false,
    },
  };
}

export function createClientEditRoute(): RouteRecordRaw {
  return {
    name: 'editClient',
    path: '/clients/:id/edit',
    component: Edit,
    meta: {
      showInNavigation: false,
    },
  };
}
