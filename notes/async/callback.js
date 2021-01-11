'use strict';

// javascript is synchronous. (동기적이다)
// execute the code block in order after hositing
// 호이스팅 이후부터 코드가 작성한 순서에 맞춰서 하나씩 동기적으로 실행됨
// 호이스팅: var 변수 선언, function declaration이 자동적으로 맨 위로 올라가는 것

console.log('1');
// setTimeout(function() {
//     console.log('2')
// }, 1000); // 1초 후에 2 출력
// 브라우저에서 제공되는 api, 지정한 시간이 지나면 콜백함수 호출 
// 브라우저에게 요청 보내고 바로 다음으로 넘어감 (3 출력)
// 그리고 1초 후에 콜백함수 실행 -> 2 출력 (asynchronous) 비동기적 실행 방법

// 이렇게 쓸 수 있음 
setTimeout(() => console.log('2'), 1000);

console.log('3');

// 이렇게 하면 1 -> 3 -> 2 순으로 출력


// callback을 쓰는 두 가지 방법
// Synchronous Callback
function printImmediately(print) {
    print(); // 어떤 콜백을 받아서 바로 실행하도록 하는 함수 
}

printImmediately(() => console.log('hello'));

// -> 1 3 hello 2 순서로 출력
// 함수 선언은 호이스팅! 그러므로 printImmediately 함수 선언은 맨 위로 올라가고 1, 3, hello 후 2 출력 

// Asynchronous Callback (언제 실행될 지 알 수 없는)
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

printWithDelay(() => console.log('async callback'), 2000);

// 함수 선언은 호이스팅 -> printWithDelay가 맨 위로 올라가고 
// 1 출력(동기), 2 (비동기), 3 출력(동기), printImmediately(동기), printWithDelay(비동기)
// 자바스크립트: callback을 인자로 전달, 변수에 할당 


// 콜백들로만 코드를 작성해서는 안 됨! (콜백 지옥)
// Callback Hell Example
class UserStorage{
    // API 1
    loginUser(id, password, onSuccess, onError) {
        // 정상적으로 로그인이 되면 onsuccess callback & 정보 전달, onerror는 로그인 실패시 호출
        setTimeout(() => {
            if (
                (id == 'ellie' && password == 'dream') ||
                (id == 'coder' && password == 'academy')
            ) {
                onSuccess(id); // 조건에 맞을 경우 id 전달하면서 onSuccess 콜백 호출
            } else {
                onError(new Error('not found')); // 조건에 안 맞을 경우
            }

        }, 2000); // 2초 후 위 코드 블록 실행 

    }

    // API 2
    // 사용자의 권한 정보 받아옴
    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user == 'ellie') {
                onSuccess({name: 'ellie', role:'admin'});
            } else {
                onError(new Error('no access'));
            }
        }, 1000); 
    }
    
}

// 1. 사용자에게 id, pwd 입력받아 옴
// 2. 서버에게 id, pwd 전달 후 로그인 작업 수행
// 3. 성공적이면 id 다시 받아와서 role 확인
// 4. role까지 무사히 가져왔다면 정보 출력

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id, 
    password, 
    user => { // onSuccess : id return 
        
    userStorage.getRoles(
        user, 
        (userWithRole) => {
        // 로그인 성공 & 사용자 role 잘 가져왔을 경우에만 실행되는 블록
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);

    }, (error) => {
        console.log(error);

    })

}, (error) => {
    // 에러 발생 (로그인 실패)
    console.log(error);

})

// 가독성 out
// business logic 이해 불가 (한눈에 알아보기 굉장히 어려움)
// 디버깅해야 하는 경우에도 굉장히 어렵다 
// 문제가 생기면 어느 에러가 처리하는 건지... 감이 안 옴 
// 유지 보수도 어렵다 


// promise
// 아직 강의가 열리지 않은 상태에서 미리 등록 -> 강의 열리면 메일로 공지 전달 (promise 값 전달 성공)
// 강의 열린 후에 등록 -> 기다릴 필요 없이 바로 공지 전달 성공 (이미 성공적으로 처리된 promise)
