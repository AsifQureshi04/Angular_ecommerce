import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import * as OktaAuth from '@okta/okta-auth-js'

type OktaAuthType = InstanceType<typeof OktaAuth.OktaAuth>;

@Component({
  selector: 'app-login-status',
  standalone: false,
  templateUrl: './login-status.html',
  styleUrl: './login-status.scss'
})
export class LoginStatus implements OnInit{
  isAuthenticated: boolean = false;
  userFullName: string = '';
  
  constructor(private oktaAuthService: OktaAuthStateService,
            @Inject(OKTA_AUTH) private oktaAuth: OktaAuthType
  ) {

  }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (result) =>{
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      }
    )
  }
  
  getUserDetails() {
    if(this.isAuthenticated){
        this.oktaAuth.getUser().then(
          (res:any) =>{
            this.userFullName = res.name as string
          }
        )
    }
  }

  logout(){
    this.oktaAuth.signOut();
  }

}
