import { Controller } from '@nestjs/common';
import { NotesService } from './notes.service';
import { dataBusMessagePatterns } from '../../static/message-patterns';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateNotePayload } from './types/create-note-payload.type';
import { FindUserNotesPayload } from './types/find-user-notes-payload.type';
import { FindOneNotePayload } from './types/find-one-note-payload.type';
import { UpdateNotePayload } from './types/update-note-payload.type';
import { RemoveNotePayload } from './types/remove-note-payload.type';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @MessagePattern(dataBusMessagePatterns.notes.createNote)
  createNote(@Payload() payload: CreateNotePayload) {
    return this.notesService.createNote(payload);
  }

  @MessagePattern(dataBusMessagePatterns.notes.findUserNotes)
  findUserNotes(@Payload() payload: FindUserNotesPayload) {
    return this.notesService.findUserNotes(payload);
  }

  @MessagePattern(dataBusMessagePatterns.notes.findOneNote)
  findOneNote(@Payload() payload: FindOneNotePayload) {
    return this.notesService.findOneNote(payload);
  }

  @MessagePattern(dataBusMessagePatterns.notes.updateNote)
  updateNote(@Payload() payload: UpdateNotePayload) {
    return this.notesService.updateNote(payload);
  }

  @MessagePattern(dataBusMessagePatterns.notes.removeNote)
  removeNote(@Payload() payload: RemoveNotePayload) {
    return this.notesService.removeNote(payload);
  }
}
