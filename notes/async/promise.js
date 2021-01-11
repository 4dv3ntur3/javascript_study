'use strict'; 

// Promise is a javascript object for asynchronous operation.
// 1. State (상태): process가 operation 수행하고 있는 중인지 / 기능 수행이 다 완료되어서 성공했는지 / 실패했는지 
// pending (진행 중) -> fulfilled(성공) / rejected

// 2. Producer vs. Cousumer 
// 데이터를 제공하는 사람과 데이터를 쓰는(사용하는, 필요로 하는) 사람

// 1. Producer
// when new Promise is created, the exceutor runs automatically.

const promise = new Promise((resolve, reject) => {
    // doing some heavy work (network, read files)
    // 네트워크에서 데이터를 받아오거나 파일에서 무언가 큰 데이터를 읽어오는 과정은 시간이 걸림 
    // 이걸 동기적으로 처리하게 되면 작업을 수행하는 동안 다음 라인의 코드가 실행되지 않음
    // 따라서 시간이 걸리는 일들은 promise를 만들어서 비동기적으로 처리하는 것이 좋음 

    console.log('doing something...');
    // promise를 만드는 순간 executor라는 콜백 함수가 바로 실행됨
    // 만약 promise 안에 네트워크 통신 코드 작성했다면 promise가 만들어지는 순간 바로 network 통신 수행하게 됨
    // network 요청을 사용자가 요구했을 때만 해야 하는 경우(버튼을 눌렀을 때 네트워크에 요청해야 한다든가)엔 이런 식으로 작성하면 불필요한 통신
    // 유의해서 공부***
    
    setTimeout(() => {
        resolve('ellie'); // 성공
        //reject(new Error('no network')); // 실패. 보통 error로 값 전달함
    }, 2000); // 2초 후에 ellie 전달
}); 
// 두가지의 콜백 함수 받음: resolve(성공해서 최종 데이터 전달하는), reject(기능 수행 중 문제가 생길 때)


// 2. Consumers: then, catch, finally 사용해서 값 받아올 수 있음
promise // 에러 핸들링 필요 
    .then((value) => {
        // 값이 정상적으로 수행이 된다면 (then) 값을 받아와서 원하는 기능 수행
        // value: 프로미스가 정상적으로 수행이 돼서 resolve callback 함수에서 전달된 값이 들어오게 됨
        console.log(value); 
    })

    .catch(error => { 
        // 에러 핸들링 (then은 promise를 return하기 때문에 이 catch는 그 then에서 return된 promise에 catch 등록
        console.log(error);
    })

    .finally(() => {
        // 성공하든 실패하든 상관없이 무조건 마지막에 호출됨
        console.log('finally');
    }); // 마지막에 ; 붙여 줘야 


// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber // resolve가 1 전달
.then(num => num *2) // 1 * 2
.then(num => num *3) // 2 * 3
.then(num => { // then은 값을 바로 전달할 수도 있고, 또 다른 비동기 Promise를 전달할 수도 있음 
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num-1), 1000); // 6-1
    });
})
.then(num => console.log(num)); // 5 (2초 소요) 하나 둘 셋 세면 바로 나옴 ;;


// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('chicken'), 1000);
    });

const getEgg = hen => 
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(`${hen} => egg`)), 1000);
    });

const cook = egg => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => fried`), 1000);
    });

getHen()
// .then(hen => getEgg(hen)) // 한 값만 받아서 바로 함수로 넣어서 호출하는 경우는 생략 가능 
// .then(egg => cook(egg))
// .then(meal => console.log(meal)); // 3초 소요되어야 
    .then(getEgg) // 여기서 발생하는 에러 잡고 싶을 땐 바로 다음에 catch 
    .catch(error => {
        return 'bread'; // 계란에 문제가 생기면 빵을 대신 가져오도록 
    })
    .then(cook)
    .then(console.log)
    .catch(console.log); // 맨 밑에서 에러 잡힘 

