import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import CreateUserDto from 'src/user/dto/create-user.dto';
import LoginUserDto from 'src/user/dto/login-user.dto';
import User from 'src/user/entity/user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly reposiory: Repository<User>;

  constructor(@InjectRepository(User) reposiory: Repository<User>) {
    this.reposiory = reposiory;
  }

  async registerUser(dto: CreateUserDto, response: Response) {
    const { name, email, password } = dto;

    // check for required fields
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return response.status(500).send({
        status: 'fail',
        message: 'Not all required fields have been filled in.',
      });
    }

    try {
    } catch (error: any) {
      console.error(error);

      //@ts-ignore
      if (error instanceof QueryFailedError && error.code === '23505') {
        //@ts-ignore
        console.error(`Unique constraint ${error.constraint} failed`);

        return response.status(400).send({
          status: 'fail',
          message: 'There is already a user with this email.',
        });
      }

      return response.status(500).send({
        status: 'error',
        message: error,
      });
    }
  }

  async loginUser(dto: LoginUserDto, response: Response) {}
}
