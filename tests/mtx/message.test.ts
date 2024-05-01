/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as message from '../../src/mtx/message/index.js';
//import * as command from '../../src/mtx/utils/command.js';
//import CommandBinaryBuffer from '../../src/mtx/utils/CommandBinaryBuffer.js';
import * as downlinkCommands from '../../src/mtx/commands/downlink/index.js';
import * as uplinkCommands from '../../src/mtx/commands/uplink/index.js';
import getHexFromBytes from '../../src/utils/getHexFromBytes.js';
import getBytesFromHex from '../../src/utils/getBytesFromHex.js';
import * as accessLevels from '../../src/mtx/constants/accessLevels.js';
import * as frameTypes from '../../src/mtx/constants/frameTypes.js';
//import * as meterTypes from '../../src/mtx/constants/meterTypes.js';
//import * as directions from '../../src/constants/directions.js';
//import {ACCESS_DENIED} from '../../src/mtx/constants/resultCodes.js';
import {TBytes} from '../../src/types.js';


interface IMessage {
    name: string,
    hex: string,
    frameHex: string,
    messageId: number,
    accessLevel: number,
    //direction: number,
    commands: any,
    //commands: Array<Command>,
    lrc: number,
    frameType: number,
    source: number,
    destination: number,
    crc: number
}

type TMessageList = Array<IMessage>;

const aesKey = [...Array(16).keys()];

