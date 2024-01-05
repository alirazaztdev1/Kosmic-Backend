import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
