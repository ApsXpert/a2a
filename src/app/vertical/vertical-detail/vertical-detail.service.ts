import {Injectable} from '@angular/core';
import {URL} from '../../constants/constant.urls';
import {CenteralHttpService} from "../../services/centeral-http.service";
import {APP} from "../../constants/app.constants";
import {LogoutService} from "../../services/logout.service";
import {AppDataService} from "../../services/app_data.service";
@Injectable()
export class VerticalDetailService {

    public vdcData: any = {
        doctorReports: [],
        topDetail: {},
        doctorDetail: {},
        doctorSpecialty: {},
        patients: {},
        procedure: {},
        count: {},
        pageRefresh: {}
    };
    public vdRequest: any = {};
    public dos = '';
    public doctorAddress: any = [];
    public mAddressFlag: boolean = false;
    public reachedFlag = false;
    public detailFlag = false;

    constructor(private logout: LogoutService, private appDataService: AppDataService) {
    }

    /**
     * This method check response if it is valid or not.
     * @param data
     * @returns {boolean}
     */
    public checkResponse(data: any[]) {
        if (data.length == 5) {
            return ((false == data[0].success || +data[0].statusCode == APP.CODES.UN_AUTHORIZED) || (false == data[1].success || +data[1].statusCode == APP.CODES.UN_AUTHORIZED)
            || (false == data[2].success || +data[2].statusCode == APP.CODES.UN_AUTHORIZED) || (false == data[3].success || +data[3].statusCode == APP.CODES.UN_AUTHORIZED)
            || (false == data[4].success || +data[4].statusCode == APP.CODES.UN_AUTHORIZED));
        } else {
            return false;
        }

    }

    /**
     * This method set the data to service
     * @param data
     */
    public setData(data: any) {

        if (+data.statusCode == 401 || data.success == false) {
            this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
        }

        this.vdcData.doctorReports = data.data;
        if (data.count)
            this.vdcData.count = data.count;

        this.appDataService.loadingFlag = false;
    }

}
