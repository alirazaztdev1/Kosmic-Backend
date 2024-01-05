import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLE_TYPE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PermissionAccessGuard } from 'src/guards/permission-access-guard.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiBearerAuth()
@ApiTags('profile')
@Controller('profile')
@UseGuards(JwtAuthGuard, PermissionAccessGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/add-personal-details')
  @Roles(ROLE_TYPE.CUSTOMER, ROLE_TYPE.SUPER_ADMIN)
  async addPersonalDetails(@Body() createProfileDto: CreateProfileDto, @Req() req: any) {
    return await this.profileService.addPersonalDetails(createProfileDto, req.user.id);
  }

  @Patch()
  @Roles(ROLE_TYPE.CUSTOMER, ROLE_TYPE.SUPER_ADMIN)
  async updatePersonalDetails(@Body() body: UpdateProfileDto, @Req() req: any) {
    return await this.profileService.updatePersonalDetails(req.user.id, body);
  }

  @Get()
  @Roles(ROLE_TYPE.CUSTOMER, ROLE_TYPE.SUPER_ADMIN)
  async getProfileByUserId(@Req() req: any) {
    return await this.profileService.getProfileByUserId(req.user.id);
  }
}
