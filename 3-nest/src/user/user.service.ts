import { Injectable } from '@nestjs/common';
import e from 'express';
import { InformationEvent } from 'http';
import { User } from './user.module';

@Injectable()
export class UserService {

    private users : Map<number,User> = new Map<number,User>();
    private populatedData : User[] = [];
    

     register(newUser:any){
      
        try{
            var user = new User(newUser.id, newUser.name, newUser.age, newUser.email, newUser.password);
            this.populatedData.push(user);
            
        } catch(e)
        {
            return false;
        }
       
        return true;
     
        
    } 

    getAll(){
        console.log(this.populatedData);
        var userList = [];
        for ( var i = 0; i < this.populatedData.length ; i++ )
        {
            console.log( this.populatedData[i] instanceof User)
            var user = this.populatedData[i].get();
            var newUserx = 
            {
                id : user.id,
                name : user.name,
                age : user.age,
                email : user.email
            }

            userList.push(newUserx);
        }
       return userList;
    }

     getId(id :any){
    console.log(id);
        
        for ( var i = 0; i < this.populatedData.length ; i++ )
        {
            var user = this.populatedData[i].get();

            if (user.id == id )
            {
                return             {
                    id : user.id,
                    name : user.name,
                    age : user.age,
                    email : user.email
                };
            }
        }
        
       return null;
    }

    editUser(id:any, body:any)
    {
        try{
            for ( var i = 0; i < this.populatedData.length ; i++ )
            {
                var user = this.populatedData[i].get();
                if (user.id == id )
                {
                    var updatedUser = new User(user.id, body.name, body.age, body.email, body.password);
                    this.populatedData[i] = updatedUser;
                    return true;
                }
                
            }

        }catch(e)
        {
            return false;
        }

        return false;
    }

    patchUser(id:any, body:any)
    {
        var hasChanged = false;
        try{
            for ( var i = 0; i < this.populatedData.length ; i++ )
            {
                var user = this.populatedData[i].get();
                if (user.id == id )
                {
                    if(body.name != user.name)
                    {
                        user.name = body.name;
                        hasChanged = true;
                    }
                    if(body.age != user.age)
                    {
                        user.age =body.age;
                        hasChanged = true;

                    }
                    if(body.email!=user.email)
                    {
                        user.email = body.email;
                        hasChanged = true;

                    }
                    if(body.password != user.password)
                    {

                        user.password = body.password;
                        hasChanged = true;
                    }



                    if(hasChanged)
                    {
                        var updatedUser = new User(user.id, user.name, user.age, user.email, user.password);
                        this.populatedData[i] = updatedUser;
                        return true;
                    }
                    else return "Nothing changed";
                }
                
            }

        }catch(e)
        {
            return false;
        }

        return false;
    }

    searchUser(term : any)
    {
        if(this.populatedData == null)
            return null;

        for ( var i = 0; i < this.populatedData.length ; i++ )
        {
            var user = this.populatedData[i].get();

            if (user.id == term || user.name.toUpperCase() == term.toUpperCase() || user.email.toUpperCase() == term.toUpperCase() || user.age == term )
            {
                
                return {
                    id : user.id,
                    name : user.name,
                    age : user.age,
                    email : user.email
                };
            }
        }
       return null;
    }

    deleteUser(id :any)
    {
        try{
            for ( var i = 0; i < this.populatedData.length ; i++ )
            {
                var user = this.populatedData[i].get();
                if (user.id == id )
                {
                    this.populatedData.splice(i,1);
                    return "Successfully Deleted! ^^";
                }
                
            }

        }catch(e)
        {
            return "Error : ID number does not exist X<";
        }

        return "Error : ID number does not exist X<";
    }

    logIn( password : string )
    {
        try{
            
            for ( var i = 0; i < this.populatedData.length ; i++ )
            {
                var user = this.populatedData[i].get();
                if (user.password == password || user.password.toUpperCase() == password.toUpperCase() )
                {
                    return "Success!_"+ true;
                }
                
            }

        }catch(e)
        {
            return false;
        }

        return false;
    }


}
