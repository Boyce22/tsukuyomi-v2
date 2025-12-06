import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { UUID } from '@utils';
import { Chapter, Manga, User } from '@models';
import { CommentaryStatus } from '@types';

@Entity('commentary')
export class Commentary {
  @PrimaryColumn('uuid')
  id: string = UUID.generate();

  @Column({ length: 300, nullable: false })
  value!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Manga, { nullable: false })
  manga!: Manga;

  @ManyToOne(() => Chapter, { nullable: true })
  chapter?: Chapter;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column({ type: 'enum', enum: CommentaryStatus, default: CommentaryStatus.ACTIVED })
  status!: CommentaryStatus;
}
