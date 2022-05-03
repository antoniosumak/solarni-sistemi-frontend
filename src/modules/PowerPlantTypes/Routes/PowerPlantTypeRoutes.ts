import { RouteRecordRaw } from 'vue-router';
import Index from '../Pages/Index.vue';
import Create from '../Pages/Create.vue';
import Edit from '../Pages/Edit.vue';

export function createPowerPlantTypeIndexRoute(): RouteRecordRaw {
  return {
    name: 'powerPlantTypes',
    path: '/power-plant-types',
    component: Index,
    meta: {
      id: 'powerPlantTypesIndex',
      label: 'Tipovi elektrana',
      icon: 'LightningBoltIcon',
      showInNavigation: true,
    },
  };
}

export function createPowerPlantTypeCreateRoute(): RouteRecordRaw {
  return {
    name: 'createPowerPlantType',
    path: '/power-plant-types/create',
    component: Create,
    meta: {
      showInNavigation: false,
    },
  };
}

export function createPowerPlantTypeEditRoute(): RouteRecordRaw {
  return {
    name: 'editPowerPlantType',
    path: '/power-plant-types/:id/edit',
    component: Edit,
    meta: {
      showInNavigation: false,
    },
  };
}
