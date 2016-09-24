import {EmailLogin} from "./email-login";
export class User {
  constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public avatar: string
    ) { }
}
