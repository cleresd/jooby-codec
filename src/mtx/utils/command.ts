import * as types from '../types.js';
import {IBytesConversionFormatOptions, defaultFormatOptions} from '../../utils/bytesConversion.js';


/**
 * Command general properties.
 */
export interface ICommand {
    id: types.TCommandId,
    name?: types.TCommandName,
    headerSize?: number,
    maxSize?: number,
    accessLevel?: number,
    parameters?: object,
    bytes?: types.TBytes
}

/**
 * There are no parameters here.
 */
export interface IEmptyCommandParameters {}

/**
 * In case of an error wraps all command data with error message.
 */
export interface IInvalidCommand {
    command: ICommand,
    error: string
}

export type TCommand = ICommand | IInvalidCommand;

type TExampleName = string;

/**
 * Named command example data.
 */
export type TCommandExamples = Record<TExampleName, TCommand>;

/**
 * Command public interface exported from its module.
 */
export interface ICommandImplementation {
    id: types.TCommandId,
    name: types.TCommandName,
    headerSize: number,
    maxSize: number,
    accessLevel: types.TAccessLevel,
    examples: TCommandExamples,
    isLoraOnly: boolean,

    fromBytes ( bytes: types.TBytes ),
    toBytes ( parameters?: object ): types.TBytes
}

export interface IDlmsJsonOptions extends IBytesConversionFormatOptions {
    dlms: boolean
}

export const defaultDlmsJsonOptions = {
    ...defaultFormatOptions,
    dlms: false
};


export const toBytes = ( commandId: number, commandBytes: types.TBytes = [] ): types.TBytes => [commandId, commandBytes.length, ...commandBytes];
