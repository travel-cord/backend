import { Controller, Get, Body, Patch, Param, Delete, Logger } from '@nestjs/common'
import { UpdateUserDto } from '@user/interface/dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly logger: Logger) {}

  @Get()
  findAll() {
    return
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return
  }
}
