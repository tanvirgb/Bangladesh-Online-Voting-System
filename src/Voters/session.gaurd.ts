import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
 
@Injectable()
export class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.session.jwtToken;
 
        try {
            const secretKey = '#19392#misa21';
            const decoded = jwt.verify(token, secretKey);
            request.user = decoded;
            return true;
        } catch (error) {
            return false;
        }
    }
}