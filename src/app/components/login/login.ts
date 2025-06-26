import { Component, Inject, OnInit } from '@angular/core';
import {OKTA_AUTH} from '@okta/okta-angular';
import * as OktaAuth from '@okta/okta-auth-js'
import {OktaSignIn} from '@okta/okta-signin-widget'
import myAppConfig from '../../config/my-app-config';

type OktaAuthType = InstanceType<typeof OktaAuth.OktaAuth>;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  oktaSignin: any

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuthType) {
    this.oktaSignin = new OktaSignIn({
      logo:'assets/images/logo.png',
      baseUrl:myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId:myAppConfig.oidc.clientId,
      redirectUri:myAppConfig.oidc.redirectUri,
      authParams:{
        pkce:true,
        issuer:myAppConfig.oidc.issuer,
        scopes:myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(){
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({
      el:'#okta-sign-in-widget'},
      (response:any) =>{
        if(response.status === 'SUCCESS'){
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error:any) =>{
        throw error;
      }
    )
  }
}


