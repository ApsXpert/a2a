import 'bootstrap/dist/css/bootstrap.css';
import '../public/css/jquery.jqplot.css';
import 'jquery/dist/jquery.min'
import '../public/graph/jquery.jqplot.min'
import  '../public/graph/jqplot.bubbleRenderer.min'
import  '../public/graph/jqplot.canvasTextRenderer.min'
import  '../public/graph/jqplot.canvasAxisLabelRenderer.min'
import  '../public/graph/jqplot.cursor'
import  '../public/graph/jqplot.highlighter.min'

import '../public/js/d3.v3.min.js'

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app/app.module';
if (process.env.ENV === 'production') {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);