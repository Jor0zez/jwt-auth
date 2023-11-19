export default class registerDto {
  _id: object;
  login: string;
  password: string;

  constructor(model: registerDto) {
    this._id = model._id;
    this.login = model.login;
    this.password = model.password;
  }
}
