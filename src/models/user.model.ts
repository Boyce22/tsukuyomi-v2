import { Tag, Manga, Chapter, Page, UserRole } from '@models';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ unique: true, length: 50 })
  userName!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ length: 255, nullable: true })
  biography!: string;

  @Column({ length: 300, nullable: true })
  address!: string

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ nullable: true, length: 255 })
  profilePictureUrl?: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastPasswordChange!: Date | null;

  @Column({ nullable: true, length: 255 })
  bannerUrl?: string;

  @OneToMany(() => Manga, (manga) => manga.createdBy)
  createdMangas!: Manga[];

  @OneToMany(() => Manga, (manga) => manga.updatedBy)
  updatedMangas!: Manga[];

  @OneToMany(() => Chapter, (chapter) => chapter.createdBy)
  createdChapters!: Chapter[];

  @OneToMany(() => Chapter, (chapter) => chapter.updatedBy)
  updatedChapters!: Chapter[];

  @OneToMany(() => Page, (page) => page.createdBy)
  createdPages!: Page[];

  @OneToMany(() => Page, (page) => page.updatedBy)
  updatedPages!: Page[];

  @OneToMany(() => Tag, (tag) => tag.createdBy)
  createdTags!: Tag[];

  @OneToMany(() => Tag, (tag) => tag.updatedBy)
  updatedTags!: Tag[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles!: UserRole[];
}
