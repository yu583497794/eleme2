// SQL语句映射文件,以供api逻辑调用
var sqlMap = {
  user: {
    add: 'insert into user (username, email, password, repeatPass) values (?,?,?,?)',
    select_name: 'select * from user',
    update_user: 'update user set'
  }
}
module.exports = sqlMap
