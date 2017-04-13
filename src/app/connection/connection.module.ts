/**
 * Created by Javed on 1/6/2017.
 */
import { NgModule } from '@angular/core';
import { ConnectionComponent }   from './connection.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {FormsModule}    from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {ConnectionService} from "./connection.service";
import {DoctorSearchComponent} from "./search.doctor.component";

import {ConnectionRoutingModule} from "./connection-routing.module";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAlCepmEXwdze82snRBNa45KPMvVj4TxaI'
        }),
        ConnectionRoutingModule
    ],
    exports: [],
    declarations: [ConnectionComponent, DoctorSearchComponent],
    providers: [ConnectionService],
})
export class ConnectionModule {}

