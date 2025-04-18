/**
 * Downlink command to get the LoRaWAN information, like device EUI, application EUI and activation method.
 *
 * @packageDocumentation
 *
 * @example
 * ```js
 * import * as getLorawanInfo from 'jooby-codec/obis-observer/commands/downlink/getLorawanInfo.js';
 *
 * const parameters = {
 *     requestId: 8
 * };
 *
 * const bytes = getLorawanInfo.toBytes(parameters);
 *
 * // command binary representation
 * console.log(bytes);
 * // output:
 * [32, 1, 8]
 * ```
 *
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/obis-observer/commands/GetLorawanInfo.md#request)
 */

import * as types from '../../../types.js';
import {ICommandParameters} from '../../utils/CommandBinaryBuffer.js';
import * as command from '../../utils/command.js';
import {getLorawanInfo as commandId} from '../../constants/downlinkIds.js';
import commandNames from '../../constants/downlinkNames.js';


export const id: types.TCommandId = commandId;
export const name: types.TCommandName = commandNames[commandId];
export const headerSize = 2;

export const examples: command.TCommandExamples = {
    'simple request': {
        id,
        name,
        headerSize,
        parameters: {
            requestId: 8
        },
        bytes: [
            0x20, 0x01,
            0x08
        ]
    }
};


/**
 * Decode command parameters.
 *
 * @param bytes - only body (without header)
 * @returns command payload
 */
export const fromBytes = ( [requestId]: types.TBytes ): ICommandParameters => ({requestId});


/**
 * Encode command parameters.
 *
 * @param parameters - command payload
 * @returns full message (header with body)
 */
export const toBytes = ( {requestId}: ICommandParameters ): types.TBytes => command.toBytes(id, [requestId]);
