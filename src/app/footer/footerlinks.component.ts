/**
 * Created by Javed on 1/4/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './footerlinks.component.html'
})
export class FooterLinksComponent implements OnInit {
    public faq: boolean = false;
    public pp: boolean = false;
    public toc: boolean = false;

    constructor(private ar: ActivatedRoute) {
    }

    ngOnInit() {

        this.pp = this.ar.snapshot.data['pp'];
        this.toc = this.ar.snapshot.data['toc'];
        this.faq = this.ar.snapshot.data['faq'];
    }
}