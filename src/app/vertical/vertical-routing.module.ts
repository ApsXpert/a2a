import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../services/auth_gaurd.service";
import {VerticalDataResolver} from "./vertical_resolver.service";
import {VerticalComponent} from "./vertical.component";
import {VerticalDetailComponent} from "./vertical-detail/vertical-detail.component";
import {VerticalDetailDataResolver} from "./vertical-detail/vertical-detail-resolver.service";
import {VerticalListDataResolver} from "./vertical-list/vertical-list-resolver.service";
import {VerticalListComponent} from "./vertical-list/vertical-list.component";
import {PreviousRouteRecorder} from "../services/deactive.service";

const axiomaticRoutes: Routes = [

    {
        path: 'axiomatic/:id/:year', component: VerticalComponent, pathMatch: 'full',
        canActivate: [AuthGuard],
        canDeactivate: [PreviousRouteRecorder],
        resolve: {
            axiomaticData: VerticalDataResolver
        }
    },
    {
        path: 'axiomatic/:moduleId', component: VerticalComponent, pathMatch: 'full',
        canActivate: [AuthGuard],
        canDeactivate: [PreviousRouteRecorder],
        resolve: {
            axiomaticData: VerticalDataResolver
        }
    },
    {
        path: 'impossible/:moduleId', component: VerticalComponent, pathMatch: 'full',
        canActivate: [AuthGuard],
        canDeactivate: [PreviousRouteRecorder],
        resolve: {
            axiomaticData: VerticalDataResolver
        }
    },
    {
        path: 'statistical/:moduleId', component: VerticalComponent, pathMatch: 'full',
        canActivate: [AuthGuard],
        canDeactivate: [PreviousRouteRecorder],
        resolve: {
            axiomaticData: VerticalDataResolver
        }
    },
    {
        path: 'vertical',
        children: [
            {
                path: 'list', component: VerticalListComponent, pathMatch: 'full',
                canActivate: [AuthGuard],
                canDeactivate: [PreviousRouteRecorder],
                resolve: {
                    vlData: VerticalListDataResolver
                }
            },
            {
                path: 'detail/:dos', component: VerticalDetailComponent, pathMatch: 'full',
                canActivate: [AuthGuard],
                canDeactivate: [PreviousRouteRecorder],
                resolve: {
                    vdData: VerticalDetailDataResolver
                }
            },
            {
                path: 'detail', component: VerticalDetailComponent, pathMatch: 'full',
                canActivate: [AuthGuard],
                canDeactivate: [PreviousRouteRecorder],
                resolve: {
                    vdData: VerticalDetailDataResolver
                }
            },
            {
                path: 'detail/full/:flag', component: VerticalDetailComponent, pathMatch: 'full',
                canActivate: [AuthGuard],
                canDeactivate: [PreviousRouteRecorder],
                resolve: {
                    vdData: VerticalDetailDataResolver
                }
            }

        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(axiomaticRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class VerticalRoutingModule {
}
