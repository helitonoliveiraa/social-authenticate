import { BaseService } from '../services/BaseService';
import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/UserDTOs';

interface Update {
  name?: string; 
  avatar_url?: string; 
  admin?: boolean;
  id: string 
}

export class UserService extends BaseService {
  constructor() {
    super();
  }

  async create({ email, name, avatar_url }: CreateUserDTO): Promise<User> {
    return await this.client.user.create({
      data: {
        name,
        email,
        avatar_url,
      }
    });
  }

  async getAll() {
    return await this.client.user.findMany();
  }

  async findByEmail(email: string) {
    return await this.client.user.findFirst({ where: { email } });
  };

  async findById(id: string) {
    return await this.client.user.findFirst({ where: { id } });
  }

  async update({ name, avatar_url, id, admin }: Update) {
    // let data: Omit<Update, 'id'> = {};

    // if (name && name.length > 0) {
    //   data.name = name;
    // }

    // if (avatar_url && avatar_url.length > 5) {
    //   data.avatar_url = avatar_url;
    // }

    // if (!data) {
    //   throw new Error('Do not update for empty data!');
    // }

    return await this.client.user.update({
      where: {
        id,
      },
      data: {
        admin,
        avatar_url,
        name
      }
    })
  }

  async delete(id: string) {
    await this.client.user.delete({ where: { id } });
  };
}