const downlinkMessages: TMessageList = [
    {
        name: 'activateRatePlan',
        hex: '10 12 3e 80 82 b2 b5 66 0c 08 4a 49 c2 50 0c 1e f8 19 92 f8 d0 25 88 de 70 d1 60 24 7c 53 4a 6b 64 d0',
        frameHex: '7e 50 a8 a9 f5 f6 10 12 3e 80 82 b2 b5 66 0c 08 4a 49 c2 50 0c 1e f8 19 92 f8 d0 25 88 de 70 d1 60 24 7c 53 4a 6b 64 d0 87 75 7e',
        messageId: 16,
        accessLevel: downlinkCommands.activateRatePlan.accessLevel,
        commands: [
            downlinkCommands.activateRatePlan.examples['set rate plan request']
        ],
        lrc: 0x50,
        crc: 0x8775,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xf5f6,
        destination: 0xa8a9
    },
    {
        name: 'getBuildVersion',
        hex: '0a 13 2e a2 48 fd 55 cd 7b a3 d0 b0 c5 3d 2b 18 05 29',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 2e a2 48 fd 55 cd 7b a3 d0 b0 c5 3d 2b 18 05 29 30 fc 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getBuildVersion.accessLevel,
        commands: [
            downlinkCommands.getBuildVersion.examples['simple request']
        ],
        lrc: 0x36,
        crc: 0x30fc,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getCorrectTime',
        hex: '0a 13 8d 17 1d ad d8 2f 50 e5 0f ca a3 20 8d 83 e8 4d',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 8d 17 1d ad d8 2f 50 e5 0f ca a3 20 8d 83 e8 4d 82 87 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getCorrectTime.accessLevel,
        commands: [
            downlinkCommands.getCorrectTime.examples['simple request']
        ],
        lrc: 0x78,
        crc: 0x8287,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getCurrentValues',
        hex: '0a 13 69 f4 c3 58 30 92 05 e8 22 ed 74 8c cb bc 53 b4',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 69 f4 c3 58 30 92 05 e8 22 ed 74 8c cb bc 53 b4 fe f9 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getCurrentValues.accessLevel,
        commands: [
            downlinkCommands.getCurrentValues.examples['simple request']
        ],
        lrc: 0x4b,
        crc: 0xfef9,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDateTime',
        hex: '0a 13 47 04 a6 e5 e6 37 01 ad 37 a5 d5 71 92 14 3c 52',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 47 04 a6 e5 e6 37 01 ad 37 a5 d5 71 92 14 3c 52 b8 6e 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getDateTime.accessLevel,
        commands: [
            downlinkCommands.getDateTime.examples['simple request']
        ],
        lrc: 0x41,
        crc: 0xb86e,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDayProfile',
        hex: '0a 13 00 3f e4 e6 f8 7e 34 9d ba ee 69 dd 8a b9 32 78',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 00 3f e4 e6 f8 7d 5e 34 9d ba ee 69 dd 8a b9 32 78 e2 26 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getDayProfile.accessLevel,
        commands: [
            downlinkCommands.getDayProfile.examples['request for active tariff table A+']
        ],
        lrc: 0x7d,
        crc: 0xe226,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDeviceId',
        hex: '0a 13 55 9e 05 01 4e 5c 2a 6c 0d 8a da 30 a7 4c 0f 86',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 55 9e 05 01 4e 5c 2a 6c 0d 8a da 30 a7 4c 0f 86 9c 30 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getDeviceId.accessLevel,
        commands: [
            downlinkCommands.getDeviceId.examples['simple request']
        ],
        lrc: 0x43,
        crc: 0x9c30,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDeviceType',
        hex: '0a 13 e2 47 89 5f 0c d5 5f 65 5b 08 bc a0 42 cc b0 1f',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 e2 47 89 5f 0c d5 5f 65 5b 08 bc a0 42 cc b0 1f cf 3a 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getDeviceType.accessLevel,
        commands: [
            downlinkCommands.getDeviceType.examples['simple request']
        ],
        lrc: 0x42,
        crc: 0xcf3a,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDisplayParam',
        hex: '0a 13 c2 58 80 dd 86 de 35 e8 a3 fc 04 c4 a5 b8 ce 4a',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 c2 58 80 dd 86 de 35 e8 a3 fc 04 c4 a5 b8 ce 4a ab 59 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getDisplayParam.accessLevel,
        commands: [
            downlinkCommands.getDisplayParam.examples['get additional display parameters']
        ],
        lrc: 0x18,
        crc: 0xab59,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getEnergyCurrent',
        hex: '0a 13 76 59 e7 62 c0 67 e8 39 0e ed b1 5f e6 11 c0 aa',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 76 59 e7 62 c0 67 e8 39 0e ed b1 5f e6 7d 31 c0 aa 71 1e 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getEnergyCurrent.accessLevel,
        commands: [
            downlinkCommands.getEnergyCurrent.examples['simple request'],
            downlinkCommands.getEnergyCurrent.examples['get A+ energy']
        ],
        lrc: 0x46,
        crc: 0x711e,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getEnergyDay',
        hex: '0a 13 68 a5 76 4f 3b ee b4 d7 2e 2a 7c f6 ee 41 92 06',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 68 a5 76 4f 3b ee b4 d7 2e 2a 7c f6 ee 41 92 06 a6 71 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getEnergyDay.accessLevel,
        commands: [
            downlinkCommands.getEnergyDay.examples['request day values for 2024.03.22 00:00:00 GMT'],
            downlinkCommands.getEnergyDay.examples['request day values with energy type for 2024.03.22 00:00:00 GMT']
        ],
        lrc: 0x40,
        crc: 0xa671,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getEnergyDayPrevious',
        hex: '0a 13 cc 4b 4e f3 a2 5d e3 e4 05 cc ad 32 60 01 4a ad',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 cc 4b 4e f3 a2 5d e3 e4 05 cc ad 32 60 01 4a ad da a9 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getEnergyDayPrevious.accessLevel,
        commands: [
            downlinkCommands.getEnergyDayPrevious.examples['simple request']
        ],
        lrc: 0x45,
        crc: 0xdaa9,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getOpParams',
        hex: '0a 13 d4 ec 1c a5 2c a6 46 26 f1 6f 4a 48 aa a1 83 22',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 d4 ec 1c a5 2c a6 46 26 f1 6f 4a 48 aa a1 83 22 a0 c6 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getOpParams.accessLevel,
        commands: [
            downlinkCommands.getOpParams.examples['simple request']
        ],
        lrc: 0x58,
        crc: 0xa0c6,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'getRatePlanInfo',
    //     hex: '0a 13 f1 f3 f2 80 ae 7a 4d 0b 50 a7 fa 3e 0d 6c 44 33',
    //     frameHex: '7e 50 aa aa ff ff 0a 7d 33 f1 f3 f2 80 ae 7a 4d 0b 50 a7 fa 3e 0d 6c 44 33 5f 81 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.GetRatePlanInfo.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.GetRatePlanInfo({
    //             tariffTable: 5
    //         })
    //     ],
    //     lrc: 0x6e,
    //     crc: 0x5f81,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'getSaldo',
    //     hex: '0a 13 c4 63 dc 84 55 42 73 2d f9 a4 59 86 a8 46 9c 66',
    //     frameHex: '7e 50 aa aa ff ff 0a 7d 33 c4 63 dc 84 55 42 73 2d f9 a4 59 86 a8 46 9c 66 39 12 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.GetSaldo.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.GetSaldo()
    //     ],
    //     lrc: 0x6f,
    //     crc: 0x3912,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'getSaldoParameters',
    //     hex: '0a 13 2f a5 23 de 3c bf bb 0d 6b f1 1f db 52 05 b4 ba',
    //     frameHex: '7e 50 aa aa ff ff 0a 7d 33 2f a5 23 de 3c bf bb 0d 6b f1 1f db 52 05 b4 ba 04 57 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.GetSaldoParameters.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.GetSaldoParameters()
    //     ],
    //     lrc: 0x68,
    //     crc: 0x0457,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'getSeasonProfile',
        hex: '0a 13 00 d0 7e e7 8d eb 4c 39 05 4d 75 aa cf fd 4f 77',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 00 d0 7d 5e e7 8d eb 4c 39 05 4d 75 aa cf fd 4f 77 aa 4b 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getSeasonProfile.accessLevel,
        commands: [
            downlinkCommands.getSeasonProfile.examples['request for passive tariff table A+']
        ],
        lrc: 0x7d,
        crc: 0xaa4b,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getSpecialDay',
        hex: '0a 13 51 32 8d fe 15 42 ae 8b 62 d3 c6 72 12 b4 90 09',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 51 32 8d fe 15 42 ae 8b 62 d3 c6 72 12 b4 90 09 57 8a 7e',
        messageId: 10,
        accessLevel: downlinkCommands.getSpecialDay.accessLevel,
        commands: [
            downlinkCommands.getSpecialDay.examples['request for passive tariff table A+']
        ],
        lrc: 0x7c,
        crc: 0x578a,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'getVersion',
    //     hex: '0a 13 a8 5e b1 b5 57 0a b9 f2 27 3e 27 47 88 bc d3 83',
    //     frameHex: '7e 50 aa aa ff ff 0a 7d 33 a8 5e b1 b5 57 0a b9 f2 27 3e 27 47 88 bc d3 83 ee 5b 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.GetVersion.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.GetVersion()
    //     ],
    //     lrc: 0x6e,
    //     crc: 0xee5b,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'prepareRatePlan',
        hex: '0a 12 de 91 0a aa 47 cd 42 c6 e1 05 ff 7e ca 61 55 97',
        frameHex: '7e 50 aa aa ff ff 0a 12 de 91 0a aa 47 cd 42 c6 e1 05 ff 7d 5e ca 61 55 97 55 96 7e',
        messageId: 10,
        accessLevel: downlinkCommands.prepareRatePlan.accessLevel,
        commands: [
            downlinkCommands.prepareRatePlan.examples['prepare rate plan request']
        ],
        lrc: 0x6b,
        crc: 0x5596,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'runTariffPlan',
    //     hex: '0a 12 b4 52 a3 9e 75 02 fd 91 7f ec 66 c1 c1 8b ec 53',
    //     frameHex: '7e 50 aa aa ff ff 0a 12 b4 52 a3 9e 75 02 fd 91 7f ec 66 c1 c1 8b ec 53 d0 84 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.RunTariffPlan.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.RunTariffPlan({
    //             tariffTable: 5
    //         })
    //     ],
    //     lrc: 0x45,
    //     crc: 0xd084,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'setAccessKey',
    //     hex: '0a 12 f1 b6 e0 a9 84 51 a5 08 c7 b0 3b 82 6c 0b b1 a4 f3 45 64 f3 06 94 d4 a9 93 e3 ea 2c 8a 9b bc 8a',
    //     frameHex: '7e 50 aa aa ff ff 0a 12 f1 b6 e0 a9 84 51 a5 08 c7 b0 3b 82 6c 0b b1 a4 f3 45 64 f3 06 94 d4 a9 93 e3 ea 2c 8a 9b bc 8a d2 28 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.SetAccessKey.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.SetAccessKey({
    //             accessLevel: accessLevels.READ_ONLY,
    //             key: new Uint8Array([
    //                 0, 1, 2, 3, 4, 5, 6, 7,
    //                 7, 6, 5, 4, 3, 2, 1, 0
    //             ])
    //         })
    //     ],
    //     lrc: 0x5c,
    //     crc: 0xd228,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'setCorrectDateTime',
    //     hex: '0a 13 0e e0 63 a0 22 32 1c e0 84 dd 9e f7 da 78 55 77',
    //     frameHex: '7e 50 aa aa ff ff 0a 7d 33 0e e0 63 a0 22 32 1c e0 84 dd 9e f7 da 78 55 77 40 8e 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.SetCorrectDateTime.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.SetCorrectDateTime({
    //             seconds: -5
    //         })
    //     ],
    //     lrc: 0x1c,
    //     crc: 0x408e,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'setCorrectTime',
    //     hex: '0a 12 9a 60 72 38 6a b3 c9 49 2f 6b 3d 32 4f 7f 7c 75',
    //     frameHex: '7e 50 aa aa ff ff 0a 12 9a 60 72 38 6a b3 c9 49 2f 6b 3d 32 4f 7f 7c 75 85 db 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.SetCorrectTime.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.SetCorrectTime({
    //             monthTransitionSummer: 3,
    //             dateTransitionSummer: 0,
    //             hoursTransitionSummer: 3,
    //             hoursCorrectSummer: 1,
    //             monthTransitionWinter: 10,
    //             dateTransitionWinter: 0,
    //             hoursTransitionWinter: 4,
    //             hoursCorrectWinter: 1,
    //             isCorrectionNeeded: true
    //         })
    //     ],
    //     lrc: 0x5d,
    //     crc: 0x85db,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'setDateTime',
        hex: '0a 13 ed 74 0a ae 4a ba c8 42 c4 1b e7 f5 0d 3c 28 84',
        frameHex: '7e 50 aa aa ff ff 0a 7d 33 ed 74 0a ae 4a ba c8 42 c4 1b e7 f5 0d 3c 28 84 61 bb 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setDateTime.accessLevel,
        commands: [
            downlinkCommands.setDateTime.examples['time: 2024.02.19 18:31:55']
        ],
        lrc: 0x77,
        crc: 0x61bb,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setDayProfile (4 periods)',
        hex: '0a 12 4f e8 4c 59 76 3d b5 fb dd dd 6d f3 8d 0b 69 b8',
        frameHex: '7e 50 aa aa ff ff 0a 12 4f e8 4c 59 76 3d b5 fb dd dd 6d f3 8d 0b 69 b8 92 76 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setDayProfile.accessLevel,
        commands: [
            downlinkCommands.setDayProfile.examples['set day profile with 4 periods']
        ],
        lrc: 0xaa,
        crc: 0x9276,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setDayProfile (max periods)',
        hex: '0a 12 6d 4b 7a 82 06 2a de a1 79 ff 49 9b a9 c4 cc b4',
        frameHex: '7e 50 aa aa ff ff 0a 12 6d 4b 7a 82 06 2a de a1 79 ff 49 9b a9 c4 cc b4 49 70 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setDayProfile.accessLevel,
        commands: [
            downlinkCommands.setDayProfile.examples['set day profile with max periods']
        ],
        lrc: 0x5e,
        crc: 0x4970,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setDisplayParam',
        hex: '0a 12 dc d4 6d 81 98 a0 02 26 30 74 c9 64 ba f8 55 1c',
        frameHex: '7e 50 aa aa ff ff 0a 12 dc d4 6d 81 98 a0 02 26 30 74 c9 64 ba f8 55 1c 40 a9 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setDisplayParam.accessLevel,
        commands: [
            downlinkCommands.setDisplayParam.examples['set params with order']
        ],
        lrc: 0x17,
        crc: 0x40a9,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setOpParams',
        hex: '0a 12 f7 fe 51 bb e6 91 41 38 dd 6d 37 e4 87 cc 4c b4 22 0c 2e 12 c7 73 f8 23 b3 51 c2 f7 7d a9 56 76 e3 b3 49 b4 57 6c fc 89 a4 30 2e cf d8 6c ff c1 84 7b 8e a0 a9 65 a6 10 9f e9 31 2c 33 80 ad 22 08 af 02 26 40 ae e6 68 3e 6f f8 ee 4d 04 b0 75',
        frameHex: '7e 50 aa aa ff ff 0a 12 f7 fe 51 bb e6 91 41 38 dd 6d 37 e4 87 cc 4c b4 22 0c 2e 12 c7 73 f8 23 b3 51 c2 f7 7d 5d a9 56 76 e3 b3 49 b4 57 6c fc 89 a4 30 2e cf d8 6c ff c1 84 7b 8e a0 a9 65 a6 10 9f e9 31 2c 33 80 ad 22 08 af 02 26 40 ae e6 68 3e 6f f8 ee 4d 04 b0 75 36 b9 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setOpParams.accessLevel,
        commands: [
            downlinkCommands.setOpParams.examples['set default operator parameters request']
        ],
        lrc: 0x7b,
        crc: 0x36b9,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'setSaldo',
    //     hex: '0a 12 84 7a 49 26 56 ad 85 d8 fb ce 99 fb e8 09 62 92 14 37 ef 69 d6 c4 3e e6 00 9a b5 21 fc 27 2b c2',
    //     frameHex: '7e 50 aa aa ff ff 0a 12 84 7a 49 26 56 ad 85 d8 fb ce 99 fb e8 09 62 92 14 37 ef 69 d6 c4 3e e6 00 9a b5 21 fc 27 2b c2 ab 08 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.SetSaldo.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.SetSaldo({
    //             date: {
    //                 month: 9,
    //                 date: 23,
    //                 hours: 6,
    //                 minutes: 35
    //             },
    //             saldoNew: 2,
    //             saldoOld: 5
    //         })
    //     ],
    //     lrc: 0x5d,
    //     crc: 0xab08,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'setSaldoParameters',
    //     hex: '0a 12 0d fe 89 57 38 c7 9b 7b 77 14 bd 8b 9e f3 eb 44 1b 2e f6 c5 32 4d 34 24 14 15 55 c8 0f 13 cf bc 67 15 9e 5a 97 29 dc 1a 47 86 95 29 61 8d 58 ca',
    //     frameHex: '7e 50 aa aa ff ff 0a 12 0d fe 89 57 38 c7 9b 7b 77 14 bd 8b 9e f3 eb 44 1b 2e f6 c5 32 4d 34 24 14 15 55 c8 0f 7d 33 cf bc 67 15 9e 5a 97 29 dc 1a 47 86 95 29 61 8d 58 ca a8 9f 7e',
    //     messageId: 10,
    //     accessLevel: downlinkCommands.SetSaldoParameters.accessLevel,
    //     direction: directions.DOWNLINK,
    //     commands: [
    //         new downlinkCommands.SetSaldoParameters({
    //             coefficients: [2, 3, 4, 5],
    //             decimalPointTariff: 6,
    //             indicationThreshold: 7,
    //             relayThreshold: 8,
    //             mode: 9,
    //             saldoOffTimeBegin: 10,
    //             saldoOffTimeEnd: 11,
    //             decimalPointIndication: 12,
    //             powerThreshold: 13,
    //             creditThreshold: 14
    //         })
    //     ],
    //     lrc: 0x43,
    //     crc: 0xa89f,
    //     frameType: frameTypes.DATA_REQUEST,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'setSeasonProfile (default)',
        hex: '0a 12 93 31 26 0c b6 37 9b d4 7a 77 9c 82 9c 73 71 eb',
        frameHex: '7e 50 aa aa ff ff 0a 12 93 31 26 0c b6 37 9b d4 7a 77 9c 82 9c 73 71 eb fd eb 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setSeasonProfile.accessLevel,
        commands: [
            downlinkCommands.setSeasonProfile.examples['set default season profile']
        ],
        lrc: 0x54,
        crc: 0xfdeb,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setSeasonProfile',
        hex: '0a 12 20 20 65 6d 84 7d 8d 08 fa d6 da c7 ed 73 6a 79',
        frameHex: '7e 50 aa aa ff ff 0a 12 20 20 65 6d 84 7d 5d 8d 08 fa d6 da c7 ed 73 6a 79 fa cb 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setSeasonProfile.accessLevel,
        commands: [
            downlinkCommands.setSeasonProfile.examples['set some season profile']
        ],
        lrc: 0x54,
        crc: 0xfacb,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setSpecialDay',
        hex: '0a 12 4c 2a 8a fc f5 5e b0 15 08 94 35 d1 2a 03 54 32',
        frameHex: '7e 50 aa aa ff ff 0a 12 4c 2a 8a fc f5 5e b0 15 08 94 35 d1 2a 03 54 32 55 f4 7e',
        messageId: 10,
        accessLevel: downlinkCommands.setSpecialDay.accessLevel,
        commands: [
            downlinkCommands.setSpecialDay.examples['set special day']
        ],
        lrc: 0x5c,
        crc: 0x55f4,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'turnRelayOff',
        hex: '0a 12 9d 81 66 34 ec 71 c4 62 af 9f 69 f6 c9 eb e8 08',
        frameHex: '7e 50 aa aa ff ff 0a 12 9d 81 66 34 ec 71 c4 62 af 9f 69 f6 c9 eb e8 08 cb 7f 7e',
        messageId: 10,
        accessLevel: downlinkCommands.turnRelayOff.accessLevel,
        commands: [
            downlinkCommands.turnRelayOff.examples['simple request']
        ],
        lrc: 0x5e,
        crc: 0xcb7f,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'turnRelayOn',
        hex: '0a 12 0d 8d 21 54 75 8a 37 a0 21 fa cd a3 c3 f2 00 4b',
        frameHex: '7e 50 aa aa ff ff 0a 12 0d 8d 21 54 75 8a 37 a0 21 fa cd a3 c3 f2 00 4b d2 62 7e',
        messageId: 10,
        accessLevel: downlinkCommands.turnRelayOn.accessLevel,
        commands: [
            downlinkCommands.turnRelayOn.examples['simple request']
        ],
        lrc: 0x5f,
        crc: 0xd262,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'two read-only encrypted commands',
        hex: '0a 13 66 82 dd f1 e5 58 9b 25 8f c4 dc 28 fc 87 ed 14',
        frameHex: '7e 50 a1 a1 f1 f1 0a 7d 33 66 82 dd f1 e5 58 9b 25 8f c4 dc 28 fc 87 ed 14 62 d8 7e',
        messageId: 10,
        accessLevel: accessLevels.READ_ONLY,
        commands: [
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOff.examples['simple request']
        ],
        lrc: 0x47,
        crc: 0x62d8,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xf1f1,
        destination: 0xa1a1
    },
    {
        name: 'many read-only encrypted commands',
        hex: '0a 13 40 3c 61 2c e6 56 3e d5 b8 f1 26 62 2a a7 e1 66 be 89 ba 1c 74 fa 1d 50 af eb 39 5f fe 24 27 bd',
        frameHex: '7e 50 a1 a1 f1 f1 0a 7d 33 40 3c 61 2c e6 56 3e d5 b8 f1 26 62 2a a7 e1 66 be 89 ba 1c 74 fa 1d 50 af eb 39 5f fe 24 27 bd fc 35 7e',
        messageId: 10,
        accessLevel: accessLevels.READ_ONLY,
        commands: [
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOn.examples['simple request']
        ],
        lrc: 0x5e,
        crc: 0xfc35,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xf1f1,
        destination: 0xa1a1
    },
    {
        name: 'one unencrypted command',
        hex: '0b 10 10 18 00 00 5d',
        frameHex: '7e 50 a2 a3 f2 f3 0b 10 10 18 00 00 5d 3c d4 7e',
        messageId: 11,
        accessLevel: accessLevels.UNENCRYPTED,
        commands: [
            downlinkCommands.turnRelayOn.examples['simple request']
        ],
        lrc: 0x5d,
        crc: 0x3cd4,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xf2f3,
        destination: 0xa2a3
    },
    {
        name: 'two unencrypted commands',
        hex: '0b 10 10 18 00 19 00 00 44',
        frameHex: '7e 50 a3 a4 f3 f4 0b 10 10 18 00 19 00 00 44 c3 d4 7e',
        messageId: 11,
        accessLevel: accessLevels.UNENCRYPTED,
        commands: [
            downlinkCommands.turnRelayOn.examples['simple request'],
            downlinkCommands.turnRelayOff.examples['simple request']
        ],
        lrc: 0x44,
        crc: 0xc3d4,
        frameType: frameTypes.DATA_REQUEST,
        source: 0xf3f4,
        destination: 0xa3a4
    }
];

