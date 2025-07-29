import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { EmojiValidationPipe } from './common/emoji-validation/emoji-validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEmoji(@Query('index', EmojiValidationPipe) index?: number): string {
    console.log(`this is the index logged out of the emojii ${index}`);
    return this.appService.getEmoji(index);
  }
}
