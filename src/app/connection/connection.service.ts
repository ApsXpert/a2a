/**
 * Created by Javed on 1/10/2017.
 */
import { Injectable } from '@angular/core';
import {uStatePaths} from './states.svg.path';
@Injectable()
export class ConnectionService {
    public yearsInData:number[] = [];
    public states = uStatePaths;

    constructor() {

        for (let i = 2000; i <= 2016; i++) {
            this.yearsInData.push(i);
        }
    }

}