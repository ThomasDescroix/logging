import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogLevel } from '@shared/enums/log-level.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logLevel: LogLevel = environment.logLevel;

  debug(message: any): void {
    this.log(LogLevel.DEBUG, message);
  }

  info(message: any): void {
    this.log(LogLevel.INFO, message);
  }

  warn(message: any): void {
    this.log(LogLevel.WARN, message);
  }

  error(message: any): void {
    this.log(LogLevel.ERROR, message);
  }

  private log(level: LogLevel, message: any): void {
    if (this.shouldLog(level)) {
      switch(level) {
        case LogLevel.DEBUG:
          console.debug(message);
          break;
        case LogLevel.INFO:
          console.info(message);
          break;
        case LogLevel.WARN:
          console.warn(message);
          break;
        case LogLevel.ERROR:
          console.error(message);
          break;
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel && level !== LogLevel.NONE;
  }
}
