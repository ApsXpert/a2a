import {NgModule}       from '@angular/core';
import {FormsModule}    from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {VerticalRoutingModule} from "./vertical-routing.module";
import {VerticalComponent} from "./vertical.component";
import {VerticalSidebarComponent} from "./vertical-sidebar/vertical-sidebar.component";
import {DatePickerModule} from "ng2-datepicker";
import {RouterModule} from "@angular/router";
import {VerticalService} from "./vertical.service";
import {VerticalDetailComponent} from "./vertical-detail/vertical-detail.component";
import {VerticalDetailService} from "./vertical-detail/vertical-detail.service";
import {VerticalDetailDataResolver} from "./vertical-detail/vertical-detail-resolver.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {VerticalDataResolver} from "./vertical_resolver.service";
import {VerticalListComponent} from "./vertical-list/vertical-list.component";
import {VerticalListDataResolver} from "./vertical-list/vertical-list-resolver.service";
import {VerticalListService} from "./vertical-list/vertical-list.service";
import {CommonFunctionService} from "../common/common-functions.service";
import {VerticalEventEmitterService} from "./event-emitter.service";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {VerticalHandlerService} from "./services/vertical-handler.service";
import {EventHandlerService} from "./event-handler.service";
import {VerticalModuleService} from "./services/vertical-module.service";
import {SidebarModulePipe} from "./pipes/sidebar.pipe";
import {DetailTableDirective} from "./directives/detail-table.directives";

import {
    FSXDetailComponent, PICDetailComponent,
    FSXListComponent, PICListComponent,
    CBUDetailComponent, CBUListComponent,
    DWPDetailComponent, DWPListComponent,
    MDDetailComponent, MDListComponent,
    OverActiveDetailComponent, OvereActiveListComponent,
    CPEDetailComponent, CPEListComponent,
    PMVPDetailComponent, PMVPListComponent,
    PSVPDetailComponent, PSVPListComponent,
    TMEDetailComponent, TMEListComponent,
    PTEDetailComponent, PTEListComponent, SECEListComponent,
    USEDetailComponent, USEListComponent
} from "./axiomatic";
import {DateFormatPipe} from "./pipes/date-formator.pipe";
import {ReviewDatePipe} from "./pipes/date-review-period.pipe";
import {ImpossibleAgesDetailComponent} from "./impossible/detail/impossible-ages-detail.component";
import {ImpossibleAgesListComponent} from "./impossible/list/impossible-ages-list.component";
import {VerticalSidebarService} from "./vertical-sidebar/services/vertical-sidebar.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        VerticalRoutingModule,
        DatePickerModule,
        RouterModule.forChild([]),
        Ng2PaginationModule,
        AutoCompleteModule
    ],
    declarations: [
        VerticalComponent, VerticalSidebarComponent,
        VerticalDetailComponent, VerticalListComponent, SidebarModulePipe,
        DetailTableDirective, FSXDetailComponent,
        PICDetailComponent, FSXListComponent,
        PICListComponent, CBUDetailComponent,
        CBUListComponent, DWPDetailComponent,
        DWPListComponent, MDDetailComponent,
        MDListComponent, OverActiveDetailComponent,
        OvereActiveListComponent, CPEDetailComponent,
        CPEListComponent, PMVPDetailComponent,
        PMVPListComponent, PSVPDetailComponent,
        PSVPListComponent,
        TMEDetailComponent, TMEListComponent,
        PTEDetailComponent, PTEListComponent,
        SECEListComponent,
        USEDetailComponent, USEListComponent,
        DateFormatPipe, ReviewDatePipe, ImpossibleAgesDetailComponent,
        ImpossibleAgesListComponent

    ],
    providers: [VerticalService, VerticalDetailService, VerticalDetailDataResolver,
        VerticalDataResolver, EventHandlerService, VerticalSidebarService,
        VerticalListDataResolver, VerticalListService, CommonFunctionService,
        VerticalEventEmitterService, VerticalHandlerService, VerticalModuleService]
})
export class VerticalModule {
}
