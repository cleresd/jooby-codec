import {TBytes} from '../../types.js';


const shortCommandMask = 0xe0;
const extraCommandMask = 0x1f;


export const fromBytes = ( data: TBytes ) => {
    if ( data.length === 0 ) {
        throw new Error('Invalid buffer size');
    }

    const header = {
        shortCode: data[0] & shortCommandMask,
        extraCode: data[0] & extraCommandMask
    };

    if ( header.shortCode !== 0 ) {
        // short header
        return {
            headerSize: 1,
            commandId: data[0] & (~header.extraCode),
            commandSize: header.extraCode
        };
    }

    if ( header.extraCode === extraCommandMask ) {
        // extra command
        if ( data.length < 3 ) {
            throw new Error('Invalid buffer size');
        }
        return {
            headerSize: 3,
            commandId: (data[1] << 8) | extraCommandMask,
            commandSize: data[2]
        };
    }

    if ( data.length < 2 ) {
        throw new Error('Invalid buffer size');
    }

    return {
        headerSize: 2,
        commandId: header.extraCode,
        commandSize: data[1]
    };
};

export const toBytes = ( commandId: number, commandSize: number ): TBytes => {
    if ( (commandId & extraCommandMask) === 0 ) {
        if ( commandSize > extraCommandMask ) {
            throw new Error(`Wrong command id/size. Id: ${commandId}, size: ${commandSize}.`);
        }

        return [commandId | commandSize];
    }

    if ( commandId > extraCommandMask ) {
        return [
            extraCommandMask,
            (commandId >> 8),
            commandSize
        ];
    }

    return [
        commandId,
        commandSize
    ];
};
