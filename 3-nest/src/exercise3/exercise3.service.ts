import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
    helloWorld(name:string){
        
        return "Hello there "+name;
    }

    loopsTriangle(height:number)
    {
        for (var i = 1; i <= height; i++ )
        {
        var string = ' ';
        var j = i;
        while (j){
        string += '*';
        j--;
        }
        console.log(string);
        } 
        return;
    }

    primeNumber(primeNum:number){
        function isPrime(primeNum) { 
    
    if (primeNum <= 1) return false; 
    if (primeNum % 2 == 0 && primeNum > 2) return false; 
    const s = Math.sqrt(primeNum); 
    for(let i = 3; i <= s; i += 2) { 
        if(primeNum % i === 0) return false;
    }
    return true ;
  }
   return( "Is " + primeNum +' '+ "a Prime Number? "+ ' ' + isPrime(primeNum));;
    }

    /*sampleFunction(){
        var v1;
        v1 = "NAME";
        console.log(v1);
        v1 = 1 ;
        console.log(v1);
        v1 = false;
        console.log(v1);
    }


    */
}
