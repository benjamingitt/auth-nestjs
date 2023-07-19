import { USER_REPOSITORY } from '@app/constants';
import { Inject, Injectable } from '@nestjs/common';
import { createUserDto } from '../auth/dto/user.dto';
import { User } from './models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: createUserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneByTel(telephone: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { telephone } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findAndCountAll(dto): Promise<any> {
    console.log(dto);
    const condition = dto.searchField
      ? { [dto.searchField]: { [Op.like]: `%${dto.search}%` } }
      : null;
    const { limit, offset } = this.getPagination(dto.page, dto.size);
    const result = await this.userRepository.findAndCountAll<User>({
      limit,
      offset,
      where: condition,
      attributes: { exclude: ['password'] },
    });
    return this.getPagingData(result, limit, offset);
  }

  getPagination(page, size) {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }

  getPagingData(data, page, limit) {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async delete(id) {
    return await this.userRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const userUpdate = await this.userRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );

    return userUpdate;
  }
  async addEmail(email, id) {
    const userUpdateEmail = await this.userRepository.update(
      { email },
      { where: { id }, returning: true },
    );
    return userUpdateEmail;
  }
}
