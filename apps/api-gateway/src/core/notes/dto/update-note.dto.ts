import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDTO {
  @IsString()
  @IsNotEmpty()
  content: string;
}
