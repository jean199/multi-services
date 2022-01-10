import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should call a geoip request', async () => {
    expect(
      await appController.getDataFromService({
        services: [
          {
            source: '8.8.88.8',
            tasks: ['geoIp'],
          },
        ],
      }),
    ).toEqual([
      {
        source: '8.8.88.8',
        geoip: {
          range: [expect.any(Number), expect.any(Number)],
          country: expect.any(String),
          region: expect.any(String),
          eu: expect.any(String),
          timezone: expect.any(String),
          city: expect.any(String),
          ll: [expect.any(Number), expect.any(Number)],
          metro: expect.any(Number),
          area: expect.any(Number),
        },
      },
    ]);
  });

  it('should call a ping request', async () => {
    expect(
      await appController.getDataFromService({
        services: [
          {
            source: 'google.com',
            tasks: ['ping'],
          },
        ],
      }),
    ).toEqual([
      {
        source: 'google.com',
        ping: {
          inputHost: expect.any(String),
          host: expect.any(String),
          alive: expect.any(Boolean),
          output: expect.any(String),
          time: expect.any(Number),
          times: [expect.any(Number)],
          min: expect.any(String),
          max: expect.any(String),
          avg: expect.any(String),
          stddev: expect.any(String),
          packetLoss: expect.any(String),
          numeric_host: expect.any(String),
        },
      },
    ]);
  });

  it('should call a ReverseDns request', async () => {
    expect(
      await appController.getDataFromService({
        services: [
          {
            source: 'facebook.com',
            tasks: ['reverseDns'],
          },
        ],
      }),
    ).toEqual([
      {
        source: 'facebook.com',
        reverseDns: [expect.any(String)],
      },
    ]);
  });

  it('should call a RDAP request', async () => {
    expect(
      await appController.getDataFromService({
        services: [
          {
            source: '157.240.0.0',
            tasks: ['RDAP'],
          },
        ],
      }),
    ).toEqual([
      {
        source: '157.240.0.0',
        rdap: {
          name: expect.any(String),
          registrant: expect.any(String),
          expiration: undefined,
          asn: expect.any(String),
          registration: expect.anything(),
          registrar: undefined,
          cidr: expect.any(String),
          abuse: expect.any(String),
        },
      },
    ]);
  });

  it('should throw a HttpException', async () => {
    try {
      await appController.getDataFromService({
        services: [
          {
            source: 'jean.murilloalpizar.com',
            tasks: ['ping'],
          },
        ],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
