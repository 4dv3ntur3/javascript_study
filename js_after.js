
// getConnection을 promise로 만들고 
// 전역으로 선언된 conn에 값을 주고 resolve를
let conn; // 실행시키면 pool.getConnection이 에러가 없을 때
// getConnection안에 온갖 기능이 다 들어 있음
// 그러므로 getConnection은 connection만 하는 함수로 바꾸고
// 그 뒤에 .then을 하게끔 만들어야 말이 되는 상황인 듯


pool.getConnection((err,_conn)=>{
	if(err)console.log(err)
	else conn = _conn
})


const execSQL = (sql, params) => new Promise(resolve, reject) 

    if(!params){

        // parameter 있을 때
        conn.query(sql, function(err, res) => {
            err ? reject(err) : resolve(res)
        })
    }

    else {

        // parameter 없을 때
        conn.query(sql, params, function(err, res) => {
            err ? reject(err) : resolve(res)
        })
    }
});


// 첫번째 쿼리 이후 then을 쓴 뒤 나머지 쿼리들을 all로 쓰는 게 가능한지...
// 첫 번째 쿼리의 결과값만 다음 쿼리 parameter에 영향을 미치고, 2번째 3번째 쿼리는 서로 독립적

// update query는 all로 쓰는 건 좋지 않고
// all 같은 경우는 select문에서만 쓰는 게 좋음 
// all은 그 안에 들어가 있는 promise 중에 뭐가 먼저 실행될지를 보장해 주지 않음


// 이렇게 작성하려고 하는데 이런 경우 저 err1과 err2를 어떻게 처리해야 하는지...
// promise는 callback hell 가독성 개선을 위해 나온 것임

// 뒤에 catch 안 붙일 거라면 try catch로 하는 게 좋은데
// 들어간다면 굳이 넣을 필요는 없는... 
// 함수별로 잘 분기해서 함수 이름마다 얘가 뭐 하는 앤지 딱딱 알게 한 후
// promise(함수 이름) 이런 식으로 하면... 

try {
    execSQL(sql1)
    .then(value => {
        res1 = value;
        Promise
        .all([execSQL(sql2).catch{
            console.log(err)
        } , 
            execSQL(sql3).catch{
            console.log(err)
            }])

        .catch or 
        .then(values => {
        const [res2, res3] = values
        })
        .catch() // err 
    })
    .catch(

    )
} catch (err) {
    console.log(err) // 이런 식으로 하면 쿼리 에러가 걸릴 때마다 잡히는지... 
}

// 참고한 소스
(async () => {
    try {
      Promise
        .all([execSQL(sql1), execSQL(sql2), execSQL(sql3)])
        .then(values => {
          const [res1, res2, res3] = values
          /* ... 최종 처리 코드 작성 ... */
        })
    } catch (err) {
      console.log(err)
    }
  })()

1.
then(2).
then(3)

Promise(1)
.catch
.then(Promise(2))
.catch
.then(Promise(3))
.catch

// 1과 2에서 처리하는 방법이 다르다 하면 .catch
// 혹은 3 뒤에 catch 해 놓고 promise.all 해서 둘 중에 하나가 오류가 나면 reject가 나도록


// 라이브러리 임포트 : 임포트한 것 중에 conn 객체에 대한 생성자가 있음
// 혹은 다른 모듈에서 만든 다음에 만들어진 애를 import 

// 생성자가 있는 것으로,,,
// 시스템 시작할 때 디비 구성하는 initializer 기능을 할 때는 좋은 기능인데

