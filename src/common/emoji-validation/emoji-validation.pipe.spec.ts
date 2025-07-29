import { BadRequestException } from '@nestjs/common';
import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const emojiValidation = new EmojiValidationPipe();
  it('should be defined', () => {
    expect(emojiValidation).toBeDefined();
  });

  it('should return number when value is defined', () => {
    const result = emojiValidation.transform('5');
    expect(result).toBe(5);
  });

  it('should return undefined if no value is passed into the pipe', () => {
    const result = emojiValidation.transform();
    expect(result).toBeUndefined();
  });

  it('should throw a BadRequestException if the value is not a number', () => {
    const result = () => emojiValidation.transform('string');
    expect(result).toThrow(BadRequestException);
  });
  it('should throw a BadRequestException if the value is less that 0', () => {
    const result = () => emojiValidation.transform('-1');
    expect(result).toThrow(BadRequestException);
  });
  it('should throw a BadRequestException if the value is greater that 13', () => {
    const result = () => emojiValidation.transform('14');
    expect(result).toThrow(BadRequestException);
  });
});
