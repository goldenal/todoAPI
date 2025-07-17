import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    return this.todoModel.create({ ...createTodoDto, user: userId });
  }

  async findAll(userId: string, page = 1, limit = 10, completed?: boolean, search?: string) {
    const filter: FilterQuery<TodoDocument> = { user: userId };
    if (completed !== undefined) filter.completed = completed;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const todos = await this.todoModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const total = await this.todoModel.countDocuments(filter);
    return { data: todos, total, page, limit };
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id, user: userId });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string): Promise<Todo> {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id, user: userId },
      updateTodoDto,
      { new: true },
    );
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.todoModel.deleteOne({ _id: id, user: userId });
    if (result.deletedCount === 0) throw new NotFoundException('Todo not found');
  }
}
