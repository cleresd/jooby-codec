/**
 * Downlink command to reset the maximum daily power.
 *
 * @packageDocumentation
 *
 * @example
 * ```js
 * import * as resetPowerMaxDay from 'jooby-codec/mtx/commands/downlink/resetPowerMaxDay.js';
 *
 * const bytes = resetPowerMaxDay.toBytes();
 *
 * // command binary representation
 * console.log(bytes);
 * // output:
 * [53, 0]
 * ```
 *
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/mtx/commands/resetPowerMaxDay.md#request)
 */

import * as command from '../../utils/command.js';
import * as types from '../../types.js';
import {READ_WRITE} from '../../constants/accessLevels.js';


export const id: types.TCommandId = 0x35;
export const name: types.TCommandName = 'resetPowerMaxDay';
export const headerSize = 2;
export const maxSize = 0;
export const accessLevel: types.TAccessLevel = READ_WRITE;
export const isLoraOnly = false;

export const examples: command.TCommandExamples = {
    'simple request': {
        id,
        name,
        headerSize,
        maxSize,
        accessLevel,
        parameters: {},
        bytes: [
            0x35, 0x00
        ]
    }
};


/**
 * Decode command parameters.
 *
 * @param bytes - only body (without header)
 * @returns command payload
 */
export const fromBytes = ( bytes: types.TBytes ): command.IEmptyCommandParameters => {
    if ( bytes.length !== maxSize ) {
        throw new Error(`Wrong buffer size: ${bytes.length}.`);
    }

    // no parameters to decode
    return {};
};


/**
 * Encode command parameters.
 *
 * @param parameters - command payload
 * @returns full message (header with body)
 */
export const toBytes = (): types.TBytes => command.toBytes(id);