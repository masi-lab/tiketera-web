module.exports = function () {
  let dic = {
    levels:{
        guest: 0,
        user: 1,
        moderator: 2,
        admin: 3
    },
    default: 'user',
    guestLevel: 'guest',
    guestName: 'Guest'
  }
  return  dic
}