import { DataSource } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constant';
import { LoginUserDTO, RegisterUserDTO } from '../dto/User';

class UserService {
    private userRepository: UserRepository;
  
    constructor(private readonly dataSource: DataSource) {
      this.userRepository = new UserRepository(dataSource);
    }

  async registerUser({ name, email, password }: RegisterUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
        
    if (existingUser) {       
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
        
    return await this.userRepository.createUser({name, email, password: hashedPassword});
  }

  async userProfile(token: string): Promise<User | null> {
    const user = await this.verifyToken(token);    
    const userInfo = await this.userRepository.findById(user);
    
    if(!userInfo) {
      throw new Error('User not exists!')
    }

    return userInfo;
  }

  async loginUser({ email, password }: LoginUserDTO): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
        throw new Error('User not found');
      }
      
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = this.generateToken(user.id);

    return token;
  }

  private generateToken(userId: number): string {
    // Create a JWT token with the user ID
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1m' });
    return token;
  }

  async verifyToken(token: string): Promise<number> {
    try {
      // Verify the JWT token
      const decodedToken: any = jwt.verify(token, JWT_SECRET);

      // Extract the user ID from the decoded token
      const userId = decodedToken.userId;

      return userId;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export { UserService };
