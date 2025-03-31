import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entity/note.entity';
import { CreateNotePayload } from './types/create-note-payload.type';
import { FindUserNotesPayload } from './types/find-user-notes-payload.type';
import { FindOneNotePayload } from './types/find-one-note-payload.type';
import { UpdateNotePayload } from './types/update-note-payload.type';
import { RemoveNotePayload } from './types/remove-note-payload.type';
import { BaseResponse } from 'common/dto/base-response.dto';
import { PaginatedData } from 'common/dto/paginated-data.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  async createNote(payload: CreateNotePayload) {
    try {
      const { creatorId: ownerId, content } = payload;
      const entity = this.noteRepository.create({ ownerId, content });
      const result = await this.noteRepository.save(entity);

      return new BaseResponse({
        data: result,
        statusCode: HttpStatus.CREATED,
      });
    } catch (error) {
      Logger.error('Error creating new note', error, 'NOTES SERVICE');
      return new BaseResponse({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findUserNotes(payload: FindUserNotesPayload) {
    try {
      const {
        ownerId,
        page = 1,
        perPage = 10,
        sortOrder = 'DESC',
        sortBy = 'updatedAt',
        search = '',
      } = payload;

      const query = {
        ownerId,
        content: ILike(`%${search}%`),
      };

      const totalItems = await this.noteRepository.count({ where: query });
      const totalPages = Math.ceil(totalItems / perPage);
      const nextPage = page + 1 < totalPages ? page + 1 : null;
      const previousPage = page > 1 ? page - 1 : null;

      const docs = await this.noteRepository.find({
        order: { [sortBy]: sortOrder },
        where: query,
        skip: (page - 1) * perPage,
        take: perPage,
      });

      const data = new PaginatedData({
        docs,
        currentPage: page,
        perPage,
        totalItems,
        totalPages,
        nextPage,
        previousPage,
      });

      return new BaseResponse({
        statusCode: HttpStatus.OK,
        data,
      });
    } catch (error) {
      Logger.error('Error finding user notes', error, 'NOTES SERVICE');
      return new BaseResponse({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findOneNote(payload: FindOneNotePayload) {
    try {
      const { id } = payload;

      const item = await this.noteRepository.findOneBy({ id });
      if (!item) {
        return new BaseResponse({
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      return new BaseResponse({
        statusCode: HttpStatus.OK,
        data: item,
      });
    } catch (error) {
      Logger.error('Error finding note', error, 'NOTES SERVICE');
      return new BaseResponse({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async updateNote(payload: UpdateNotePayload) {
    try {
      const { id, content } = payload;
      const noteEntity = await this.noteRepository.findOneBy({ id });

      if (!noteEntity) {
        return new BaseResponse({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Requested note not found',
        });
      }

      noteEntity.content = content;
      const saveResult = await this.noteRepository.save(noteEntity);
      return new BaseResponse({
        data: saveResult,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      Logger.error('Error updating note', error, 'NOTES SERVICE');
      return new BaseResponse({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async removeNote(payload: RemoveNotePayload) {
    try {
      const { id } = payload;
      const noteEntity = await this.noteRepository.findOneBy({ id });

      if (!noteEntity) {
        return new BaseResponse({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Requested note not found',
        });
      }

      await this.noteRepository.remove(noteEntity);

      return new BaseResponse({
        statusCode: HttpStatus.OK,
        data: {
          removedItemsCount: 1,
        },
      });
    } catch (error) {
      Logger.error('Error removing note', error, 'NOTES SERVICE');
      return new BaseResponse({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
