import { Routes } from "@angular/router";
import { SalesHistoryComponent } from "./pages/sales-history/sales-history.component";
import { SalesComponent } from "./sales.component";

export const INVENTORY_ROUTES: Routes = [
    {path:'', component:SalesComponent},
    {path:'historial-ventas', component:SalesHistoryComponent},
];