import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {
  createClientIndexRoute,
  createClientCreateRoute,
  createClientEditRoute,
} from '../../modules/Clients/Routes/ClientRoutes';
import {
  createPowerPlantIndexRoute,
  createPowerPlantCreateRoute,
  createPowerPlantEditRoute,
} from '../../modules/PowerPlants/Routes/PowerPlantRoutes';
import {
  createDocumentIndexRoute,
  createDocumentCreateRoute,
} from '../../modules/Documents/Routes/DocumentRoutes';
import {
  createProductIndexRoute,
  createProductCreateRoute,
  createProductEditRoute,
} from '../../modules/Products/Routes/ProductRoutes';
import {
  createProjectIndexRoute,
  createProjectCreateRoute,
  createProjectDetailsRoute,
  createProjectAddProductRoute,
  createProjectEditRoute,
} from '../../modules/Projects/Routes/ProjectRoutes';
import {
  createPowerPlantTypeIndexRoute,
  createPowerPlantTypeCreateRoute,
  createPowerPlantTypeEditRoute,
} from '../../modules/PowerPlantTypes/Routes/PowerPlantTypeRoutes';
export function getAllRoutes(): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [
    createClientEditRoute(),
    createClientCreateRoute(),
    createClientIndexRoute(),
    createPowerPlantEditRoute(),
    createPowerPlantCreateRoute(),
    createPowerPlantIndexRoute(),
    createDocumentCreateRoute(),
    // createDocumentIndexRoute(),
    createProjectAddProductRoute(),
    createProductEditRoute(),
    createProductCreateRoute(),
    createProductIndexRoute(),
    createProjectEditRoute(),
    createProjectDetailsRoute(),
    createProjectCreateRoute(),
    createProjectIndexRoute(),
    createPowerPlantTypeEditRoute(),
    createPowerPlantTypeCreateRoute(),
    createPowerPlantTypeIndexRoute(),
  ];

  return routes;
}

const router = createRouter({
  history: createWebHistory('/'),
  routes: getAllRoutes(),
});

export default router;
