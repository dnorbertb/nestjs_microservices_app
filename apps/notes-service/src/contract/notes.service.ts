import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { notesServiceMessagePatterns } from '../static/message-patterns';
import { CreateNotePayload } from '../data/notes/types/create-note-payload.type';
import { FindUserNotesPayload } from '../data/notes/types/find-user-notes-payload.type';
import { FindOneNotePayload } from '../data/notes/types/find-one-note-payload.type';
import { UpdateNotePayload } from '../data/notes/types/update-note-payload.type';
import { RemoveNotePayload } from '../data/notes/types/remove-note-payload.type';
import { NotesService as DataModuleNotesService } from '../data/notes/notes.service';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_SERVICE_CLIENT') private usersServiceClient: ClientProxy,
  ) {}

  async createNote(
    payload: CreateNotePayload,
  ): ReturnType<DataModuleNotesService['createNote']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        notesServiceMessagePatterns.createNote,
        payload,
      ),
    );
  }

  async findUserNotes(
    payload: FindUserNotesPayload,
  ): ReturnType<DataModuleNotesService['findUserNotes']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        notesServiceMessagePatterns.findUserNotes,
        payload,
      ),
    );
  }

  async findOneNote(
    payload: FindOneNotePayload,
  ): ReturnType<DataModuleNotesService['findOneNote']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        notesServiceMessagePatterns.findOneNote,
        payload,
      ),
    );
  }

  async updateNote(
    payload: UpdateNotePayload,
  ): ReturnType<DataModuleNotesService['updateNote']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        notesServiceMessagePatterns.updateNote,
        payload,
      ),
    );
  }

  async removeNote(
    payload: RemoveNotePayload,
  ): ReturnType<DataModuleNotesService['removeNote']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        notesServiceMessagePatterns.removeNote,
        payload,
      ),
    );
  }
}
