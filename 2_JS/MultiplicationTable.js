var i, rows = 10, height = 10 ;
var output = 1;
for( i = 1; i <= height; i++)
{
    
    for(  var j = 1; j <= rows; j++ )
    {
        output = j*i ;
        process.stdout.write(output + " ");
        
    }
     
    console.log('\n');
}