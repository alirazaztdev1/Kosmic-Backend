import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async addPersonalDetails(personalDetails: CreateProfileDto, userId: number): Promise<any> {
    const user = await this.getProfileByUserId(userId);

    if (user) {
      await this.profileRepository.update({ user: { userId } }, { ...personalDetails });

      return await this.getProfileByUserId(userId);
    }

    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }

  async updatePersonalDetails(userId: number, body: UpdateProfileDto): Promise<any> {
    const { ...personalDetails } = body;
    await this.profileRepository.update({ user: { userId: userId } }, { ...personalDetails });

    return await this.getProfileByUserId(userId);
  }

  async getProfileByUserId(userId: number): Promise<any> {
    const profile = await this.profileRepository.findOne({
      where: { user: { userId } },
      relations: { user: true }
    });

    if (!profile) throw new HttpException('profile not found', HttpStatus.NOT_FOUND);
    return profile;
  }
}
