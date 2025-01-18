class UserDto {
  constructor(model) {
    this.userName = model.userName;
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
