// 중첩 쿼리 -> promise로 

getConnection(conn){

    conn.query(sql, function(err, result1){

        if(err) {
            console.log(err)
        } else {
            conn.query(sql, function(err2, result2){

                if(err){
                    console.log(err2)

                } else {
                    conn.query(sql, function(err3, result3) {

                        if(err3){
                            console.log(err3)

                        } else {
                            //...
                        }

                    })
                }


            })
        }
    })












}