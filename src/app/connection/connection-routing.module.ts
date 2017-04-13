/**
 * Created by Javed on 1/11/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../services/auth_gaurd.service";
import {ConnectionDataResolver} from "../connection/connection_resolver.service";
import {ConnectionComponent} from "../connection/connection.component";


const connectioncRoutes: Routes = <Routes>[

    {
        path: 'connection/:id', component: ConnectionComponent, pathMatch: 'full',
        canActivate: [AuthGuard],
        resolve: {
            connectionData: ConnectionDataResolver
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(connectioncRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ConnectionDataResolver
    ]
})
export class ConnectionRoutingModule { }