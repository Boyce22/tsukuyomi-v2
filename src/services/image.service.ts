import sharp, { Sharp } from 'sharp';

import { logger } from '@utils';
import { ImageCompressionError, UnsupportedImageFormatError } from '@exceptions';
import { IImageCompressorService, ImageCompressed, QualityCompress } from '@types';

export class ImageCompressionService implements IImageCompressorService {
  private readonly mimeEncoders: Record<string, (img: Sharp, quality: QualityCompress) => Sharp> = {
    'image/jpeg': (img, quality) => img.jpeg({ quality }),
    'image/png': (img, quality) => img.png({ quality }),
    'image/webp': (img, quality) => img.webp({ quality }),
    'image/avif': (img, quality) => img.avif({ quality }),
  };

  async compress(path: string, quality: QualityCompress, mime: string): Promise<ImageCompressed> {
    try {
      const image = sharp(path);
      const encoder = this.mimeEncoders[mime];

      if (!encoder) {
        throw new UnsupportedImageFormatError(`Unsupported image format: ${mime}`);
      }

      const compressed = await encoder(image.clone(), quality).toBuffer();
      
      const meta = await image.metadata();

      return { buffer: compressed, mimeType: `image/${meta.format}` };
    } catch (error) {
      logger.error(`Failed to compress image: ${(error as Error).message}`);
      throw new ImageCompressionError('Failed to compress image. Verify the image format.');
    }
  }
}
