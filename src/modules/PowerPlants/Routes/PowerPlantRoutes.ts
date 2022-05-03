import { RouteRecordRaw } from 'vue-router';
import Index from '../Pages/Index.vue';
import Create from '../Pages/Create.vue';
import Edit from '../Pages/Edit.vue';

export function createPowerPlantIndexRoute(): RouteRecordRaw {
  return {
    name: 'powerPlants',
    path: '/power-plants',
    component: Index,
    meta: {
      id: 'powerPlantsIndex',
      label: 'Elektrane',
      icon: 'LightningBoltIcon',
      showInNavigation: true,
    },
  };
}

export function createPowerPlantCreateRoute(): RouteRecordRaw {
  return {
    name: 'createPowerPlant',
    path: '/power-plants/create',
    component: Create,
    meta: {
      showInNavigation: false,
    },
  };
}

export function createPowerPlantEditRoute(): RouteRecordRaw {
  return {
    name: 'editPowerPlant',
    path: '/power-plants/:id/edit',
    component: Edit,
    meta: {
      showInNavigation: false,
    },
  };
}
