class genTokensDto {
  login: string;
  password: string;
  createDate: string;
  _id: object;
  __v: number;

  constructor(model: genTokensDto) {
    this.login = model.login;
    this.password = model.password;
    this.createDate = model.createDate;
    this._id = model._id;
    this.__v = model.__v;
  }
}
