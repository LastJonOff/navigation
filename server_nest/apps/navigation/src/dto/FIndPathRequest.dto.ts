import { IsOptional } from 'class-validator';

export class FindPathRequest {
  @IsOptional()
  graph: any;

  @IsOptional()
  startVertex: string;
}
