import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { dataBusMessagePatterns } from '../static/message-patterns';
import { CreateNotePayload } from '../core/notes/types/create-note-payload.type';
import { FindUserNotesPayload } from '../core/notes/types/find-user-notes-payload.type';
import { FindOneNotePayload } from '../core/notes/types/find-one-note-payload.type';
import { UpdateNotePayload } from '../core/notes/types/update-note-payload.type';
import { RemoveNotePayload } from '../core/notes/types/remove-note-payload.type';
import { BaseResponse } from 'common/dto/base-response.dto';
import { NoteData } from '../core/notes/types/note-data.type';

@Injectable()
export class DataBusNotesService {
  constructor(
    @Inject('DATA_BUS_SERVICE_CLIENT') private dataBusClient: ClientProxy,
  ) {}

  async createNote(@Payload() payload: CreateNotePayload) {
    return await lastValueFrom(
      this.dataBusClient.send(dataBusMessagePatterns.notes.createNote, payload),
    );
  }

  async findUserNotes(@Payload() payload: FindUserNotesPayload) {
    return await lastValueFrom(
      this.dataBusClient.send(
        dataBusMessagePatterns.notes.findUserNotes,
        payload,
      ),
    );
  }

  async findOneNote(
    @Payload() payload: FindOneNotePayload,
  ): Promise<BaseResponse<NoteData>> {
    return await lastValueFrom(
      this.dataBusClient.send(
        dataBusMessagePatterns.notes.findOneNote,
        payload,
      ),
    );
  }

  async updateNote(
    @Payload() payload: UpdateNotePayload,
  ): Promise<BaseResponse<NoteData>> {
    return await lastValueFrom(
      this.dataBusClient.send(dataBusMessagePatterns.notes.updateNote, payload),
    );
  }

  async removeNote(
    @Payload() payload: RemoveNotePayload,
  ): Promise<BaseResponse<{ removedItemsCount: number }>> {
    return await lastValueFrom(
      this.dataBusClient.send(dataBusMessagePatterns.notes.removeNote, payload),
    );
  }
}
