window.tailCall = function(){
    function fibonacci(n,prev1=0,prev2=1){
        if (n === 1) return prev2;
        return fibonacci(--n, prev2, prev1 + prev2);
    }
    return fibonacci(number);
}


window.normalCall = function(){
    function fibonacci(n){
        if(n<=1){
            return n
        }else{
            return fibonacci(n-1) + fibonacci(n-2);
        }
    }
    return fibonacci(number);
}
function recursion(){
    function fibonacci(n) {
        let current = 0;
        let next = 1;
        for (let i = 0; i < n; i++) {
            [current, next] = [next, current + next];
        }
        return current;
    }
    return fibonacci(number);
}

function timeLog(callback,key){
    console.time(key);
    console.log(callback());
    console.timeEnd(key);
}
timeLog(normalCall,"normalCall");
timeLog(tailCall, "tailCall");
timeLog(recursion, "recursion");
