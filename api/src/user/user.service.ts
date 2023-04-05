import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from '@app/types/userResponse.interface';
import { LoginUserDto } from '@app/dto/loginUser.dto';
import { compare } from 'bcrypt';
import { ReactionsEntity } from '@app/reaction/reactions.entity';
import { ProductEntity } from '@app/product/product.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ReactionsEntity)
    private readonly reactionsRepository: Repository<ReactionsEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findUserByPhoneNumber(phonenumber: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ phonenumber });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async saveUserToDateBase(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '365d' },
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existUserWithPhoneNumber = await this.findUserByPhoneNumber(createUserDto.phonenumber);
    const existUserWithEmail = await this.findUserByEmail(createUserDto.email);

    if (existUserWithPhoneNumber) {
      throw new HttpException('User with this phone number already exist', HttpStatus.BAD_REQUEST);
    }

    if (existUserWithEmail) {
      throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST);
    }

    return await this.saveUserToDateBase(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      {
        select: [
          'id',
          'username',
          'email',
          'image',
          'phonenumber',
          'password',
          'rate',
          'likesCount',
          'createdAt',
          'updatedAt',
          'addedToFavoritesCount',
        ],
      },
    );

    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    const isPasswordCorrect = await compare(loginUserDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
