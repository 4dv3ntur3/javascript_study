// async & await
// clear style of using promise 
// promise를 무조건 다 변환해서 쓰는 게 옳은 것은 아님
// 경험으로 감 찾아야 함

// 1. async
async function fetchUser() { // 함수 앞에 function 붙이면 안에 있는 코드 블록들이 자동으로 promise로 바뀜 
    // do network request in 10 secs...
    return 'ellie'; // resolve와 reject 없이 이렇게 호출하면 pending 상태가 됨.
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await (기다려)
// async function 내에서만 쓸 수 있음

function delay(ms) {

    // 정해진 ms가 지나면 resolve를 호출하는 Promise return
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

async function getApple() {
    // await delay(1000); // delay가 끝날 때까지 기다려 줌 따라서 3초 후 사과 return
    await delay(2000); 

    // throw 'error'; // 이렇게 하면 에러 처리 뒤에서 안 했기 때문에 uncaught error 
    return 'apple';
}

async function getBanana() {
    await delay(1000); // 3초 있다가 banana return 
    return 'banana';
}

// function getBanana() {
//     return delay(1000)
//     .then(() => 'banana'); 
// } // 이렇게 chaining 하는 것보다 동기적으로 코드를 쓰는 것처럼 만들게 되면 기다렸다가 바나나 리턴 (더 쉽게 이해)

// function pickFruits() {

//     // promise도 이런 식으로 계속 중첩해서 쓰게 되면 callback hell과 똑같다 
//     return getApple()
//     .then(apple => {
//         return getBanana()
//         .then(banana => `${apple} + ${banana}`);
//     });
// }

async function pickFruits() {
    // const apple = await getApple();
    // const banana = await getBanana();
    // return `${apple} + ${banana}`;

    // await 병렬 처리
    // 지금은 사과 가져오는 데에 1초, 바나나 가져오는 데에 1초 => 2초 

    // sol1)
    const applePromise = getApple();
    const bananaPromise = getBanana(); // 만들자마자 사과랑 바나나가 return 돼서 들어가 있는 것 
    // 사과를 가져오는 데에 바나나가 필요 없고 바나나를 가져오는 데에 사과가 필요 없을 경우


    // 이렇게 하면 프로미스를 만드는 순간 프로미스 안에 있는 코드 블록 실행
    // 병렬적으로 처리 
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
}

pickFruits().then(console.log);


// 3. useful Promise APIs
// all, race 
function pickAllFruits() {
    // promise array 전달하면 모든 promise들이 병렬적으로 다 받을 때까지 모아 주는 
    return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(' + '));
}

pickAllFruits().then(console.log);

function pickOnlyOne() {
    // 먼저 따는 과일만 받아오고 싶다 
    return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log); // 바나나가 먼저 전달돼서 바나나 먼저 출력됨 그 이후에 바나나+사과 출력 



