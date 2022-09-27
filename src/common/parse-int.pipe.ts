import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valueToNumber = parseInt(value, 10);
    if (isNaN(valueToNumber)) {
      throw new BadRequestException(`This param ${value} is not a number`);
    }
    return valueToNumber;
  }
}
