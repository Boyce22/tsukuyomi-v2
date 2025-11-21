import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MangaStatus } from '@types';

import { Tag, User, Chapter } from '@models';

@Entity('manga')
export class Manga {
  @PrimaryGeneratedColumn('increment')
  id!: number;

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

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'enum', enum: MangaStatus, default: MangaStatus.ACTIVE })
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
}
