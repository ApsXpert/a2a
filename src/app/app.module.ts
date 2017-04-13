import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {RecaptchaNoFormsModule} from 'ng2-recaptcha/recaptcha/recaptcha-noforms.module';
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {footerRoutes} from './footer/footerlinks.routes';
import {ConnectionDataResolver} from "./connection/connection_resolver.service";
import {ConnectionModule} from "./connection/connection.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AuthModule} from "./auth/auth.module";
import {AppCommonModule} from "./common/common.module";
import {VerticalModule} from "./vertical/vertical.module";
import {
    FdsErrorHandler, LOGGING_ERROR_HANDLER_PROVIDERS,
    LOGGING_ERROR_HANDLER_OPTIONS
} from "./utils/fds-error-handler";
import {FdsErrorService} from "./utils/fds-error.service";
import {LogoutService} from "./services/logout.service";
import {LogoutEmitterService} from "./services/logout_emmiter.service";
import {AppEventEmitterService} from "./services/app-event-emitter.service";
import {AppEventHandlerService} from "./services/app-event-handler.service";
import {ErrorComponent} from "./error/error.component";

@NgModule({
    imports: [
        BrowserModule,
        ConnectionModule,
        HttpModule,
        FormsModule,
        DashboardModule,
        AuthModule,
        AppCommonModule,
        VerticalModule,
        RecaptchaNoFormsModule.forRoot(),
        RouterModule.forRoot([
            {path: 'error', component: ErrorComponent},
            ...footerRoutes,
            {path: '**', redirectTo: '/dashboard'}

        ], {useHash: true})
    ],
    declarations: [
        AppComponent,
        ErrorComponent
    ],
    providers: [
        LogoutEmitterService, LogoutService,
        ConnectionDataResolver, FdsErrorService,
        AppEventEmitterService, AppEventHandlerService,
        // LOGGING_ERROR_HANDLER_PROVIDERS,
        // {
        //     provide: LOGGING_ERROR_HANDLER_OPTIONS,
        //     useValue: {
        //         rethrowError: false,
        //         unwrapError: false
        //     }
        // },
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
