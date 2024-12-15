import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    login() {
        return "I am in";
    }

    signup() {
        return "I am up";
    }
}