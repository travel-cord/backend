export class User {
  constructor(
    private id: string | number,
    private name: string,
    private email?: string,
    private birthday?: string,
    private gender?: string,
    private age?: string,
    private profileImg?: string
  ) {}

  getId(): Readonly<string | number> {
    return this.id
  }

  getName(): Readonly<string> {
    return this.name
  }

  getEmail(): Readonly<string> {
    return this.email
  }

  getBirthday(): Readonly<string> {
    return this.birthday
  }

  getGender(): Readonly<string> {
    return this.gender
  }

  getAge(): Readonly<string> {
    return this.age
  }

  getProfileImg(): Readonly<string> {
    return this.profileImg
  }
}
