import { RouteRecordRaw } from 'vue-router';
import Index from '../Pages/Index.vue';
import Create from '../Pages/Create.vue';
import Details from '../Pages/Details.vue';
import AddProduct from '../Pages/AddProduct.vue';
import Edit from '../Pages/Edit.vue';

export function createProjectIndexRoute(): RouteRecordRaw {
  return {
    name: 'projects',
    path: '/projects',
    component: Index,
    meta: {
      id: 'projectsIndex',
      label: 'Projekti',
      icon: 'ArchiveIcon',
      showInNavigation: true,
    },
  };
}

export function createProjectCreateRoute(): RouteRecordRaw {
  return {
    name: 'createProject',
    path: '/projects/create',
    component: Create,
    meta: {
      showInNavigation: false,
    },
  };
}

export function createProjectDetailsRoute(): RouteRecordRaw {
  return {
    name: 'projectDetails',
    path: '/projects/:id/details',
    component: Details,
    meta: {
      showInNavigation: false,
    },
  };
}

export function createProjectEditRoute(): RouteRecordRaw {
  return {
    name: 'editProject',
    path: '/projects/:id/edit',
    component: Edit,
    meta: {
      showInNavigation: false,
    },
  };
}

export function createProjectAddProductRoute(): RouteRecordRaw {
  return {
    name: 'projectAddProduct',
    path: '/projects/:id/products/add',
    component: AddProduct,
    meta: {
      showInNavigation: false,
    },
  };
}
