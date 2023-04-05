import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { DialogEntity } from '@app/dialog/dialog.entity';
import { MessageEntity } from '@app/message/message.entity';
import { ProductEntity } from '@app/product/product.entity';
import { CommentEntity } from '@app/comment/comment.entity';
import { ReactionsEntity } from '@app/reaction/reactions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CommentEntity,
      ReactionsEntity,
      DialogEntity,
      MessageEntity,
      ProductEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
