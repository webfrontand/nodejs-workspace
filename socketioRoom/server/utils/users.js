[{
  id: '/#0000000',
  name: 'andraw',
  room: 'reactjs'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, name, room){
    var user = {
      id,
      name,
      room
    }
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var user = this.getUser(id);

    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser(id){
    var user = this.users.filter((user) => {
      return user.id === id;
    })
    return user[0];
  }

  getUserList(room){
    var users = this.users.filter((user) => {
      return user.room === room;
    });

    var namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray; // 새로운 배열을 반환 이름만 있겠네.
  }
}

module.exports = Users;
// class Person {
//   constructor(name, age){
//     console.log(name, age);
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old.`
//   }
//
// }
//
// var me = new Person('andraw', 25);
// var description = me.getUserDescription();
// console.log(description);
