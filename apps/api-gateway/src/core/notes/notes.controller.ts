import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Query,
  Res,
  HttpStatus,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateNoteDTO } from './dto/create-note.dto';
import { User } from '../../types/user.type';
import { ReqUser } from '../../decorators/req-user.decorator';
import { FindUserNotesQueryDTO } from './dto/find-user-notes.dto';
import { DataBusNotesService } from 'apps/data-bus/src/contract/notes.service';
import { Response } from 'express';
import { BaseResponse } from 'common/dto/base-response.dto';
import { ParamDTO } from './dto/param.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@Controller('notes')
export class NotesController {
  constructor(private readonly dataBusNotesService: DataBusNotesService) {}

  @Post()
  async create(
    @Body() createNoteDto: CreateNoteDTO,
    @ReqUser() user: User | null,
    @Res() res: Response,
  ) {
    if (!user?.id) {
      const response = new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
      res.status(response.statusCode).send(response);
      return;
    }

    const result = await this.dataBusNotesService.createNote({
      ...createNoteDto,
      creatorId: user.id,
    });

    res.status(result.statusCode).send(result);
  }

  @Get()
  async findAll(
    @Query() query: FindUserNotesQueryDTO,
    @ReqUser() user: User | null,
    @Res() res: Response,
  ) {
    if (!user?.id) {
      const response = new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
      res.status(response.statusCode).send(response);
      return;
    }

    const result = await this.dataBusNotesService.findUserNotes({
      ...query,
      ownerId: user.id,
    });

    res.status(result.statusCode).send(result);
  }

  @Get(':id')
  async findOne(
    @Param() params: ParamDTO,
    @ReqUser() user: User | null,
    @Res() res: Response,
  ) {
    if (!user?.id) {
      const response = new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
      res.status(response.statusCode).send(response);
      return;
    }

    const fetchResult = await this.dataBusNotesService.findOneNote({
      noteId: params.id,
      userId: user.id,
    });

    res.status(fetchResult.statusCode).send(fetchResult);
  }

  @Patch(':id')
  async update(
    @Param() params: ParamDTO,
    @Body() body: UpdateNoteDTO,
    @ReqUser() user: User | null,
    @Res() res: Response,
  ) {
    if (!user?.id) {
      const response = new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
      res.status(response.statusCode).send(response);
      return;
    }

    const fetchResult = await this.dataBusNotesService.updateNote({
      noteId: params.id,
      userId: user.id,
      content: body.content,
    });

    res.status(fetchResult.statusCode).send(fetchResult);
  }

  @Delete(':id')
  async remove(
    @Param() params: ParamDTO,
    @ReqUser() user: User | null,
    @Res() res: Response,
  ) {
    if (!user?.id) {
      const response = new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
      res.status(response.statusCode).send(response);
      return;
    }
    const result = await this.dataBusNotesService.removeNote({
      noteId: params.id,
      userId: user.id,
    });

    res.status(result.statusCode).send(result);
  }
}
