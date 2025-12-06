import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { MangaStatus } from '@types';

import { Tag, User, Chapter, Commentary } from '@models';
import { UUID } from '@utils';

@Entity('manga')
export class Manga {
  @PrimaryColumn('uuid')
  id: string = UUID.generate();

  @Column({ length: 255 })
  title!: string;

  @Column({ nullable: true, length: 1024 })
  description?: string;

  @Column({ length: 255 })
  coverUrl!: string;

  @Column({ length: 255, nullable: true })
  bannerUrl?: string;

  @Column({ default: false })
  isMature!: boolean;

  @Column({ type: 'enum', enum: MangaStatus, default: MangaStatus.ACTIVED })
  status!: MangaStatus;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @Column({ type: 'float', nullable: true })
  rating?: number;

  @Column({ default: 0 })
  viewCount!: number;

  @Column({ default: 0 })
  favoriteCount!: number;

  @Column({ nullable: true, length: 255 })
  author?: string;

  @Column({ nullable: true, length: 255 })
  artist?: string;

  @Column({ nullable: true, length: 255 })
  publisher?: string;

  @ManyToOne(() => User, (user) => user.createdMangas, { nullable: true })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @ManyToMany(() => Tag, (tag) => tag.mangas, { cascade: true })
  @JoinTable({ name: 'manga_tag' })
  tags!: Tag[];

  @OneToMany(() => Chapter, (chapter) => chapter.manga, { cascade: true })
  chapters!: Chapter[];

  @OneToMany(() => Commentary, (commentary) => commentary.manga, { cascade: true })
  comments!: Commentary[];

  @Column({ type: 'int', default: 0 })
  chapterCount!: number;
}
