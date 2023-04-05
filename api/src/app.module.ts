import ormconfig from '@app/ormconfig';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ProductModule } from '@app/product/product.module';
import { DialogModule } from './dialog/dialog.module';
import { MessageModule } from '@app/message/message.module';
import { ServicesModule } from '@app/services/services.module';
import { CommentModule } from '@app/comment/comment.module';
import { ReactionsModule } from '@app/reaction/reactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    ProductModule,
    DialogModule,
    MessageModule,
    ServicesModule,
    CommentModule,
    ReactionsModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
