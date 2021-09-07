var number = 5;

function isPrime(num) { 
    
    if (num <= 1) return false; 
    if (num % 2 == 0 && num > 2) return false; 
    const s = Math.sqrt(num); 
    for(let i = 3; i <= s; i += 2) { 
        if(num % i === 0) return false;
    }
    return true;
  }


console.log(number +' '+ "is a Prime Number? "+ ' ' + isPrime(number));
    
   


  