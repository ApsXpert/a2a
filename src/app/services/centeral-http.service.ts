/**
 * Created by Atif on 1/23/2017.
 */

import {Injectable} from '@angular/core';
import {AppDataService} from "./app_data.service";
import {HttpService} from "./HttpService";
import {Response} from "@angular/http";

@Injectable()
export class CenteralHttpService {


    constructor(private appService: AppDataService, private httpService: HttpService) {}

    public get(url: string) {
        return this.httpService.httpGet(url)
            .map((res: Response) => {
                return res.json();
            });
    }

    public post(url: string, body: any) {
        let _body = JSON.stringify(body);
        return this.httpService.httpPost(url, _body )
            .map((res: Response) => {
                return res.json();
            });
    }

    public multipleGet(urls: string[]) {
        return this.httpService.multipleHttpGet(urls);
    }

    public multiplePost(urls: string[], body: any) {
        let _body = JSON.stringify(body);
        return this.httpService.multipleHttpPost(urls, _body);
    }


}