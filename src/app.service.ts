import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number) {
    const emojis = this.getEmojis();
    const emojiIndex =
      index !== undefined ? index : Math.floor(Math.random() * emojis.length);
    return emojis[emojiIndex];
  }
  getEmojis() {
    const allEmojis = [
      `🚀`,
      `🔥`,
      `👍`,
      `🙌`,
      `👋`,
      `👏`,
      `🎉`,
      `🤩`,
      `🥳`,
      `🤘`,
      `🤙`,
      `👌`,
      `👊`,
      `👀`,
    ];
    return allEmojis;
  }
}
