import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from './location/locations.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'conectaserv1',
      entities: [],
      synchronize: true,
}), LocationsModule, CategoryModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
