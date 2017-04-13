/**
 * Created by Javed on 1/10/2017.
 */
import { Component, OnInit } from '@angular/core';
import {ConnectionService} from "./connection.service";

@Component({
  // moduleId: module.id,
    selector: 'doctorsearch',
    templateUrl: 'search-doctor.component.html'
})
export class DoctorSearchComponent implements OnInit {
    constructor(private connectionService:ConnectionService) {
    }

    ngOnInit() {
    }
}