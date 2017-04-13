import {NgModule}       from '@angular/core';
import {FormsModule}    from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardHelper} from "./dashboard-helper.service";
import {DashboardDataResolver} from "./dashboard_resolver.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        DashboardService,
        DashboardHelper,
        DashboardDataResolver
    ]
})
export class DashboardModule {
}
