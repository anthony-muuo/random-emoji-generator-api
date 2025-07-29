import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value?: string) {
    if (!value) return;
    const index = parseInt(value);

    if (isNaN(index)) {
      throw new BadRequestException(
        `validation failed: ${value} is not a number`,
      );
    }
    if (index < 0 || index >= 14) {
      // As there are 14 emojis in your list.
      throw new BadRequestException(
        'Emoji index out of range.the range is 0-13',
      );
    }
    return index;
  }
}
