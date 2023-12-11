import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/User';
import { RegisterUserDTO } from '../dto/User';

class UserRepository {
    private userRepository: Repository<User>;

    constructor(private readonly dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User);
    }

    async createUser(user: RegisterUserDTO): Promise<User> {        
        return await this.userRepository.save(user)
    }

    async findById(id: number): Promise<User | null> {        
        return await this.userRepository.findOne({ where: { id: id }})
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where : { email: email} });
      }
    
}

export { UserRepository };