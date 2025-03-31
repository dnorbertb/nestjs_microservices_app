import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  content: string;
}
