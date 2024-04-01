export interface UserData {
    email: string;
    password: string;
    name: string;
    id: string;
}

export interface ResponseUser extends UserData {
    token: string;
}