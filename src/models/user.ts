import Gender from "./gender";
import LoginType from "./loginType";

class User {
  readonly id: string;
  readonly fullname: string;
  readonly email: string;
  readonly username: string;
  readonly dob?: Date;
  readonly gender: Gender;
  readonly profileUrl?: string | null;
  readonly loginType: LoginType;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: string,
    fullname: string,
    email: string,
    username: string,
    gender: Gender,
    loginType: LoginType,
    createdAt: Date,
    updatedAt: Date,
    dob?: Date,
    profileUrl?: string
  ) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.username = username;
    this.gender = gender;
    this.loginType = loginType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.dob = dob;
    this.profileUrl = profileUrl;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromjson(data: any) {
    return new User(
      data["id"],
      data["fullname"],
      data["email"],
      data["username"],
      data["gender"],
      data["loginType"],
      data["createdAt"],
      data["updatedAt"],
      data["dob"],
      data["profileUrl"]
    );
  }
}
export default User;
