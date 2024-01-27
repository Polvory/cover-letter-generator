import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';


@Injectable()
export class UsersService {

    constructor(@InjectModel(Users) private UsersRepository: typeof Users
    ) {
    }

    async create(dto: CreateUser) {
        const validate = await this.validate(String(dto.user_id))
        if (!validate) {
            const new_user = await this.UsersRepository.create(dto)
            return new_user
        } else {
            return validate
        }
    }

    async get() {
        return await this.UsersRepository.findAll()
    }

    async getByTgId(id: string) {
        const user = await this.UsersRepository.findOne({ where: { user_id: id } })
        if (user)
            return user
        else
            return true
    }

    async validate(id: string) {
        const user = await this.UsersRepository.findOne({ where: { user_id: id } })
        if (user)
            return user
        else
            return false
    }

    async edite_name_to_generate(id: string, value: string) {
        const validate = await this.validate(String(id))
        if (!validate)
            return false
        validate.name_to_generate = value
        validate.save()
        return true
    }

    async edite_achievements(id: string, value: string) {
        const validate = await this.validate(String(id))
        if (!validate)
            return false
        validate.achievements = value
        validate.save()
        return true
    }


}
