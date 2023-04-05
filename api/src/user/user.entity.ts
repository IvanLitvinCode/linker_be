import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ProductEntity } from '@app/product/product.entity';
import { DialogEntity } from '@app/dialog/dialog.entity';
import { MessageEntity } from '@app/message/message.entity';
import { CommentEntity } from '@app/comment/comment.entity';
import { ReactionsEntity } from '@app/reaction/reactions.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  phonenumber: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  telegram: string;

  @Column({ default: '' })
  whatsapp: string;

  @Column({ default: '' })
  viber: string;

  @Column({ default: 0 })
  rate: number;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  dislikesCount: number;

  @Column({ default: 0 })
  reactionsCount: number;

  @Column({ default: 0 })
  addedToFavoritesCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ select: false })
  password: string;

  @BeforeUpdate()
  updateReactionsCount() {
    this.reactionsCount = this.likesCount + this.dislikesCount;
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ProductEntity, (product) => product.author)
  products: ProductEntity[];

  @OneToMany(() => MessageEntity, (product) => product.sender)
  messages: MessageEntity[];

  @OneToMany(() => DialogEntity, (dialog) => dialog.owner)
  dialogs: DialogEntity[];

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  favorites: ProductEntity[];

  @OneToMany((type) => CommentEntity, (comment) => comment.targetUser)
  comments: CommentEntity[];

  @OneToMany((type) => ReactionsEntity, (reaction) => reaction.targetUser)
  reaction: ReactionsEntity[];
}
