export class UserModel {
  
  constructor(user: any) {
    if (user.birthdate) {
      const date = user.birthdate.split('-');

      const birthdate = {
        month: date[0],
        day:   date[1],
        year:  date[2]
      };

      user.birthdate = birthdate;
    }

    return user;
  }

}
