import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'user',
    description: 'Role name',
  })
  @IsString({ message: 'Role name must be a string' })
  @IsNotEmpty({ message: 'Role name cannot be empty' })
  name: string;
}
