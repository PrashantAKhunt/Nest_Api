import {Test} from '@nestjs/testing';
import { AppModule } from 'src/app.module';


describe('App e2e',()=>{
  beforeAll(async () => {
    const modulRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();
  });

  it.todo('should be defined');
})