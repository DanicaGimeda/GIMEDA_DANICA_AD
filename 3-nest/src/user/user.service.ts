import { Injectable } from '@nestjs/common';
import e from 'express';
import { InformationEvent } from 'http';
import { User } from './user.module';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

    private users : Map<number,User> = new Map<number,User>();
    private populatedData : User[] = [];
    

     register(body:any){
        var unDefined;
        
        try{
        
            
            if (  body.name == unDefined ||
                body.age == unDefined || body.email == unDefined ||
               body.password == unDefined )
            {
                return "Attribute missing!"
            }

            if ( typeof body.name != typeof "okay" ||
                typeof body.age != typeof 23 || typeof body.email != typeof "op" ||
                typeof body.password != typeof "tasukete" )
            {
                return "Attribute has a wrong type!" 
            }

            var existingUser = this.getId(body.id);
            var existingUserEmail = this.searchUser(body.email);

            if (typeof existingUser != typeof ""  )
            {
                return "Attribute key is invalid"
            }

            if (typeof existingUserEmail != typeof "")
            {
                return "Email already exist in database!"
            }
        
            
            var user = new User(uuidv4() , body.name, body.age, body.email, body.password);
            this.populatedData.push(user);
            
        } catch(e)

        {
            console.log(e);
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
            var bodyx = 
            {
                id : user.id,
                name : user.name,
                age : user.age,
                email : user.email
            }

            userList.push(bodyx);
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
        
       return "ID does not match any users in database";
    }

    editUser(id:any, body:any)
    {
        var unDefined;
        try{
            for ( var i = 0; i < this.populatedData.length ; i++ )
            {
                var user = this.populatedData[i].get();
                if (user.id == id )
                {
                    

                    if (  body.name == unDefined ||
                        body.age == unDefined || body.email == unDefined ||
                       body.password == unDefined )
                    {
                        return "Attribute missing!"
                    }
        
                    if (  typeof body.name != typeof "okay" ||
                        typeof body.age != typeof 23 || typeof body.email != typeof "op" ||
                        typeof body.password != typeof "tasukete" )
                    {
                        return "Attribute has a wrong type!" 
                    }
        
                    var existingUser = this.getId(body.id);
                    var existingUserEmail = this.searchUser(body.email);
        
                    if (typeof existingUser != typeof ""  )
                    {
                        return "Attribute key is invalid"
                    }
        
                    if (typeof existingUserEmail != typeof "")
                    {
                        return "Email already exist in database!"
                    }

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
            var existingUserEmail = null
            if ( body.email != null )
            {
                 existingUserEmail = this.searchUser(body.email);
            }

            for ( var i = 0; i < this.populatedData.length ; i++ )
            {
                var user = this.populatedData[i].get();
                if (user.id == id )
                {
                    if(body.name != user.name && body.name != null  && !(body.name === ""))
                    {
                    
                        user.name = body.name;
                        hasChanged = true;
                        if ( typeof body.name != typeof "ok"  )
                        {
                            return "Attribute has a wrong type!" 
                        }
            
                    }
                       
                    if(body.age != user.age && body.age != null  && !(body.age === ""))
                    {
                        user.age =body.age;
                        hasChanged = true;
                        if ( typeof body.age != typeof 23  )
                        {
                            return "Attribute has a wrong type!" 
                        }

                    }

                    if(existingUserEmail != null)
                    {
                        if(body.email!=user.email && body.email != null  && !(body.email === "") )
                        {
                            user.email = body.email;
                            hasChanged = true;
                            if ( typeof body.email != typeof "ok"  )
                            {
                                return "Attribute has a wrong type!" 
                            }
                            
                            
                        }else if (typeof existingUserEmail != typeof "" && body.email != user.email )
                        {
                            return "Email already exist in database!"
                        }
                    }



                    if(body.password != user.password && body.password != null  && !(body.password === "") )
                    {

                        user.password = body.password;
                        hasChanged = true;
                        if ( typeof body.password != typeof "ok"  )
                        {
                            return "Attribute has a wrong type!" 
                        }
                        
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
            console.log(e);
            return false;
        }

        return "ID does not match any users in database";
    }

    searchUser(term : any)
    {
        var array = [];
        if(this.populatedData == null)
            return null;

        for ( var i = 0; i < this.populatedData.length ; i++ )
        {
            var user = this.populatedData[i].get();
               
            if (user.id == term || user.name.toUpperCase() == term.toUpperCase() || user.email.toUpperCase() == term.toUpperCase() || user.age == term )
            {
                
                array.push( {
                    id : user.id,
                    name : user.name,
                    age : user.age,
                    email : user.email
                
                });

            }
    
        }   
        if ( array.length > 0 )
               return array;

        return "Term does not match any users in database";
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
            return "Error : Deletion is a failure";
        }

        return "Error : cannot find user ID";
    }

    logIn( body:any )
    {
        try{
            
            for ( var i = 0; i < this.populatedData.length ; i++ )
            {
                var user = this.populatedData[i].get();

                if(!body)
                return null;

                if ((user.password == body.password ) && (user.email == body.email) )
                {
                    return "Success!";
                }
                
            }

        }catch(e)
        {
            return "Email or Password is incorrect";
        }

        return "Email or Password is incorrect";
    }


}
