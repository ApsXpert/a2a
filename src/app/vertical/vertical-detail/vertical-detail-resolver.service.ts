import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {URL} from '../../constants/constant.urls';
import {HttpService} from "../../services/HttpService";
import {VerticalDetailService} from "./vertical-detail.service";
import {CommonFunctionService} from "../../common/common-functions.service";
import {VerticalService} from "../vertical.service";
import {AppDataService} from "../../services/app_data.service";
import {APP} from "../../constants/app.constants";

@Injectable()
export class VerticalDetailDataResolver implements Resolve<any> {

    constructor(private _httpService: HttpService, private vdService: VerticalDetailService, private router: Router,
                private verticalService: VerticalService, private appDataService: AppDataService) {
    }

    /**
     * This method is called automatically to resolve the data
     * @returns {any}
     */
    public resolve() {


        this.appDataService.loadingFlag = true;
        let serviceData = this.vdService.vdRequest;
        let storageData = localStorage.getItem(APP.STORAGE.VERTICAL_DETAIL);

        if (CommonFunctionService.isEmpty(serviceData) && (!storageData)) {
            this.router.navigate([APP.NAVIGATION.DASHBOARD]);
            return;
        }
        let postBody: any;
        if (CommonFunctionService.isEmpty(serviceData) && storageData) {
            postBody = JSON.parse(storageData);
            this.vdService.vdRequest = postBody;
        }
        this.vdService.vdRequest.moduleId = this.verticalService.getModuleId();
        this.vdService.vdRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vdService.vdRequest.pagination = APP.DATA.EMPTY;
        this.vdService.vdRequest.orderBy = APP.DATA.EMPTY;
        postBody = JSON.stringify(this.vdService.vdRequest);
        let urls = this.getUrls(this.vdService.vdRequest.sectionId);
        return this._httpService.multipleHttpPost(urls, postBody);
    }

    /**
     * This method return urls on the basis of current algo
     * @param algoId
     * @returns {any}
     */
    private getUrls(algoId: number) {

        let urls: any;
        switch (+algoId) {

            case +APP.ALGOS.FULL_SERIES_XRAYS:
                urls = [URL.DOCTOR_DETAIL, URL.FSX.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY, URL.FSX.DOCTOR_REPORTS,
                    URL.FSX.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PATIENT_IN_CHAIR:
                urls = [URL.DOCTOR_DETAIL, URL.PATIENT_IN_CHAIR.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.PATIENT_IN_CHAIR.DOCTOR_REPORTS, URL.PATIENT_IN_CHAIR.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO,
                    URL.PATIENT_IN_CHAIR.PROCEDURE_COUNT];
                break;
            case +APP.ALGOS.CROWN_BUILD_UP:
                urls = [URL.DOCTOR_DETAIL, URL.CROWN_BUILD_UP.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY, URL.CROWN_BUILD_UP.DOCTOR_REPORTS,
                    URL.CROWN_BUILD_UP.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.DOCTOR_WITH_PATIENT:
                urls = [URL.DOCTOR_DETAIL, URL.DOCTOR_WITH_PATIENT.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.DOCTOR_WITH_PATIENT.DOCTOR_REPORTS, URL.DOCTOR_WITH_PATIENT.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO,
                    URL.DOCTOR_WITH_PATIENT.PROCEDURE_COUNT];
                break;
            case +APP.ALGOS.OVERREACTIVE:
                urls = [URL.OVER_ACTIVE.DOCTOR_DETAILS, URL.OVER_ACTIVE.DOCTOR_STATS,
                    URL.OVER_ACTIVE.DOCTOR_SPECIALTY, URL.OVER_ACTIVE.DOCTOR_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.MULTI_DOCTOR:
                urls = [URL.DOCTOR_DETAIL, URL.MULTIPLE_LOCATIONS.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.MULTIPLE_LOCATIONS.DOCTOR_REPORTS, URL.MULTIPLE_LOCATIONS.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.COMPREHENSIVE_PERIODONTAL_EXAM:
                urls = [URL.DOCTOR_DETAIL, URL.CPE.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.CPE.DOCTOR_REPORTS, URL.CPE.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PERIODONTAL_MAINTENANCE_VS_PROPHY:
                urls = [URL.DOCTOR_DETAIL, URL.SVP.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.SVP.DOCTOR_REPORTS, URL.SVP.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PERIODONTAL_SCALING_VS_PROPHY:
                urls = [URL.DOCTOR_DETAIL, URL.SRP.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.SRP.DOCTOR_REPORTS, URL.SRP.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.THIRD_MOLAR_EXTRACTION:
                urls = [URL.DOCTOR_DETAIL, URL.THIRD_MOLAR.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.THIRD_MOLAR.DOCTOR_REPORTS, URL.THIRD_MOLAR.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PRIMARY_TOOTH_EXTRACTION:
                urls = [URL.DOCTOR_DETAIL, URL.PTE.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.PTE.DOCTOR_REPORTS, URL.PTE.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.RATIO_SIMPLE_TO_COMPLEX_COMPLEX_EXTRACTION:
                urls = [URL.DOCTOR_DETAIL, URL.SCCD.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.SCCD.DOCTOR_REPORTS, URL.SCCD.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.UNJUSTIFIED_SURGICAL_EXTEACTION:
                urls = [URL.DOCTOR_DETAIL, URL.USE_A.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.USE_A.DOCTOR_REPORTS, URL.USE_A.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.IMPOSSIBLE_AGES:
                urls = [URL.DOCTOR_DETAIL, URL.IMPOSSIBLE.DOCTOR_STATS_BY_DOS, URL.DOCTOR_SPECIALTY,
                    URL.IMPOSSIBLE.DOCTOR_REPORTS, URL.IMPOSSIBLE.DOCTOR_PATIENTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.CODE_DISTRIBUTION:
                urls = [URL.STATISTICAL.DOCTOR_REPORTS];
                break;
        }

        return urls;

    }

}
