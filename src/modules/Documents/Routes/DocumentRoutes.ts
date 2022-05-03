import { RouteRecordRaw } from 'vue-router';
import Index from '../Pages/Index.vue';
import Create from '../Pages/Create.vue';

export function createDocumentIndexRoute(): RouteRecordRaw {
  return {
    name: 'documents',
    path: '/documents',
    component: Index,
    meta: {
      id: 'documentsIndex',
      label: 'Dokumenti',
      icon: 'DocumentTextIcon',
      showInNavigation: true,
    },
  };
}

export function createDocumentCreateRoute(): RouteRecordRaw {
  return {
    name: 'createDocument',
    path: '/projects/:id/details/documents/create',
    component: Create,
    meta: {
      showInNavigation: false,
    },
  };
}
