/**
 * This class contains method to call rest services using Http
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AppResponse} from '../models/app_response';
import {Observable} from 'rxjs/Observable';
import {LogoutService} from "./logout.service";
import {TokenSerivce} from "./token.service";
import {AppDataService} from "./app_data.service";
import {APP} from "../constants/app.constants";

@Injectable()
export class HttpService {

    constructor(private http: Http,private logoutService: LogoutService, private  appService: AppDataService) {}

    /**
     * This method send single http get request
     * @param url
     * @param loadingBarFlag
     * @returns {Observable<R>}
     */
    public httpGet(url: string) {
        let options = new RequestOptions({headers: this.getHeader()});
        return this.http.get(url, options);
    }

    /**
     * This method send single http post requests
     * @param url
     * @param body
     * @param loadingBarFlag
     * @returns {Observable<R>}
     */
    public httpPost(url: string, body: any) {
        let options: any = null;
        if (url.indexOf('login_api') === -1) {
            options = new RequestOptions({headers: this.getHeader()});
        } else {
            options = new RequestOptions({headers: new Headers()});
        }
        return this.http.post(url, body, options);
    }

    /**
     * This method sends multiple async http get request
     * @param urls
     * @returns {any}
     */
    public multipleHttpPost(urls: string[], body: any) {
        let options: any = new RequestOptions({headers: this.getHeader()});
        let observableBatch: any = [];
        for (let url of urls) {
            observableBatch.push(this.http.post(url, body, options).map((res: Response) => res.json()));
        }
        return Observable.forkJoin(observableBatch);
    }

    /**
     * This method sends multiple async http get request
     * @param urls
     * @returns {any}
     */
    public multipleHttpGet(urls: string[]) {
        let options = new RequestOptions({headers: this.getHeader()});
        let observableBatch: any = [];
        for (let url of urls) {
            observableBatch.push(this.http.get(url, options).map((res: Response) => res.json()));
        }
        return Observable.forkJoin(observableBatch);
    }

    /**
     * This method return authentication token from local storage and if there is no token available
     * then it will redirect to login
     * @returns {any}
     */
    private getToken(): string {
        let item = localStorage.getItem(APP.STORAGE.USER_INFO);
        if (null == item || '' === item) {
            this.logoutService.doLogout(APP.MESSAGES.SESSION_EXPIRED);
            return '';
        }
        let data: AppResponse = JSON.parse(item);
        return data.token.token;
    }

    /**
     * This method returns the Headers which is send along evey http request other than login
     * @returns {Headers}
     */
    private getHeader(): Headers {
        let token = this.getToken();
        if(false == TokenSerivce.checkSessionTimeOut()){
            this.logoutService.doLogout(APP.MESSAGES.SESSION_EXPIRED);
            return;
        }
        let header: Headers = new Headers();
        header.append('content-type', 'application/json');
        header.append('Authorization', token);

        return header;
    }

    public getProviders(url: string) {
        let header: Headers = new Headers();
        header.append('Authorization', 'Basic ' + btoa('es_admin:admin123'));
        let options = new RequestOptions({headers: header});
        return this.http.get(url, options)
            .map((res) => {
                return res.json();
            });
    }

}
