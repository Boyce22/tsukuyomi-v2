import { Entity, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

import { UUID } from '@utils';
import { Page, User, Manga } from '@models';

@Entity('chapter')
export class Chapter {
  @PrimaryColumn('uuid')
  id: string = UUID.generate()

  @Column({ type: 'int' })
  number!: number; // número do capítulo

  @Column({ length: 255 })
  title!: string;

  @Column({ nullable: true, length: 1024 })
  summary?: string;

  @Column({ type: 'timestamptz', nullable: true })
  releaseDate?: Date;

  @Column({ default: false })
  isMature!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  viewCount!: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Manga, (manga) => manga.chapters, { nullable: false, onDelete: 'CASCADE' })
  manga!: Manga;

  @ManyToOne(() => User, (user) => user.createdChapters, { nullable: true })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @OneToMany(() => Page, (page) => page.chapter, { cascade: true })
  pages!: Page[];
}
