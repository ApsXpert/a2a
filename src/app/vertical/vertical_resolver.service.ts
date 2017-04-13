import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {HttpService} from "../services/HttpService";
import {URL} from '../constants/constant.urls';
import {APP} from "../constants/app.constants";
import {VerticalModuleService} from "./services/vertical-module.service";

@Injectable()
export class VerticalDataResolver implements Resolve<any> {

    constructor(private _httpService: HttpService, private vmService: VerticalModuleService) {
    }

    /**
     * This is resolver method to resolve data before vertical page load.
     * @param route
     * @returns {any}
     */
    public resolve(route: ActivatedRouteSnapshot) {
        let moduleId = route.params[APP.PARAM.MODULE_ID];

        if (null == moduleId) {
            let sectionId = route.params[APP.PARAM.VERTICAL.SECTION_ID];
            if (sectionId == APP.ALGOS.IMPOSSIBLE_AGES) {
                moduleId = APP.MODULES.IMPOSSIBLE;
            }
            if (null != sectionId) {
                moduleId = APP.MODULES.AXIOMATIC;
            } else {
                moduleId = APP.MODULES.AXIOMATIC;
            }

        }
        this.vmService.stateData.currentModuleId = moduleId;
        let request = {
            moduleId: moduleId
        };
        let requestObj = JSON.stringify(request);
        return this._httpService
            .multipleHttpPost([URL.COMMON_SIDE_MENU_ALGO, URL.DASHBOARD_SIDEMENU], requestObj);
    }
}
