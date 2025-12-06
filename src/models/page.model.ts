import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

import { Chapter, User } from '@models';
import { UUID } from '@utils';

@Entity('page')
export class Page {
  @PrimaryColumn('uuid')
  id: string = UUID.generate();

  @Column({ type: 'int' })
  number!: number; // número da página no capítulo

  @Column({ length: 255 })
  imageUrl!: string; // URL da imagem

  @Column({ length: 255, nullable: true })
  thumbnailUrl?: string; // miniatura (opcional)

  @Column({ type: 'float', nullable: true })
  fileSize?: number; // tamanho do arquivo em MB ou KB

  @Column({ length: 10, nullable: true })
  format?: string; // ex: jpg, png, webp

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Chapter, (chapter) => chapter.pages, { nullable: false, onDelete: 'CASCADE' })
  chapter!: Chapter;

  @ManyToOne(() => User, (user) => user.createdPages, { nullable: true })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;
}