const uplinkMessages: TMessageList = [
    {
        name: 'activateRatePlan',
        hex: '0a 12 83 4d 1e ca 77 1e 00 b9 75 de b3 41 63 bd 47 68',
        frameHex: '7e 51 aa aa ff ff 0a 12 83 4d 1e ca 77 1e 00 b9 75 de b3 41 63 bd 47 68 33 9c 7e',
        messageId: 10,
        accessLevel: uplinkCommands.activateRatePlan.accessLevel,
        commands: [
            uplinkCommands.activateRatePlan.examples['simple response']
        ],
        lrc: 0x54,
        crc: 0x339c,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getBuildVersion',
        hex: '0a 13 9b 4b f7 2a d1 e5 49 a5 09 50 9a 59 7e c2 b5 88',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 9b 4b f7 2a d1 e5 49 a5 09 50 9a 59 7d 5e c2 b5 88 21 54 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getBuildVersion.accessLevel,
        commands: [
            uplinkCommands.getBuildVersion.examples['2021.09.16/0.0.9']
        ],
        lrc: 0x35,
        crc: 0x2154,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getCorrectTime',
        hex: '0a 13 d4 93 ea 6a b2 92 f9 a6 23 76 16 fc 12 38 9f b6',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 d4 93 ea 6a b2 92 f9 a6 23 76 16 fc 12 38 9f b6 cc 0b 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getCorrectTime.accessLevel,
        commands: [
            uplinkCommands.getCorrectTime.examples['default parameters']
        ],
        lrc: 0x7e,
        crc: 0xcc0b,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getCurrentValues',
        hex: '0a 13 7a ee 80 2a 01 36 e8 77 fb 57 cc d9 ba ca 1a af 8d 20 aa 9b 97 2f e1 03 7b d9 a3 de 03 74 37 b8 00 ec 1c f4 0b 84 7d 96 44 f5 38 e3 fc 4e ad 19',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 7a ee 80 2a 01 36 e8 77 fb 57 cc d9 ba ca 1a af 8d 20 aa 9b 97 2f e1 03 7b d9 a3 de 03 74 37 b8 00 ec 1c f4 0b 84 7d 5d 96 44 f5 38 e3 fc 4e ad 19 85 42 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getCurrentValues.accessLevel,
        commands: [
            uplinkCommands.getCurrentValues.examples['simple response']
        ],
        lrc: 0x77,
        crc: 0x8542,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDateTime',
        hex: '0a 13 cb eb 68 e4 a3 14 a6 b1 3a c3 91 2c b3 f3 7f 4f',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 cb eb 68 e4 a3 14 a6 b1 3a c3 91 2c b3 f3 7f 4f d4 80 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getDateTime.accessLevel,
        commands: [
            uplinkCommands.getDateTime.examples['time: 2024.02.19 18:31:55']
        ],
        lrc: 0x78,
        crc: 0xd480,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDayProfile',
        hex: '0a 13 69 11 3f 2e d8 4d d1 ba 20 c4 a1 ec ff 6b 38 74',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 69 7d 31 3f 2e d8 4d d1 ba 20 c4 a1 ec ff 6b 38 74 14 98 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getDayProfile.accessLevel,
        commands: [
            uplinkCommands.getDayProfile.examples['full periods response']
        ],
        lrc: 0x75,
        crc: 0x1498,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDayProfile (4 periods)',
        hex: '0a 13 d6 40 91 21 77 5b ba 57 f9 92 50 42 4a 16 ae 82',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 d6 40 91 21 77 5b ba 57 f9 92 50 42 4a 16 ae 82 16 10 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getDayProfile.accessLevel,
        commands: [
            uplinkCommands.getDayProfile.examples['response with 4 periods']
        ],
        lrc: 0x87,
        crc: 0x1610,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDeviceId',
        hex: '0a 13 cf 5f a5 a8 36 72 4f c9 7a 07 35 f8 17 d4 96 51',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 cf 5f a5 a8 36 72 4f c9 7a 07 35 f8 17 d4 96 51 fe 54 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getDeviceId.accessLevel,
        commands: [
            uplinkCommands.getDeviceId.examples['simple response']
        ],
        lrc: 0x47,
        crc: 0xfe54,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDeviceType',
        hex: '0a 13 cf 02 a9 57 43 0a 46 e0 7a 34 22 b7 71 0c 19 29',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 cf 02 a9 57 43 0a 46 e0 7a 34 22 b7 71 0c 19 29 93 54 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getDeviceType.accessLevel,
        commands: [
            uplinkCommands.getDeviceType.examples['type 2']
        ],
        lrc: 0xb0,
        crc: 0x9354,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getDisplayParam',
        hex: '0a 13 29 3d 20 95 fd 5a 96 e0 7d d3 86 ce 79 b4 58 a6',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 29 3d 20 95 fd 5a 96 e0 7d 5d d3 86 ce 79 b4 58 a6 d8 41 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getDisplayParam.accessLevel,
        commands: [
            uplinkCommands.getDisplayParam.examples['mode with order']
        ],
        lrc: 0x15,
        crc: 0xd841,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getEnergyCurrent',
        hex: '0a 13 b2 49 f1 cf 51 c5 b9 2a ae 94 f5 e7 1b 2a 5b 36 8b 88 fb 14 6f 1e 94 60 f1 13 ea 8f 3f 64 ca 46',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 b2 49 f1 cf 51 c5 b9 2a ae 94 f5 e7 1b 2a 5b 36 8b 88 fb 14 6f 1e 94 60 f1 7d 33 ea 8f 3f 64 ca 46 d8 1f 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getEnergyCurrent.accessLevel,
        commands: [
            uplinkCommands.getEnergyCurrent.examples['simple response']
        ],
        lrc: 0x09,
        crc: 0xd81f,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getEnergyDay',
        hex: '0a 13 a7 eb 54 fe 39 2b ea 0f 3c c9 d3 aa d1 a6 83 ec cd 90 46 f0 92 c2 93 14 8e ab ef 3d 4d 0b a3 b7',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 a7 eb 54 fe 39 2b ea 0f 3c c9 d3 aa d1 a6 83 ec cd 90 46 f0 92 c2 93 14 8e ab ef 3d 4d 0b a3 b7 06 6d 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getEnergyDay.accessLevel,
        commands: [
            uplinkCommands.getEnergyDay.examples['simple response']
        ],
        lrc: 0x1e,
        crc: 0x066d,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getEnergyDayPrevious',
        hex: '0a 13 55 e9 39 74 8b e4 b6 a2 ac 0e 27 9c b6 3d a1 3c 74 42 98 60 89 31 d4 ff 70 2b f0 83 95 54 9b e0',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 55 e9 39 74 8b e4 b6 a2 ac 0e 27 9c b6 3d a1 3c 74 42 98 60 89 31 d4 ff 70 2b f0 83 95 54 9b e0 bd 5e 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getEnergyDayPrevious.accessLevel,
        commands: [
            uplinkCommands.getEnergyDayPrevious.examples['simple response']
        ],
        lrc: 0x0b,
        crc: 0xbd5e,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getOpParams',
        hex: '0a 13 a0 05 6f ba 5c 1c 6b 62 b9 37 db 7d 87 e4 c5 8e 22 0c 2e 12 c7 73 f8 23 b3 51 c2 f7 7d a9 56 76 e3 b3 49 b4 57 6c fc 89 a4 30 2e cf d8 6c ff c1 84 7b 8e a0 a9 65 a6 10 9f e9 31 2c 33 80 ad 22 08 af 02 26 40 ae e6 68 3e 6f f8 ee 4d 04 b0 75',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 a0 05 6f ba 5c 1c 6b 62 b9 37 db 7d 5d 87 e4 c5 8e 22 0c 2e 12 c7 73 f8 23 b3 51 c2 f7 7d 5d a9 56 76 e3 b3 49 b4 57 6c fc 89 a4 30 2e cf d8 6c ff c1 84 7b 8e a0 a9 65 a6 10 9f e9 31 2c 33 80 ad 22 08 af 02 26 40 ae e6 68 3e 6f f8 ee 4d 04 b0 75 9f 27 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getOpParams.accessLevel,
        commands: [
            uplinkCommands.getOpParams.examples['get default operator parameters response']
        ],
        lrc: 0x7b,
        crc: 0x9f27,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'GetRatePlanInfoResponse',
    //     hex: '0a 13 2e 2c be 49 63 cc c6 cb e3 ab c5 42 bb 0f da a1 e5 f5 67 48 ac 4e 54 9d a4 1e 75 e8 0a 8c 93 7c',
    //     frameHex: '7e 51 aa aa ff ff 0a 7d 33 2e 2c be 49 63 cc c6 cb e3 ab c5 42 bb 0f da a1 e5 f5 67 48 ac 4e 54 9d a4 1e 75 e8 0a 8c 93 7c 85 8b 7e',
    //     messageId: 10,
    //     accessLevel: uplinkCommands.GetRatePlanInfoResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.GetRatePlanInfoResponse({
    //             tariffTable: 8,
    //             activePlan: {
    //                 id: 1,
    //                 tariffSet: 2,
    //                 activateYear: 3,
    //                 activateMonth: 4,
    //                 activateDay: 5,
    //                 specialProfilesArraySize: 6,
    //                 seasonProfilesArraySize: 7,
    //                 dayProfilesArraySize: 8
    //             },
    //             passivePlan: {
    //                 id: 10,
    //                 tariffSet: 20,
    //                 activateYear: 30,
    //                 activateMonth: 40,
    //                 activateDay: 50,
    //                 specialProfilesArraySize: 60,
    //                 seasonProfilesArraySize: 70,
    //                 dayProfilesArraySize: 80
    //             }
    //         })
    //     ],
    //     lrc: 0x4d,
    //     crc: 0x858b,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'GetSaldoParametersResponse',
    //     hex: '0c 13 0d b0 25 08 91 ca 54 e3 a4 cc be a2 73 ae 54 bf a0 43 77 0d 98 4c 73 a6 4b 06 d7 22 9c 38 bb b8 50 4e ed 7a 9d 84 6f 85 b4 ee 57 2c fd 1f 7c 18',
    //     frameHex: '7e 51 aa aa ff ff 0c 7d 33 0d b0 25 08 91 ca 54 e3 a4 cc be a2 73 ae 54 bf a0 43 77 0d 98 4c 73 a6 4b 06 d7 22 9c 38 bb b8 50 4e ed 7a 9d 84 6f 85 b4 ee 57 2c fd 1f 7c 18 65 40 7e',
    //     messageId: 12,
    //     accessLevel: uplinkCommands.GetSaldoParametersResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.GetSaldoParametersResponse({
    //             coefficients: [2, 3, 4, 5],
    //             decimalPointTariff: 6,
    //             indicationThreshold: 7,
    //             relayThreshold: 8,
    //             mode: 90,
    //             saldoOffTimeBegin: 10,
    //             saldoOffTimeEnd: 11,
    //             decimalPointIndication: 12,
    //             powerThreshold: 13,
    //             creditThreshold: 14
    //         })
    //     ],
    //     lrc: 0x10,
    //     crc: 0x6540,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'GetSaldoResponse',
    //     hex: '0c 13 b3 92 d2 17 c6 97 00 75 1a eb 35 dd 62 76 c4 3a d9 e5 b4 c7 af f2 3c 79 79 a6 08 37 2e dd 9e 07 8a 3f bc 8a bf d1 89 57 ad b5 42 7b 33 fc 35 f8',
    //     frameHex: '7e 51 aa aa ff ff 0c 7d 33 b3 92 d2 17 c6 97 00 75 1a eb 35 dd 62 76 c4 3a d9 e5 b4 c7 af f2 3c 79 79 a6 08 37 2e dd 9e 07 8a 3f bc 8a bf d1 89 57 ad b5 42 7b 33 fc 35 f8 79 44 7e',
    //     messageId: 12,
    //     accessLevel: uplinkCommands.GetSaldoResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.GetSaldoResponse({
    //             currentSaldo: 1,
    //             count: 0,
    //             energy: [2, 3, 4, 5],
    //             beginSaldoOfPeriod: 7,
    //             date: {
    //                 month: 9,
    //                 date: 23,
    //                 hours: 6,
    //                 minutes: 35
    //             }
    //         })
    //     ],
    //     lrc: 0x4f,
    //     crc: 0x7944,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'getSeasonProfile',
        hex: '0c 13 b6 6b 87 aa a9 25 92 39 df 19 ee f7 2c 1e 41 90',
        frameHex: '7e 51 aa aa ff ff 0c 7d 33 b6 6b 87 aa a9 25 92 39 df 19 ee f7 2c 1e 41 90 ca 5a 7e',
        messageId: 12,
        accessLevel: uplinkCommands.getSeasonProfile.accessLevel,
        commands: [
            uplinkCommands.getSeasonProfile.examples['simple response']
        ],
        lrc: 0x71,
        crc: 0xca5a,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'GetVersionResponse',
    //     hex: '0c 13 8f d7 f5 0b b9 60 dc fc 45 73 a5 5b e8 4a 64 ae',
    //     frameHex: '7e 51 aa aa ff ff 0c 7d 33 8f d7 f5 0b b9 60 dc fc 45 73 a5 5b e8 4a 64 ae 07 4a 7e',
    //     messageId: 12,
    //     accessLevel: uplinkCommands.GetVersionResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.GetVersionResponse({
    //             version: '104.25.003'
    //         })
    //     ],
    //     lrc: 0x65,
    //     crc: 0x074a,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'prepareRatePlan',
        hex: '0c 12 0b 27 68 f1 39 fe 5c 32 9f 44 45 c3 03 60 a8 b6',
        frameHex: '7e 51 aa aa ff ff 0c 12 0b 27 68 f1 39 fe 5c 32 9f 44 45 c3 03 60 a8 b6 08 c3 7e',
        messageId: 12,
        accessLevel: uplinkCommands.prepareRatePlan.accessLevel,
        commands: [
            uplinkCommands.prepareRatePlan.examples['simple response']
        ],
        lrc: 0x53,
        crc: 0x08c3,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'RunTariffPlanResponse',
    //     hex: '0c 12 9f f9 75 af c6 27 a8 3b 9b 79 51 23 6b 74 59 ba',
    //     frameHex: '7e 51 aa aa ff ff 0c 12 9f f9 75 af c6 27 a8 3b 9b 79 51 23 6b 74 59 ba e3 19 7e',
    //     messageId: 12,
    //     accessLevel: uplinkCommands.RunTariffPlanResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.RunTariffPlanResponse()
    //     ],
    //     lrc: 0x41,
    //     crc: 0xe319,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'SetAccessKeyResponse',
    //     hex: '0c 12 e5 f3 8e 60 03 20 e1 2d df 5b b5 dc e1 5e 78 52',
    //     frameHex: '7e 51 aa aa ff ff 0c 12 e5 f3 8e 60 03 20 e1 2d df 5b b5 dc e1 5e 78 52 a2 ac 7e',
    //     messageId: 12,
    //     accessLevel: uplinkCommands.SetAccessKeyResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.SetAccessKeyResponse()
    //     ],
    //     lrc: 0x4e,
    //     crc: 0xa2ac,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'SetCorrectDateTimeResponse',
    //     hex: '0c 13 b0 02 be f0 e6 77 f8 a2 b8 8e d8 a5 6c 0a 8a 1b',
    //     frameHex: '7e 51 aa aa ff ff 0c 7d 33 b0 02 be f0 e6 77 f8 a2 b8 8e d8 a5 6c 0a 8a 1b 30 21 7e',
    //     messageId: 12,
    //     accessLevel: uplinkCommands.SetCorrectDateTimeResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.SetCorrectDateTimeResponse()
    //     ],
    //     lrc: 0x1a,
    //     crc: 0x3021,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'SetCorrectTimeResponse',
    //     hex: '0c 12 26 85 8e bd de 25 89 90 68 46 6d b8 60 1c fc 83',
    //     frameHex: '7e 51 aa aa ff ff 0c 12 26 85 8e bd de 25 89 90 68 46 6d b8 60 1c fc 83 f1 d6 7e',
    //     messageId: 12,
    //     accessLevel: uplinkCommands.SetCorrectTimeResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.SetCorrectTimeResponse()
    //     ],
    //     lrc: 0x5b,
    //     crc: 0xf1d6,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'setDateTime',
        hex: '0c 13 96 f5 83 17 cf b5 6b 9d 94 fb b5 9c c9 e8 ea a6',
        frameHex: '7e 51 aa aa ff ff 0c 7d 33 96 f5 83 17 cf b5 6b 9d 94 fb b5 9c c9 e8 ea a6 84 1e 7e',
        messageId: 12,
        accessLevel: uplinkCommands.setDateTime.accessLevel,
        commands: [
            uplinkCommands.setDateTime.examples['simple response']
        ],
        lrc: 0x4e,
        crc: 0x841e,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setDayProfile',
        hex: '0c 12 cb 50 1d 66 88 69 6d 1b 4d 2b fb d6 6a a4 8d 31',
        frameHex: '7e 51 aa aa ff ff 0c 12 cb 50 1d 66 88 69 6d 1b 4d 2b fb d6 6a a4 8d 31 48 83 7e',
        messageId: 12,
        accessLevel: uplinkCommands.setDayProfile.accessLevel,
        commands: [
            uplinkCommands.setDayProfile.examples['simple response']
        ],
        lrc: 0x57,
        crc: 0x4883,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setDisplayParam',
        hex: '0a 12 ae 17 9c ae bc 0b aa 81 9c f9 39 39 eb da af 99',
        frameHex: '7e 51 aa aa ff ff 0a 12 ae 17 9c ae bc 0b aa 81 9c f9 39 39 eb da af 99 7d 5e d7 7e',
        messageId: 10,
        accessLevel: uplinkCommands.setDisplayParam.accessLevel,
        commands: [
            uplinkCommands.setDisplayParam.examples['simple response']
        ],
        lrc: 0x1a,
        crc: 0x7ed7, // special case
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setOpParams',
        hex: '0a 12 b7 7e 91 e5 84 c7 9e 69 9c 5a 6a 38 b1 d8 c1 02',
        frameHex: '7e 51 aa aa ff ff 0a 12 b7 7d 5e 91 e5 84 c7 9e 69 9c 5a 6a 38 b1 d8 c1 02 01 cb 7e',
        messageId: 10,
        accessLevel: uplinkCommands.setOpParams.accessLevel,
        commands: [
            uplinkCommands.setOpParams.examples['simple response']
        ],
        lrc: 0x58,
        crc: 0x01cb,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    // {
    //     name: 'SetSaldoParametersResponse',
    //     hex: '0a 12 7b 8e 5b 7b 50 32 a8 b2 5b 46 69 04 a4 49 40 ff',
    //     frameHex: '7e 51 aa aa ff ff 0a 12 7b 8e 5b 7b 50 32 a8 b2 5b 46 69 04 a4 49 40 ff 84 a3 7e',
    //     messageId: 10,
    //     accessLevel: uplinkCommands.SetSaldoParametersResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.SetSaldoParametersResponse()
    //     ],
    //     lrc: 0x68,
    //     crc: 0x84a3,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    // {
    //     name: 'SetSaldoResponse',
    //     hex: '0a 12 a0 c5 af e7 f5 1a b0 89 a8 71 8f a2 e8 60 d8 f5',
    //     frameHex: '7e 51 aa aa ff ff 0a 12 a0 c5 af e7 f5 1a b0 89 a8 71 8f a2 e8 60 d8 f5 2b 3e 7e',
    //     messageId: 10,
    //     accessLevel: uplinkCommands.SetSaldoResponse.accessLevel,
    //     direction: directions.UPLINK,
    //     commands: [
    //         new uplinkCommands.SetSaldoResponse()
    //     ],
    //     lrc: 0x6d,
    //     crc: 0x2b3e,
    //     frameType: frameTypes.DATA_RESPONSE,
    //     source: 0xffff,
    //     destination: 0xaaaa
    // },
    {
        name: 'setSeasonProfile',
        hex: '0a 12 0d 18 99 92 bd c9 f6 f1 06 b5 c1 9b 15 66 a1 6a',
        frameHex: '7e 51 aa aa ff ff 0a 12 0d 18 99 92 bd c9 f6 f1 06 b5 c1 9b 15 66 a1 6a d4 6b 7e',
        messageId: 10,
        accessLevel: uplinkCommands.setSeasonProfile.accessLevel,
        commands: [
            uplinkCommands.setSeasonProfile.examples['simple response']
        ],
        lrc: 0x56,
        crc: 0xd46b,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'getSpecialDay',
        hex: '0a 13 8e b0 81 8d 53 40 b4 1d 24 56 8e 0e 86 8c 89 8f',
        frameHex: '7e 51 aa aa ff ff 0a 7d 33 8e b0 81 8d 53 40 b4 1d 24 56 8e 0e 86 8c 89 8f 01 74 7e',
        messageId: 10,
        accessLevel: uplinkCommands.getSpecialDay.accessLevel,
        commands: [
            uplinkCommands.getSpecialDay.examples['special day response']
        ],
        lrc: 0x74,
        crc: 0x0174,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'setSpecialDay',
        hex: '0a 12 58 96 e9 31 df b7 cb e9 79 0d 30 4e 02 f0 3f 5e',
        frameHex: '7e 51 aa aa ff ff 0a 12 58 96 e9 31 df b7 cb e9 79 0d 30 4e 02 f0 3f 5e 32 96 7e',
        messageId: 10,
        accessLevel: uplinkCommands.setSpecialDay.accessLevel,
        commands: [
            uplinkCommands.setSpecialDay.examples['simple response']
        ],
        lrc: 0x55,
        crc: 0x3296,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'turnRelayOff',
        hex: '0a 12 9d 81 66 34 ec 71 c4 62 af 9f 69 f6 c9 eb e8 08',
        frameHex: '7e 51 aa aa ff ff 0a 12 9d 81 66 34 ec 71 c4 62 af 9f 69 f6 c9 eb e8 08 02 f6 7e',
        messageId: 10,
        accessLevel: uplinkCommands.turnRelayOff.accessLevel,
        commands: [
            uplinkCommands.turnRelayOff.examples['simple response']
        ],
        lrc: 0x5e,
        crc: 0x02f6,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'turnRelayOn',
        hex: '0a 12 0d 8d 21 54 75 8a 37 a0 21 fa cd a3 c3 f2 00 4b',
        frameHex: '7e 51 aa aa ff ff 0a 12 0d 8d 21 54 75 8a 37 a0 21 fa cd a3 c3 f2 00 4b 1b eb 7e',
        messageId: 10,
        accessLevel: uplinkCommands.turnRelayOn.accessLevel,
        commands: [
            uplinkCommands.turnRelayOn.examples['simple response']
        ],
        lrc: 0x5f,
        crc: 0x1beb,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xffff,
        destination: 0xaaaa
    },
    {
        name: 'two unencrypted commands',
        hex: '0b 10 10 18 00 18 00 00 45',
        frameHex: '7e 51 a3 a4 f3 f4 0b 10 10 18 00 18 00 00 45 1b a7 7e',
        messageId: 11,
        accessLevel: accessLevels.UNENCRYPTED,
        commands: [
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response']
        ],
        lrc: 0x45,
        crc: 0x1ba7,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xf3f4,
        destination: 0xa3a4
    },
    {
        name: 'many unencrypted commands',
        hex: '0c 10 10 18 00 18 00 18 00 18 00 18 00 18 00 18 00 18 00 00 45',
        frameHex: '7e 51 a3 a4 f3 f4 0c 10 10 18 00 18 00 18 00 18 00 18 00 18 00 18 00 18 00 00 45 38 67 7e',
        messageId: 12,
        accessLevel: accessLevels.UNENCRYPTED,
        commands: [
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response'],
            uplinkCommands.turnRelayOn.examples['simple response']
        ],
        lrc: 0x45,
        crc: 0x3867,
        frameType: frameTypes.DATA_RESPONSE,
        source: 0xf3f4,
        destination: 0xa3a4
    }
];


// strip some fields to simplify tests matching
[...downlinkMessages, ...uplinkMessages].forEach(({commands}) => {
    commands.forEach(item => {
        delete item.maxSize;
        delete item.accessLevel;
    });
});


const checkMessage = ( messageLink, messageParams: IMessage ) => {
    const {hex, messageId, accessLevel, commands, lrc} = messageParams;
    const {frameHex, frameType, source, destination, crc} = messageParams;
    const messageBytes: TBytes = messageLink.toBytes(commands, {messageId, aesKey, accessLevel});
    const messageData = messageLink.fromBytes(getBytesFromHex(hex), {aesKey});
    const frame: TBytes = messageLink.toFrame(messageBytes, {type: frameType, source, destination});
    const frameMessageData = messageLink.fromFrame(getBytesFromHex(frameHex), {aesKey});

    expect(getHexFromBytes(messageBytes)).toEqual(hex);
    expect(getHexFromBytes(frame)).toEqual(frameHex);

    if ( 'bytes' in messageData ) {
        // valid message
        expect(messageData.lrc.actual).toEqual(lrc);
        expect(messageData.messageId).toEqual(messageId);
        expect(messageData.accessLevel).toEqual(accessLevel);
        expect(messageData.commands).toStrictEqual(commands);
    } else if ( 'message' in messageData ) {
        // invalid message
    } else {
        // everything else
        throw new Error('wrong message format');
    }

    expect(frameMessageData.crc).toStrictEqual(crc);
    expect(frameMessageData.source).toStrictEqual(source);
    expect(frameMessageData.destination).toStrictEqual(destination);
    expect(frameMessageData.type).toStrictEqual(frameType);
    expect(messageData.commands).toStrictEqual(frameMessageData.commands);
};


describe('downlink messages', () => {
    downlinkMessages.forEach(messageData => {
        test(messageData.name, () => {
            checkMessage(message.downlink, messageData);
        });
    });
});

describe('uplink messages', () => {
    uplinkMessages.forEach(messageData => {
        test(messageData.name, () => {
            checkMessage(message.uplink, messageData);
        });
    });
});