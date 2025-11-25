import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CodeService } from './code.service';
// import { UpdateCodeDto } from './dto/update-code.dto';
import { RequestCodeDto } from './dto/request-code-dto';
import { VerifyCodeDto } from './dto/verify-code-dto';

@Controller('api')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post('/code/request')
  requestCode(@Body() createCodeDto: RequestCodeDto): Promise<{ token: string }> {
    return this.codeService.requestCode(createCodeDto);
  }

 @Post('/code/verify')
  verifyCode(@Body() verifyCodeDto: VerifyCodeDto):Promise<{ success: boolean }> { 
    return this.codeService.verifyCode(verifyCodeDto); 
  }

  @Get()
  findAll() {
    return this.codeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeService.findOne(+id);
  }

  @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
  //   return this.codeService.update(+id, updateCodeDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeService.remove(+id);
  }
}
