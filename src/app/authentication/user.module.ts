export class User {
  constructor(
    public email: string,
    public id: string,
    public theToken: string,
    public tokenExpDate: Date
  ) {}
  get token() {
    if (!this.tokenExpDate || new Date() > this.tokenExpDate) {
      return null;
    }
    return this.theToken;
  }
}
