import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  payload: any;
  
  
  constructor(private router: Router, private api: HttpClient) { }

  egisterForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl(0, Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });

  error: string = '';

  ngOnInit(): void {
  }
  
  fCEmail = new FormControl();
  fCPassword = new FormControl();
  fCAge = new FormControl();
  fCName = new FormControl();
  requestResult = '';
  
  onSubmit() {
    
    if (
      this.egisterForm.value['fcPassword'] !==
      this.egisterForm.value['fcPassword2']
    ) {
      this.error = 'Password doesnt match!';
      return;
    }
    if (!this.egisterForm.valid) {
      {
        this.error = 'No fields must be empty';
        return;
      }
    }
    if (this.egisterForm.valid) {
      
      var payload: {
        name: string;
        email: string;
        age: number;
        password: string;
      };
      
      payload = {
        name: this.egisterForm.value.fcName,
        age: this.egisterForm.value.fcAge,
        email: this.egisterForm.value.fcEmail,
        password: this.egisterForm.value.fcPassword,
      };
    
      console.log(payload);
  
    }
  }
 
  async register() {
    
    var result:any = await this.api.post(environment.API_URL+"/user/register", 
    {"name": this.egisterForm.value.fcName, 
     "age":this.egisterForm.value.fcAge,
    "email":this.egisterForm.value.fcEmail,
    "password":this.egisterForm.value.fcPassword
     }).toPromise();
 
    if(result.success){
      this.nav('home');
    }
    console.log(result.success);
   this.requestResult = result.data;
  
}
  
  

    nav(destination: string) {
      this.router.navigate([destination]);
    }  
  }  

