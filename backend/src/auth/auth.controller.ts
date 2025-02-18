import { Body, Controller, Get, HttpException, Post, Put, UseGuards,HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './Schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { AuthGuardD, } from './guard/auth.guard';
import { CurrentUser } from './decorator/current.user';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { RolesGuard } from './guard/role.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    signUp(@Body() registerDto: RegisterDto): Promise<User> {
      return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
    }

    @Get('current')
    @UseGuards(AuthGuardD) 
    async getCurrentUser(@CurrentUser() user: any) {
      console.log(user);
      return user; 
    }

    @Post('refresh-token')
    async refreshToken(@Body('userId') userId: string,
    @Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(userId, refreshToken);
    }

    @Put('update')
    @UseGuards(AuthGuardD)
    async updateUser(@CurrentUser() currentUser: User, @Body() updateData: UpdateUserDto) {
        // Log toàn bộ currentUser để kiểm tra
        console.log('Current User:', currentUser);
        console.log('Current User:', User);
    
        // Kiểm tra nếu currentUser không tồn tại
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }


        //console.log('Current User ID:', currentUser._id ? currentUser._id.toString() : 'ID is undefined');
    
        return this.authService.updateUser(currentUser._id.toString(), updateData);
    }

    @Put('change-password')
    @UseGuards(AuthGuardD) // Bảo vệ route bằng guard
    async changePassword(
        @CurrentUser() currentUser: User, 
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        return this.authService.changePassword(currentUser._id.toString(), changePasswordDto);
    }

    @Get('getAllUser')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async getAllUser(){
        return this.authService.getAllUser();
    }

    
}
