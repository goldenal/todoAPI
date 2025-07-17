import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { User } from '../auth/user.decorator';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todosService.create(createTodoDto, req.user.userId);
  }

  @Get()
  async findAll(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('completed') completed?: string,
    @Query('search') search?: string,
  ) {
    return this.todosService.findAll(
      req.user.userId,
      Number(page),
      Number(limit),
      completed !== undefined ? completed === 'true' : undefined,
      search,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.todosService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todosService.update(id, updateTodoDto, req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.todosService.remove(id, req.user.userId);
  }
}
