import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';

export const LAYOUT_ROUTES: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirección desde la ruta vacía a 'inicio'
    { path: '', component: LayoutComponent, children: [
        { path: 'inventario', loadChildren: () => import('../../inventory/inventory.routes').then(m => m.INVENTORY_ROUTES) },
        {path: 'ventas', loadChildren:() => import('../../sales/sales.routes').then(m => m.INVENTORY_ROUTES)},
        {path:'pedidos', loadChildren:()=>import('../../orders/orders.routes').then(m=> m.ORDER_ROUTES)},
        { path:'dashboard', component:DashboardComponent }
    ]}
];