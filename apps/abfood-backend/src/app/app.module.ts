import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // AngularUniversalModule.forRoot({
    //   viewsPath: join(process.cwd(), 'dist/browser'),
    //   bootstrap: AppModule
    //   // bundle: require('../server/main'),
    //   // liveReload: true
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
