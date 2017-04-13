/**
 * Created by Atif on 1/24/2017.
 */

import { Injectable } from '@angular/core';
import {APP} from "../../constants/app.constants";

@Injectable()
export class VerticalModuleService {

    public stateData: any = {
        yearOption: true,
        monthOption: true,
        dayOption: true,
        day: 9,
        month: 1,
        year: 2015,
        filterOption: APP.FILTER_OPTIONS.DAY,
        moduleId: -1,
        sectionId: 0,
        paramYear: 2015,
        firstGraph: true,
        secondGraphRequest: {},
        firstGraphRequest: {},
        pageRefresh: {},
        currentModuleName: APP.DATA.EMPTY,
        currentModuleId: 0,
        visitOption: 1
    };

    public monthDays = APP.MONTH_DAYS;
    public months = APP.MONTHS_NAME;

    constructor() { }

}