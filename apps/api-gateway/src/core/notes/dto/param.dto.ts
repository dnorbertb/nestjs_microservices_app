import { IsInt, IsNumber, Min } from 'class-validator';

export class ParamDTO {
  @Min(0)
  @IsInt()
  id: number;
}
