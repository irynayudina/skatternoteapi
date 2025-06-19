import { Controller, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Post('register')
    register(@Body() body: any) {
        // return this.userService.register(body)
        return {
            message: 'User registered successfully',
            data: body
        }
    }
    @Post('login')
    login(@Body() body: any) {
        return {
            message: 'User logged in successfully',
            data: body
        }
    }
    @Post('logout')
    logout(@Body() body: any) {
        return {
            message: 'User logged out successfully',
            data: body
        }
    }
    @Get('get-all-users')
    getAllUsers() {
        return {
            message: 'All users fetched successfully',
            data: []
        }
    }
}
