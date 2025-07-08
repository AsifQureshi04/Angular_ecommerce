import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/productService';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { Search } from './components/search/search';
import { ProductDetails } from './components/product-details/product-details';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CardStatus } from './components/card-status/card-status';
import { CartDetail } from './components/cart-detail/cart-detail';
import { Checkout } from './components/checkout/checkout';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageDefinitions } from './components/language-definitions/language-definitions';
import { Sidebar } from './components/sidebar/sidebar';
import { LanguageData } from './services/language-data';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { Login } from './components/login/login';
import { LoginStatus } from './components/login-status/login-status';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
// import { MatIconModule } from '@angular/material/icon';

import myAppConfig from './config/my-app-config';
const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    App,
    ProductList,
    ProductCategoryMenu,
    Search,
    ProductDetails,
    CardStatus,
    CartDetail,
    Checkout,
    LanguageDefinitions,
    Sidebar,
    Login,
    LoginStatus
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    HighlightModule,
    OktaAuthModule
    // MatIconModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ProductService,
    LanguageData,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          javascript: () => import('highlight.js/lib/languages/javascript'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          python: () => import('highlight.js/lib/languages/python'),
          java: () => import('highlight.js/lib/languages/java'),
          csharp: () => import('highlight.js/lib/languages/csharp')
        }
      }
    },
    { provide: OKTA_CONFIG, useValue: { oktaAuth } }
  ],
  bootstrap: [App]
})
export class AppModule { }
