// Callback -> Promise 

class UserStorage{
    loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (
                    (id == 'ellie' && password == 'dream') ||
                    (id == 'coder' && password == 'academy')
                ) {
                    resolve(id); // 조건에 맞을 경우 id 전달하면서 onSuccess 콜백 호출
                } else {
                    reject(new Error('not found')); // 조건에 안 맞을 경우
                }
            }, 2000); // 2초 후 위 코드 블록 실행 
        });
    }
        

    // API 2
    // 사용자의 권한 정보 받아옴
    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (user == 'ellie') {
                    resolve({name: 'ellie', role:'admin'});
                } else {
                    reject(new Error('no access'));
                }
            }, 1000); 
        });
    }   
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

// async & await 적용시키기 
userStorage //
    .loginUser(id, password)
    .then(userStorage.getRoles)
    .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
    .catch(console.log);

// async await 
// promise 위에 간편한 api 제공 
// 기존에 존재하는 것 위에 혹은 그걸 감싸서 간편하게 쓸 수 있는 api를 제공하는 것: syntactic sugar