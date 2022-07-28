import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable({

})

export class AuthService{

    constructor(private prisma:PrismaService){

    }
    signup(){ 
        return "I am signup okkk";
    }

    signin(){
        return "I am signin qjqjqj";
    }

}