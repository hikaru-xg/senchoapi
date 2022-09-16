var express = require('express');
var router = express.Router();

// （中略）

/* サンプルAPI③ 
 * http://localhost:3000/samples/hello/(任意の文字列) にGETメソッドのリクエストを投げると、
 * JSON形式で(任意の文字列)を返す。
 */
router.get('/hello/:place', function (req, res, next) {
  var param = {"result":"Hello "+ req.params.place + " !"};      // レスポンスで返す値。JSON形式。
  res.header('Content-Type', 'application/json; charset=utf-8')  // 「レスポンスはJSON形式で返すよ」の意味
  res.send(param);                                               // 「レスポンス送るよ」の意味
});

module.exports = router;