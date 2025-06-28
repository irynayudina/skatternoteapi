import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

export interface CreateAuth0UserDto {
  auth0Id: string;
  email: string;
  username: string;
  picture?: string;
}

export interface UpdateAuth0UserDto {
  email?: string;
  username?: string;
  picture?: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: createUserDto.role || 'user'
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return user;
  }

  async createAuth0User(createAuth0UserDto: CreateAuth0UserDto) {
    const { auth0Id, email, username, picture } = createAuth0UserDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
          { auth0Id }
        ]
      }
    });

    if (existingUser) {
      // If user exists, update their auth0Id if they don't have one
      if (!existingUser.auth0Id && auth0Id) {
        return await this.prisma.user.update({
          where: { id: existingUser.id },
          data: { auth0Id },
          select: {
            id: true,
            username: true,
            email: true,
            picture: true,
            role: true,
            createdAt: true
          }
        });
      }
      
      // Return existing user if they already have auth0Id
      return await this.prisma.user.findUnique({
        where: { id: existingUser.id },
        select: {
          id: true,
          username: true,
          email: true,
          picture: true,
          role: true,
          createdAt: true
        }
      });
    }

    // Create new Auth0 user
    const user = await this.prisma.user.create({
      data: {
        auth0Id,
        email,
        username,
        picture,
        role: 'user'
      },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        role: true,
        createdAt: true
      }
    });

    return user;
  }

  async updateByAuth0Id(auth0Id: string, updateData: UpdateAuth0UserDto) {
    const user = await this.prisma.user.update({
      where: { auth0Id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        role: true,
        createdAt: true
      }
    });

    return user;
  }

  async updateExistingUserWithAuth0Id(userId: number, auth0Id: string, updateData: UpdateAuth0UserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
        auth0Id
      },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        role: true,
        createdAt: true
      }
    });

    return user;
  }

  async findByAuth0Id(auth0Id: string) {
    return await this.prisma.user.findUnique({
      where: { auth0Id },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        role: true,
        createdAt: true
      }
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        desktops: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id }
    });

    return { message: 'User deleted successfully' };
  }
}
