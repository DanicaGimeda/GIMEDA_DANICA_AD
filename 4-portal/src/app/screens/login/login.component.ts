import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  title = 'portal';
  
  userCredential1: string = "null";
  userCredential2: string = 'null';

  logIn(email:string, password:string){
    alert( `${email}/${password}` );
    //this.userCredential1 = email;
    //this.userCredential2 = password;
  }

}
