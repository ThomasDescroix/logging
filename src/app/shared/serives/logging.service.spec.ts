import { TestBed } from '@angular/core/testing';
import { LogLevel } from '@shared/enums/log-level.enum';
import { environment } from 'src/environments/environment';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;
  const message = 'test';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set logLevel to logLevel from environment', () => {
    expect(service['logLevel']).toBe(environment.logLevel);
  });

  it('should call log with DEBUG log level and message', () => {
    spyOn<any>(service, 'log');
    service.debug(message);
    expect(service['log']).toHaveBeenCalledWith(LogLevel.DEBUG, message);
  });

  it('should call log with INFO log level and message', () => {
    spyOn<any>(service, 'log');
    service.info(message);
    expect(service['log']).toHaveBeenCalledWith(LogLevel.INFO, message);
  });

  it('should call log with WARN log level and message', () => {
    spyOn<any>(service, 'log');
    service.warn(message);
    expect(service['log']).toHaveBeenCalledWith(LogLevel.WARN, message);
  });

  it('should call log with ERROR log level and message', () => {
    spyOn<any>(service, 'log');
    service.error(message);
    expect(service['log']).toHaveBeenCalledWith(LogLevel.ERROR, message);
  });

  describe('log', () => {
    beforeEach(() => {
      service['logLevel'] = LogLevel.DEBUG;
    });

    it('should log a message at the DEBUG level', () => {
      spyOn(console, 'debug');
      service['log'](LogLevel.DEBUG, message);
      expect(console.debug).toHaveBeenCalledWith(message);
    });

    it('should log a message at the INFO level', () => {
      spyOn(console, 'info');
      service['log'](LogLevel.INFO, message);
      expect(console.info).toHaveBeenCalledWith(message);
    });

    it('should log a message at the WARN level', () => {
      spyOn(console, 'warn');
      service['log'](LogLevel.WARN, message);
      expect(console.warn).toHaveBeenCalledWith(message);
    });

    it('should log a message at the ERROR level', () => {
      spyOn(console, 'error');
      service['log'](LogLevel.ERROR, message);
      expect(console.error).toHaveBeenCalledWith(message);
    });

    it('should not log a message at the NONE level', () => {
      spyOn(console, 'log');
      service['log'](LogLevel.NONE, message);
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('shouldLog', () => {
    it('should return false if the log level is NONE', () => {
      service['logLevel'] = LogLevel.NONE;
      expect(service['shouldLog'](LogLevel.DEBUG)).toBe(false);
    });

    it('should return false if the log level is less than ERROR', () => {
      service['logLevel'] = LogLevel.ERROR;
      expect(service['shouldLog'](LogLevel.DEBUG)).toBe(false);
      expect(service['shouldLog'](LogLevel.INFO)).toBe(false);
      expect(service['shouldLog'](LogLevel.WARN)).toBe(false);
    });

    it('should return false if the log level is less than WARN', () => {
      service['logLevel'] = LogLevel.WARN;
      expect(service['shouldLog'](LogLevel.DEBUG)).toBe(false);
      expect(service['shouldLog'](LogLevel.INFO)).toBe(false);
    });

    it('should return false if the log level is less than INFO', () => {
      service['logLevel'] = LogLevel.INFO;
      expect(service['shouldLog'](LogLevel.DEBUG)).toBe(false);
    });

    it('should return true if the log level is greater than or equal to DEBUG', () => {
      service['logLevel'] = LogLevel.DEBUG;
      expect(service['shouldLog'](LogLevel.DEBUG)).toBe(true);
      expect(service['shouldLog'](LogLevel.INFO)).toBe(true);
      expect(service['shouldLog'](LogLevel.WARN)).toBe(true);
      expect(service['shouldLog'](LogLevel.ERROR)).toBe(true);
    });

    it('should return true if the log level is greater than or equal to INFO', () => {
      service['logLevel'] = LogLevel.INFO;
      expect(service['shouldLog'](LogLevel.INFO)).toBe(true);
      expect(service['shouldLog'](LogLevel.WARN)).toBe(true);
      expect(service['shouldLog'](LogLevel.ERROR)).toBe(true);
    });

    it('should return true if the log level is greater than or equal to WARN', () => {
      service['logLevel'] = LogLevel.WARN;
      expect(service['shouldLog'](LogLevel.WARN)).toBe(true);
      expect(service['shouldLog'](LogLevel.ERROR)).toBe(true);
    });

    it('should return true if the log level is greater than or equal to ERROR', () => {
      service['logLevel'] = LogLevel.ERROR;
      expect(service['shouldLog'](LogLevel.ERROR)).toBe(true);
    });
  });
});
