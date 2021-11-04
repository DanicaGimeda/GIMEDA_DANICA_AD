import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnInit {
  requestResult: any;
  error: string='';

  
  constructor(private router: Router, private api: HttpClient) { }

  egisterForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl(0, Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });
  
  fCSearch = new FormControl();

  fCEmail = new FormControl();
  fCPassword = new FormControl();
  fCAge = new FormControl();
  fCName = new FormControl();
  
  id : string = "";
  name : string = "";
  password : string = "";
  email : string = "";
  age : string = "";

 
  ngOnInit(): void {
    this.display();
  }
 

  async display() {
    var resultX:any =await this.api.get(environment.API_URL + "/user/all").toPromise();
    
    
    this.requestResult = resultX.data
      
    
    
  
    console.log(resultX.success);
    // this.requestResult = result.data;
 
  }

  async delete(id : string)
  {
    var result:any =await this.api.delete(environment.API_URL + "/user/" + id).toPromise();
    
    
    this.requestResult = result.data
   if(result.success){
     this.display();
   }
 
 

  console.log(result.success);
  }

   
  async search()
  {
      var result:any =await this.api.get(environment.API_URL + "/user/search/" + this.fCSearch.value ).toPromise();
      this.requestResult = result.data;
    if(result.success){
      var result:any =await this.api.get(environment.API_URL + "/user/all").toPromise();
    }//add if no userterm match put doesn't match any user info
  }


  async edit(id:string)
  {
    var result:any =await this.api.get(environment.API_URL + "/user/" + id).toPromise();
    if(result.success){
      console.log(result)
      //this.nav('register');
      this.id = result.data.id;
      this.name = result.data.name;
      this.age = result.data.age;
      this.email = result.data.email;
      // this.password = result.data.password;

    }
    console.log("nooo")

  }
 
  async editUser(id:string)
  {
    
    var result:any =await this.api.patch(environment.API_URL + "/user/" + id,
      {
          "name": this.fCName.value,
          "age": this.fCAge.value,
          "email": this.fCEmail.value,
          // "password": this.fCPassword.value
     }).toPromise();

    console.log("Reguesting");
    
    if(result.success){
      console.log("yyeyeyeyeyess")
      
      window. location. reload();

    }
    console.log("noooasdasd")

  }
  
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
  nav(destination: string) {
    this.router.navigate([destination]);
  }  

}
