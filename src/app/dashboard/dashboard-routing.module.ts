import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../services/auth_gaurd.service";
import {DashboardDataResolver} from "./dashboard_resolver.service";
import {PreviousRouteRecorder} from "../services/deactive.service";

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        canDeactivate: [PreviousRouteRecorder],
        resolve: {
            dashboardData: DashboardDataResolver
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {
}
