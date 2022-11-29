import { ConsoleLogger, Injectable } from '@nestjs/common'

@Injectable()
export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context)
    this.doSomething()
  }

  private doSomething() {
    // log 에 대한 부가 로직을 넣어준다.
    // ex. DB에 저장
  }
}
