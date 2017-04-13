/**
 * Created by Javed on 1/4/2017.
 */
import {Routes} from '@angular/router';
import {FooterLinksComponent} from './footerlinks.component';
import {AuthGuard} from '../services/auth_gaurd.service';


export const footerRoutes: Routes =<Routes> [
    {
        path: 'faq', component: FooterLinksComponent,
        data: {
            pp: false,
            toc: false,
            faq: true
        }
    },
    {
        path: 'toc', component: FooterLinksComponent,
        data: {
            pp: false,
            toc: true,
            faq: false
        }
    },
    {
        path: 'pp', component: FooterLinksComponent,
        data: {
            pp: true,
            toc: false,
            faq: false
        }
    }

];