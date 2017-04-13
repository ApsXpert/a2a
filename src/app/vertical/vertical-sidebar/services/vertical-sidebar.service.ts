/**
 * Created by Atif on 2/14/2017.
 */

import {Injectable} from '@angular/core';
import {APP} from "../../../constants/app.constants";

@Injectable()
export class VerticalSidebarService {

    public algos = APP.ALGOS;
    public date: any;
    public provider: any;
    public algoId: any;
    public results: any[];
    public resultData: any[];
    public procedures: any[];
    public sProcedure: any;

    public updateName(name: any) {
        this.provider = name;
    }

    public updateDOS(dos: any) {
        this.date = dos;
    }
}