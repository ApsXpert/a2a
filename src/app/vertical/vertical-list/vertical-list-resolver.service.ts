/**
 * Created by Atif on 1/16/2017.
 */
import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {URL} from '../../constants/constant.urls';
import {HttpService} from "../../services/HttpService";
import {VerticalListService} from "./vertical-list.service";
import {CommonFunctionService} from "../../common/common-functions.service";
import {VerticalService} from "../vertical.service";
import {AppDataService} from "../../services/app_data.service";
import {APP} from "../../constants/app.constants";


@Injectable()
export class VerticalListDataResolver implements Resolve<any> {

    constructor(private _httpService: HttpService, private vlService: VerticalListService,
                private router: Router, private verticalService: VerticalService, private appDataService: AppDataService) {
    }

    /**
     * This method is called automatically by router to resolve the data
     * @returns {any}
     */
    public resolve() {
        this.appDataService.loadingFlag = true;
        let serviceData = this.vlService.vlRequest;
        let storageData = localStorage.getItem(APP.STORAGE.VERTICAL_LIST);
        if (CommonFunctionService.isEmpty(serviceData) && (null == storageData || APP.DATA.EMPTY == storageData)) {
            this.router.navigate([APP.NAVIGATION.DASHBOARD]);
            return;
        }
        let postBody: any;
        if (CommonFunctionService.isEmpty(serviceData) && APP.DATA.EMPTY != storageData) {
            postBody = JSON.parse(storageData);
            this.vlService.vlRequest = postBody;
        }

        this.vlService.vlRequest.moduleId = this.verticalService.getModuleId();
        this.vlService.vlRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vlService.vlRequest.pagination = APP.DATA.EMPTY;
        this.vlService.vlRequest.searchDay = APP.DATA.EMPTY;
        this.vlService.vlRequest.searchIndicator = APP.DATA.EMPTY;
        postBody = JSON.stringify(this.vlService.vlRequest);
        let urls = this.getUrls(this.vlService.vlRequest.sectionId);
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
                urls = [URL.DOCTOR_DETAIL, URL.FSX.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.FSX.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PATIENT_IN_CHAIR:
                urls = [URL.DOCTOR_DETAIL, URL.PATIENT_IN_CHAIR.DOCTOR_STATS, URL.DOCTOR_SPECIALTY,
                    URL.PATIENT_IN_CHAIR.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.CROWN_BUILD_UP:
                urls = [URL.DOCTOR_DETAIL, URL.CROWN_BUILD_UP.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.CROWN_BUILD_UP.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.DOCTOR_WITH_PATIENT:
                urls = [URL.DOCTOR_DETAIL, URL.DOCTOR_WITH_PATIENT.DOCTOR_STATS, URL.DOCTOR_SPECIALTY,
                    URL.DOCTOR_WITH_PATIENT.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.OVERREACTIVE:
                urls = [URL.OVER_ACTIVE.DOCTOR_DETAILS, URL.OVER_ACTIVE.DOCTOR_STATS,
                    URL.OVER_ACTIVE.DOCTOR_SPECIALTY, URL.OVER_ACTIVE.DOCTOR_YEARLY_REPORTS,
                    URL.COMMON_SIDE_MENU_ALGO, URL.OVER_ACTIVE.DOCTOR_PATIENTS];
                break;
            case +APP.ALGOS.MULTI_DOCTOR:
                urls = [URL.DOCTOR_DETAIL, URL.MULTIPLE_LOCATIONS.DOCTOR_STATS, URL.DOCTOR_SPECIALTY,
                    URL.MULTIPLE_LOCATIONS.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.COMPREHENSIVE_PERIODONTAL_EXAM:
                urls = [URL.DOCTOR_DETAIL, URL.CPE.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.CPE.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PERIODONTAL_MAINTENANCE_VS_PROPHY:
                urls = [URL.DOCTOR_DETAIL, URL.SVP.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.SVP.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PERIODONTAL_SCALING_VS_PROPHY:
                urls = [URL.DOCTOR_DETAIL, URL.SRP.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.SRP.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.THIRD_MOLAR_EXTRACTION:
                urls = [URL.DOCTOR_DETAIL, URL.THIRD_MOLAR.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.THIRD_MOLAR.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.PRIMARY_TOOTH_EXTRACTION:
                urls = [URL.DOCTOR_DETAIL, URL.PTE.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.PTE.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.RATIO_SIMPLE_TO_COMPLEX_COMPLEX_EXTRACTION:
                urls = [URL.DOCTOR_DETAIL, URL.SCCD.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.SCCD.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.UNJUSTIFIED_SURGICAL_EXTEACTION:
                urls = [URL.DOCTOR_DETAIL, URL.USE_A.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.USE_A.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
            case +APP.ALGOS.IMPOSSIBLE_AGES:
                urls = [URL.DOCTOR_DETAIL, URL.IMPOSSIBLE.DOCTOR_STATS, URL.DOCTOR_SPECIALTY, URL.IMPOSSIBLE.DOCTOR_YEARLY_REPORTS, URL.COMMON_SIDE_MENU_ALGO];
                break;
        }

        return urls;

    }

}
