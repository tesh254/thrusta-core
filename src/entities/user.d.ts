import { IPorfolio } from "./portfolio";

enum AUTH_TYPE {
    GOOGLE = "google",
    MAGIC = "magic",
    TWITTER = "twitter",
}
export interface IUser {
    uid: string;
    avatar: string;
    name?: string;
    email: string;
    last_logged_in?: string;
    auth_type?: AUTH_TYPE;
}

export type IAccount = User & {
    portfolios: Portfolio[];
}