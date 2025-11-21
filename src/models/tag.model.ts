import { User, Manga } from '@models';

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ length: 255 })
  description!: string;

  @ManyToMany(() => Manga, (manga) => manga.tags)
  mangas!: Manga[];

  @ManyToOne(() => User, (user) => user.createdTags)
  createdBy!: User;

  @ManyToOne(() => User, (user) => user.updatedTags)
  updatedBy!: User;
}
