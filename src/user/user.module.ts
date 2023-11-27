import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
