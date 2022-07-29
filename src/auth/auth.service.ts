import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable({

})

export class AuthService{

    constructor(private prisma:PrismaService){

    }

    async signup(dto: AuthDto){ 

        try{
            //generate hash password
            const hash =await argon.hash(dto.password);

            //save the new user to database
            const user = await this.prisma.user.create({
                data:{
                    email:dto.email,
                    hash
                }
            })

            delete user.hash;
            return user;
        }
        catch(error)
        {
            if(error instanceof PrismaClientKnownRequestError)
            {
                if(error.code === "P2002")
                {
                    throw new ForbiddenException("User already exists");
                }
                
            }
        }
    }

    async signin(dto: AuthDto){
        //find the user by email

        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email,
            },
        });

        if(!user)
        {
            throw new ForbiddenException("credentials are invalid");
        }

        const pwMatch = await argon.verify(user.hash, dto.password);

        if(!pwMatch)
        {
            throw new ForbiddenException("credentials are invalid");
        }

        delete user.hash;

        return user;
    }

}