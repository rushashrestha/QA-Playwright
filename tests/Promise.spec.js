import { test } from '@playwright/test';

test('Promise Task 1', async ()=> {
    const myPromise = new Promise((resolve, reject) =>{
        const success = true;
        if(success){
            resolve("success");
        }
        else{
            reject('Failure');
        }
    });

    const result = await myPromise;
    console.log(result);
});

test('Promise task 2', async()=>{
    const myPromise = new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const a = 10;
            const b = 20;
            if(a + b === 30){
                resolve('success: 30');
            }else{
                reject('Failure: not 30');
            }
        },1000);
    });
    const result = await myPromise;
    console.log(result);
});

test('Promise reject case', async()=>{
    const myPromise = new Promise((resolve, reject) =>{
        const success = false;
        if(success){
            resolve("success");
        }
        else{
            reject('Failure');
        }
    });
    try{
        const result = await myPromise;
        console.log(result);
    }catch(error){
        console.log("caught an error:" +error);
    }
    
});

test('multiple Promises', async()=>{
    const promise1 = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Promise 1 resolved');
        },2000);
    });
    const promise2 = new Promise((reject)=>{
        setTimeout(()=>{
            reject('Promise 2 rejected');
        },1000);
    });
    const result1 = await promise1;
    console.log(result1);
    try{
        const result2 = await promise2;
        console.log(result2);
    }catch(error){
        console.log("caught an error:" +error)
    }
});

test('Promise.all example', async()=>{
    const promise1 = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Promise 1 resolved');
        },2000);
    });
    const promise2 = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('Promise 2 resolved');
        },1000);
    });
    const result = await Promise.all([promise1, promise2]);
    console.log(result);
});

test('Fetching data with promise', async()=>{
    async function fetchData(){
        const delay = 2000;
        const dataPromise = new Promise((resolve)=>{
            setTimeout(()=>{
                resolve({name : 'Rusha'});
            },delay);
        });
       return dataPromise; 
    }
    // const result = await fetchData();
    // const result2 = await fetchData();
    // const result3 = await fetchData();
    const result = await Promise.all([fetchData(), fetchData(), fetchData()]);
    
    console.log(result);
    // console.log(result2, result3);
    
});

test('Promise: sequential API calls', async()=>{
    function getUserId(){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(1);
            },1000);
        });
    }
    function getName(){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve("Rusha");
            },1000);
        });
    }
    function getScore(){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(100);
            },1000)
        });
    }
    const userID = await getUserId();
    const name = await getName();
    const score = await getScore();

    console.log('User ID:',userID, 'Name:', name, 'score:',score);
});

test('Error hanndling in chain', async()=>{
    function getUserId(){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(1);
            },1000);
        });
    }
    function getName(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                reject("Rusha");
            },1000);
        });
    }
    function getScore(){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(100);
            },1000)
        });
    }
    const userID = await getUserId();
    let name;
    try{
         name = await getName();
    }catch(error){
        console.log("caught an error:" +error)
    }
    
    const score = await getScore();

    console.log('User ID:',userID, 'Name:', name, 'score:',score);
});

test('Timeout race condition', async()=>{
    const promise1 = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('Done');
        },5000);
    });
    const promise2 = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            reject('Timeout!');
        },2000);
    });
    try{
         const result = await Promise.race([promise1, promise2]);
    console.log(result);
    }catch(error){
        console.log("caught an error:", error);
    }
   

});