import { HttpStatus, Injectable } from '@nestjs/common';
import { NotesService as NotesAppService } from 'apps/notes-service/src/contract/notes.service';
import { CreateNotePayload } from './types/create-note-payload.type';
import { FindUserNotesPayload } from './types/find-user-notes-payload.type';
import { FindOneNotePayload } from './types/find-one-note-payload.type';
import { UpdateNotePayload } from './types/update-note-payload.type';
import { RemoveNotePayload } from './types/remove-note-payload.type';
import { BaseResponse } from 'common/dto/base-response.dto';

@Injectable()
export class NotesService {
  constructor(private readonly notesAppService: NotesAppService) {}

  async createNote(payload: CreateNotePayload) {
    return this.notesAppService.createNote(payload);
  }

  async findUserNotes(payload: FindUserNotesPayload) {
    return this.notesAppService.findUserNotes(payload);
  }

  async findOneNote(payload: FindOneNotePayload) {
    const { noteId, userId } = payload;
    const noteRequestResult = await this.notesAppService.findOneNote({
      id: noteId,
    });

    if (noteRequestResult.statusCode !== HttpStatus.OK) {
      return noteRequestResult;
    }

    if (noteRequestResult.data?.ownerId != userId) {
      return new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    return noteRequestResult;
  }

  async updateNote(payload: UpdateNotePayload) {
    const { noteId, userId, content } = payload;
    const noteRequestResult = await this.notesAppService.findOneNote({
      id: noteId,
    });

    if (noteRequestResult.statusCode !== HttpStatus.OK) {
      return noteRequestResult;
    }

    if (noteRequestResult.data?.ownerId != userId) {
      return new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    const updateResult = await this.notesAppService.updateNote({
      id: noteId,
      content,
    });

    return updateResult;
  }

  async removeNote(payload: RemoveNotePayload) {
    const { noteId, userId } = payload;
    const noteRequestResult = await this.notesAppService.findOneNote({
      id: noteId,
    });

    if (noteRequestResult.statusCode !== HttpStatus.OK) {
      return noteRequestResult;
    }

    if (noteRequestResult.data?.ownerId != userId) {
      return new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    const removeResult = await this.notesAppService.removeNote({ id: noteId });

    return removeResult;
  }
}
