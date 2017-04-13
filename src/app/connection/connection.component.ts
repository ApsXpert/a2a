/**
 * Created by Javed on 1/5/2017.
 */
import { Component, OnInit ,ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { BrowserModule } from '@angular/platform-browser';
import {ConnectionService} from "./connection.service";

declare var d3:any;

/*const map: any = {
 uStatePaths: './states.svg.path'
 };*/

@Component({
    // moduleId: module.id,
    selector: 'connection',
    templateUrl: 'connection.component.html',
    styleUrls: ['states.css']
})
export class ConnectionComponent implements OnInit {
    public  lat:number;
    public lng:number;

    //  public yearsInData: number[] = [];
    //  public states : Array[] = [];
    /**
     * Constructor
     * @param ar
     * @param eltRef
     * @param connctionService
     */
    constructor(private ar:ActivatedRoute, private eltRef:ElementRef, private connctionService:ConnectionService) {
    }
    /**
     * Implementation of OnInit Interface function ngOnInit.
     */
    ngOnInit() {
        this.lat = 51.678418;
        this.lng = 7.809007;

        /*  for (let i = 2000; i <= 2016; i++) {
         this.yearsInData.push(i);
         }*/
        //console.log(this.ar.snapshot.data['connectionData']);
    }
    /**
     *
     */
    ngAfterViewInit() {

        function draw(id:any, data:any, toolTip:any) {
            function mouseOver(d:any) {
                d3.select("#tooltip").transition().duration(200).style("opacity", .9);

                d3.select("#tooltip").html(toolTip(d.n, data[d.id]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            }

            function mouseOut() {
                d3.select("#tooltip").transition().duration(500).style("opacity", 0);
            }

            function mouseClick(data:any) {
                console.dir('ss' + data.n);
            }

            d3.select(id).selectAll(".state")
                .data(this.connctionService.uStatePaths).enter().append("path").attr("class", "state")
                .attr("d", function (d:any) {
                    return d.d;
                })
                .style("fill", function (d:any) {
                    return data[d.id].color;
                })

                .on("mouseover", mouseOver).on("mouseout", mouseOut)
                .on("click", mouseClick);
        }


        function tooltipHtml(n:any, d:any) {    /* function to create html content string in tooltip div. */
            return "<h4>" + n + "</h4><table>" +
                "<tr><td>Low</td><td>" + (d.low) + "</td></tr>" +
                "<tr><td>Average</td><td>" + (d.avg) + "</td></tr>" +
                "<tr><td>High</td><td>" + (d.high) + "</td></tr>" +
                "</table>";
        }

        var sampleData = {};
        /* Sample random data. */
        ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
            "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
            "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
            "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
            "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
            .forEach(function (d:any) {
                var low = Math.round(100 * Math.random()),
                    mid = Math.round(100 * Math.random()),
                    high = Math.round(100 * Math.random());
                sampleData[d] = {
                    low: d3.min([low, mid, high]), high: d3.max([low, mid, high]),
                    avg: Math.round((low + mid + high) / 3), color: d3.interpolate("#ffffcc", "#800026")(low / 100)
                };
            });
        /* draw states on id #statesvg */
        draw("#statesvg", sampleData, tooltipHtml);
        d3.select(self.frameElement).style("height", "600px");


    }

}