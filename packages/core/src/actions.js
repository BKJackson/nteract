// @flow
import * as actionTypes from "./actionTypes";

import type { Notebook, ImmutableNotebook } from "@nteract/commutable";

import type {
  ContentRef,
  HostRef,
  KernelRef,
  KernelspecsRef
} from "./state/refs";
import type { KernelspecProps } from "./state/entities/kernelspecs";

import type {
  LanguageInfoMetadata,
  LocalKernelProps,
  RemoteKernelProps
} from "./state";

import type {
  CellID,
  CellType,
  MimeBundle
} from "@nteract/commutable/src/types";

import type { Output } from "@nteract/commutable/src/v4";

import type {
  UnhideAll,
  RestartKernel,
  RestartKernelFailed,
  RestartKernelSuccessful,
  ShutdownReplyTimedOut,
  ShutdownReplySucceeded,
  DeleteConnectionFileFailedAction,
  DeleteConnectionFileSuccessfulAction,
  ExecuteCell,
  ExecuteFocusedCell,
  ExecuteAllCells,
  ExecuteAllCellsBelow,
  ExecuteCanceled,
  ExecuteFailed,
  FetchKernelspecs,
  FetchKernelspecsFulfilled,
  FetchKernelspecsFailed,
  PasteCell,
  ChangeFilenameAction,
  ToggleCellExpansion,
  ChangeCellType,
  CutCell,
  CopyCell,
  DeleteMetadataField,
  OverwriteMetadataField,
  AcceptPayloadMessage,
  NewNotebook,
  SetNotebook,
  CreateCellAfter,
  CreateCellBefore,
  ClearAllOutputs,
  ClearOutputs,
  AppendOutput,
  UpdateDisplay,
  UpdateDisplayFailed,
  FocusNextCell,
  FocusCellEditor,
  FocusNextCellEditor,
  FocusPreviousCellEditor,
  RemoveCell,
  FocusCell,
  CreateCellAppend,
  MergeCellAfter,
  MoveCell,
  FocusPreviousCell,
  SetKernelInfo,
  SetLanguageInfo,
  UpdateCellStatus,
  ToggleCellInputVisibility,
  ToggleCellOutputVisibility,
  SetInCell,
  SendExecuteRequest,
  NewKernelAction,
  SetGithubTokenAction,
  SetNotificationSystemAction,
  SetExecutionStateAction,
  SetConfigAction,
  LaunchKernelAction,
  LaunchKernelByNameAction,
  LaunchKernelFailed,
  KernelRawStdout,
  KernelRawStderr,
  InterruptKernel,
  InterruptKernelSuccessful,
  InterruptKernelFailed,
  KillKernelAction,
  KillKernelFailed,
  KillKernelSuccessful,
  OpenModal,
  CloseModal,
  AddHost,
  Save,
  SaveAs,
  SaveFailed,
  SaveFulfilled,
  FetchContent,
  FetchContentFulfilled,
  FetchContentFailed
} from "./actionTypes";

import { createExecuteRequest } from "@nteract/messaging";
import type { HostRecordProps } from "./state/entities/hosts";

export const openModal = (payload: { modalType: string }) => ({
  type: actionTypes.OPEN_MODAL,
  payload
});

export const closeModal = () => ({
  type: actionTypes.CLOSE_MODAL
});

export const addHost = (payload: {
  hostRef: HostRef,
  host: {
    id: ?string,
    type: "jupyter" | "local",
    defaultKernelName: string,
    token?: string,
    serverUrl?: string,
    crossDomain?: boolean
  }
}) => ({
  type: actionTypes.ADD_HOST,
  payload
});

export const fetchContent = (payload: {
  filepath: string,
  params: Object,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): FetchContent => ({
  type: actionTypes.FETCH_CONTENT,
  payload
});

export const fetchContentFulfilled = (payload: {
  filepath: string,
  model: any,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): FetchContentFulfilled => ({
  type: actionTypes.FETCH_CONTENT_FULFILLED,
  payload
});

export const fetchContentFailed = (payload: {
  filepath: string,
  error: Error,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): FetchContentFailed => ({
  type: actionTypes.FETCH_CONTENT_FAILED,
  payload,
  error: true
});

export const fetchKernelspecs = (payload: {
  kernelspecsRef: KernelspecsRef,
  hostRef: HostRef
}): FetchKernelspecs => ({
  type: actionTypes.FETCH_KERNELSPECS,
  payload
});

export const fetchKernelspecsFulfilled = (payload: {
  kernelspecsRef: KernelspecsRef,
  hostRef: HostRef,
  defaultKernelName: string,
  kernelspecs: { [string]: KernelspecProps }
}): FetchKernelspecsFulfilled => ({
  type: actionTypes.FETCH_KERNELSPECS_FULFILLED,
  payload
});

export const fetchKernelspecsFailed = (payload: {
  kernelspecsRef: KernelspecsRef,
  error: Object
}): FetchKernelspecsFailed => ({
  type: actionTypes.FETCH_KERNELSPECS_FAILED,
  payload
});

export function launchKernelFailed(payload: {
  error: Error,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): LaunchKernelFailed {
  return {
    type: actionTypes.LAUNCH_KERNEL_FAILED,
    payload,
    error: true
  };
}

export function launchKernelSuccessful(payload: {
  kernel: LocalKernelProps | RemoteKernelProps,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): NewKernelAction {
  return {
    type: actionTypes.LAUNCH_KERNEL_SUCCESSFUL,
    payload
  };
}

export function launchKernel(payload: {
  kernelSpec: any,
  cwd: string,
  kernelRef: KernelRef,
  selectNextKernel: boolean,
  contentRef: ContentRef
}): LaunchKernelAction {
  return {
    type: actionTypes.LAUNCH_KERNEL,
    payload
  };
}

export function launchKernelByName(payload: {
  kernelSpecName: any,
  cwd: string,
  kernelRef: KernelRef,
  selectNextKernel: boolean,
  contentRef: ContentRef
}): LaunchKernelByNameAction {
  return {
    type: actionTypes.LAUNCH_KERNEL_BY_NAME,
    payload
  };
}

export function kernelRawStdout(payload: {
  text: string,
  kernelRef: KernelRef
}): KernelRawStdout {
  return {
    type: actionTypes.KERNEL_RAW_STDOUT,
    payload
  };
}

export function kernelRawStderr(payload: {
  text: string,
  kernelRef: KernelRef
}): KernelRawStderr {
  return {
    type: actionTypes.KERNEL_RAW_STDERR,
    payload
  };
}

// TODO: Does this need to pass KernelRef information?
export function setKernelInfo(payload: {
  kernelInfo: any,
  contentRef: ContentRef
}): SetKernelInfo {
  return {
    type: actionTypes.SET_KERNEL_INFO,
    payload
  };
}

export function setExecutionState(payload: {
  kernelStatus: string,
  kernelRef: KernelRef
}): SetExecutionStateAction {
  return {
    type: actionTypes.SET_EXECUTION_STATE,
    payload
  };
}

export function clearOutputs(payload: {
  id?: string,
  contentRef: ContentRef
}): ClearOutputs {
  return {
    type: actionTypes.CLEAR_OUTPUTS,
    payload
  };
}

export function clearAllOutputs(payload: {
  contentRef: ContentRef
}): ClearAllOutputs {
  return {
    type: actionTypes.CLEAR_ALL_OUTPUTS,
    payload
  };
}

export function moveCell(payload: {
  id: string,
  destinationId: string,
  above: boolean,
  contentRef: ContentRef
}): MoveCell {
  return {
    type: actionTypes.MOVE_CELL,
    payload
  };
}

export function removeCell(payload: {
  id: string,
  contentRef: ContentRef
}): RemoveCell {
  return {
    type: actionTypes.REMOVE_CELL,
    payload
  };
}

export function createCellAfter(payload: {
  id?: CellID,
  cellType: CellType,
  source: string,
  contentRef: ContentRef
}): CreateCellAfter {
  return {
    type: actionTypes.CREATE_CELL_AFTER,
    payload
  };
}

export function createCellBefore(payload: {
  cellType: CellType,
  id?: string,
  contentRef: ContentRef
}): CreateCellBefore {
  return {
    type: actionTypes.CREATE_CELL_BEFORE,
    payload
  };
}

export function createCellAppend(payload: {
  cellType: CellType,
  contentRef: ContentRef
}): CreateCellAppend {
  return {
    type: actionTypes.CREATE_CELL_APPEND,
    payload
  };
}

export function mergeCellAfter(payload: {
  id?: string,
  contentRef: ContentRef
}): MergeCellAfter {
  return {
    type: actionTypes.MERGE_CELL_AFTER,
    payload
  };
}

/**
 * setInCell can generically be used to set any attribute on a cell, including
 * and especially for changing metadata per cell.
 * @param {CellID} payload.id    cell ID
 * @param {Array<string>} payload.path  path within a cell to set
 * @param {any} payload.value what to set it to
 *
 * Example:
 *
 * > action = setInCell('123', ['metadata', 'cool'], true)
 * > documentReducer(state, action)
 * {
 *   ...
 *   '123': {
 *     'metadata': {
 *       'cool': true
 *     }
 *   }
 * }
 *
 */
export function setInCell<T>(payload: {
  id: CellID,
  path: Array<string>,
  value: T,
  contentRef: ContentRef
}): SetInCell<T> {
  return {
    type: actionTypes.SET_IN_CELL,
    payload
  };
}

export function updateCellSource(payload: {
  id: CellID,
  value: string,
  contentRef: ContentRef
}): SetInCell<string> {
  return setInCell({ ...payload, path: ["source"] });
}

export function updateCellExecutionCount(payload: {
  id: CellID,
  value: number,
  contentRef: ContentRef
}): SetInCell<number> {
  return setInCell({ ...payload, path: ["execution_count"] });
}

export function unhideAll(payload: {
  outputHidden: boolean,
  inputHidden: boolean,
  contentRef: ContentRef
}): UnhideAll {
  return {
    type: "UNHIDE_ALL",
    payload
  };
}

export function toggleCellOutputVisibility(payload: {
  id?: CellID,
  contentRef: ContentRef
}): ToggleCellOutputVisibility {
  return {
    type: actionTypes.TOGGLE_CELL_OUTPUT_VISIBILITY,
    payload
  };
}

export function toggleCellInputVisibility(payload: {
  id?: string,
  contentRef: ContentRef
}): ToggleCellInputVisibility {
  return {
    type: actionTypes.TOGGLE_CELL_INPUT_VISIBILITY,
    payload
  };
}

export function updateCellStatus(payload: {
  id: string,
  status: string,
  contentRef: ContentRef
}): UpdateCellStatus {
  return {
    type: actionTypes.UPDATE_CELL_STATUS,
    payload
  };
}

/* Unlike focus next & previous, to set focus, we require an ID,
   because the others are based on there already being a focused cell */
export function focusCell(payload: {
  id: CellID,
  contentRef: ContentRef
}): FocusCell {
  return {
    type: actionTypes.FOCUS_CELL,
    payload
  };
}

export function focusNextCell(payload: {
  id: ?string,
  createCellIfUndefined: boolean,
  contentRef: ContentRef
}): FocusNextCell {
  return {
    type: actionTypes.FOCUS_NEXT_CELL,
    payload
  };
}

export function focusNextCellEditor(payload: {
  id: ?string,
  contentRef: ContentRef
}): FocusNextCellEditor {
  return {
    type: actionTypes.FOCUS_NEXT_CELL_EDITOR,
    payload
  };
}

export function focusPreviousCell(payload: {
  id: ?string,
  contentRef: ContentRef
}): FocusPreviousCell {
  return {
    type: actionTypes.FOCUS_PREVIOUS_CELL,
    payload
  };
}

export function focusCellEditor(payload: {
  id: ?string,
  contentRef: ContentRef
}): FocusCellEditor {
  return {
    type: actionTypes.FOCUS_CELL_EDITOR,
    payload
  };
}

export function focusPreviousCellEditor(payload: {
  id: ?string,
  contentRef: ContentRef
}): FocusPreviousCellEditor {
  return {
    type: actionTypes.FOCUS_PREVIOUS_CELL_EDITOR,
    payload
  };
}

export function overwriteMetadataField(payload: {
  field: string,
  value: any,
  contentRef: ContentRef
}): OverwriteMetadataField {
  return {
    type: actionTypes.OVERWRITE_METADATA_FIELD,
    payload
  };
}

export function deleteMetadataField(payload: {
  field: string,
  contentRef: ContentRef
}): DeleteMetadataField {
  return {
    type: actionTypes.DELETE_METADATA_FIELD,
    payload
  };
}

export function killKernel(payload: {
  restarting: boolean,
  kernelRef: KernelRef
}): KillKernelAction {
  return {
    type: actionTypes.KILL_KERNEL,
    payload
  };
}

export function killKernelFailed(payload: {
  error: Error,
  kernelRef: KernelRef
}): KillKernelFailed {
  return {
    type: actionTypes.KILL_KERNEL_FAILED,
    payload,
    error: true
  };
}

export function killKernelSuccessful(payload: {
  kernelRef: KernelRef
}): KillKernelSuccessful {
  return {
    type: actionTypes.KILL_KERNEL_SUCCESSFUL,
    payload
  };
}

export function interruptKernel(payload: {
  kernelRef: KernelRef
}): InterruptKernel {
  return {
    type: actionTypes.INTERRUPT_KERNEL,
    payload
  };
}

export function interruptKernelSuccessful(payload: {
  kernelRef: KernelRef
}): InterruptKernelSuccessful {
  return {
    type: actionTypes.INTERRUPT_KERNEL_SUCCESSFUL,
    payload
  };
}

export function interruptKernelFailed(payload: {
  error: Error,
  kernelRef: KernelRef
}): interruptKernelFailed {
  return {
    type: actionTypes.INTERRUPT_KERNEL_FAILED,
    payload,
    error: true
  };
}

export function setNotificationSystem(
  notificationSystem: any
): SetNotificationSystemAction {
  return {
    type: actionTypes.SET_NOTIFICATION_SYSTEM,
    notificationSystem
  };
}

export function copyCell(payload: {
  id?: CellID,
  contentRef: ContentRef
}): CopyCell {
  return {
    type: actionTypes.COPY_CELL,
    payload
  };
}

export function cutCell(payload: {
  id?: CellID,
  contentRef: ContentRef
}): CutCell {
  return {
    type: actionTypes.CUT_CELL,
    payload
  };
}

export function pasteCell(payload: { contentRef: ContentRef }): PasteCell {
  return {
    type: actionTypes.PASTE_CELL,
    payload
  };
}

export function changeCellType(payload: {
  id: CellID,
  to: CellType,
  contentRef: ContentRef
}): ChangeCellType {
  return {
    type: actionTypes.CHANGE_CELL_TYPE,
    payload
  };
}

export function setGithubToken(githubToken: string): SetGithubTokenAction {
  return {
    type: actionTypes.SET_GITHUB_TOKEN,
    githubToken
  };
}

export function setConfigAtKey<T>(key: string, value: T): SetConfigAction<T> {
  return {
    type: actionTypes.SET_CONFIG_AT_KEY,
    key,
    value
  };
}

export function setTheme(theme: string): SetConfigAction<string> {
  return setConfigAtKey("theme", theme);
}

export function setCursorBlink(value: string): SetConfigAction<string> {
  return setConfigAtKey("cursorBlinkRate", value);
}

export function toggleOutputExpansion(payload: {
  id: string,
  contentRef: ContentRef
}): ToggleCellExpansion {
  return {
    type: actionTypes.TOGGLE_OUTPUT_EXPANSION,
    payload
  };
}

export function sendExecuteRequest(payload: {
  id: string,
  message: *,
  contentRef: ContentRef
}): SendExecuteRequest {
  return {
    type: actionTypes.SEND_EXECUTE_REQUEST,
    payload
  };
}

export function executeCell(payload: {
  id: string,
  contentRef: ContentRef
}): ExecuteCell {
  return {
    type: actionTypes.EXECUTE_CELL,
    payload
  };
}

export function executeAllCells(payload: {
  contentRef: ContentRef
}): ExecuteAllCells {
  return {
    type: actionTypes.EXECUTE_ALL_CELLS,
    payload
  };
}

export function executeAllCellsBelow(payload: {
  contentRef: ContentRef
}): ExecuteAllCellsBelow {
  return {
    type: actionTypes.EXECUTE_ALL_CELLS_BELOW,
    payload
  };
}

export function executeFocusedCell(payload: {
  contentRef: ContentRef
}): ExecuteFocusedCell {
  return {
    type: actionTypes.EXECUTE_FOCUSED_CELL,
    payload
  };
}

export function executeCanceled(payload: {
  id: string,
  contentRef: ContentRef
}): ExecuteCanceled {
  return {
    type: actionTypes.EXECUTE_CANCELED,
    payload
  };
}

export function executeFailed(payload: {
  error: Error,
  contentRef: ContentRef
}): ExecuteFailed {
  return {
    type: actionTypes.EXECUTE_FAILED,
    error: true,
    payload
  };
}

export function changeFilename(payload: {
  filepath: ?string,
  contentRef: ContentRef
}): ChangeFilenameAction {
  return {
    type: actionTypes.CHANGE_FILENAME,
    payload
  };
}

export function save(payload: { contentRef: ContentRef }): Save {
  return {
    type: actionTypes.SAVE,
    payload
  };
}

export function saveAs(payload: {
  filepath: string,
  contentRef: ContentRef
}): SaveAs {
  return {
    type: actionTypes.SAVE_AS,
    payload
  };
}

export function saveFailed(payload: {
  error: Error,
  contentRef: ContentRef
}): SaveFailed {
  return {
    type: actionTypes.SAVE_FAILED,
    payload,
    error: true
  };
}

export function saveFulfilled(payload: {
  contentRef: ContentRef
}): SaveFulfilled {
  return {
    type: actionTypes.SAVE_FULFILLED,
    payload
  };
}

// TODO: Use a kernel spec type
export function newNotebook(payload: {
  kernelSpec: Object,
  cwd: string,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): NewNotebook {
  return {
    type: actionTypes.NEW_NOTEBOOK,
    payload: {
      kernelSpec: payload.kernelSpec,
      cwd:
        payload.cwd ||
        // TODO: Does it matter that this is our fallback when targeting the web app
        process.cwd(),
      kernelRef: payload.kernelRef,
      contentRef: payload.contentRef
    }
  };
}

// Expects notebook to be JS Object or Immutable.js
export const setNotebook = (payload: {
  filepath: ?string,
  notebook: ImmutableNotebook,
  kernelRef: KernelRef,
  contentRef: ContentRef,
  lastSaved: ?Date,
  created: ?Date
}): SetNotebook => ({
  type: actionTypes.SET_NOTEBOOK,
  payload
});

export const loadConfig = () => ({ type: actionTypes.LOAD_CONFIG });
export const saveConfig = () => ({ type: actionTypes.SAVE_CONFIG });
export const doneSavingConfig = () => ({
  type: actionTypes.DONE_SAVING_CONFIG
});

export const configLoaded = (config: any) => ({
  type: actionTypes.MERGE_CONFIG,
  config
});

/**
 * Action creator for comm_open messages
 * @param  {jmp.Message} a comm_open message
 * @return {Object}      COMM_OPEN action
 */
export function commOpenAction(message: any) {
  // invariant: expects a comm_open message
  return {
    type: actionTypes.COMM_OPEN,
    data: message.content.data,
    metadata: message.content.metadata,
    comm_id: message.content.comm_id,
    target_name: message.content.target_name,
    target_module: message.content.target_module,
    // Pass through the buffers
    buffers: message.blob || message.buffers
    // NOTE: Naming inconsistent between jupyter notebook and jmp
    //       see https://github.com/n-riesco/jmp/issues/14
    //       We just expect either one
  };
}

/**
 * Action creator for comm_msg messages
 * @param  {jmp.Message} a comm_msg
 * @return {Object}      COMM_MESSAGE action
 */
export function commMessageAction(message: any) {
  return {
    type: actionTypes.COMM_MESSAGE,
    comm_id: message.content.comm_id,
    data: message.content.data,
    // Pass through the buffers
    buffers: message.blob || message.buffers
    // NOTE: Naming inconsistent between jupyter notebook and jmp
    //       see https://github.com/n-riesco/jmp/issues/14
    //       We just expect either one
  };
}

export function appendOutput(payload: {
  id: CellID,
  output: Output,
  contentRef: ContentRef
}): AppendOutput {
  return {
    type: actionTypes.APPEND_OUTPUT,
    payload
  };
}

export function acceptPayloadMessage(payload: {
  id: CellID,
  payload: *,
  contentRef: ContentRef
}): AcceptPayloadMessage {
  return {
    type: actionTypes.ACCEPT_PAYLOAD_MESSAGE,
    payload
  };
}

export function updateDisplay(payload: {
  content: {
    data: MimeBundle,
    metadata: JSONObject,
    transient: { display_id: string }
  },
  contentRef: ContentRef
}): UpdateDisplay {
  return {
    type: actionTypes.UPDATE_DISPLAY,
    payload
  };
}

export function updateDisplayFailed(payload: {
  error: Error,
  contentRef: ContentRef
}): UpdateDisplayFailed {
  return {
    type: actionTypes.UPDATE_DISPLAY_FAILED,
    payload,
    error: true
  };
}

export function setLanguageInfo(payload: {
  langInfo: LanguageInfoMetadata,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): SetLanguageInfo {
  return {
    type: actionTypes.SET_LANGUAGE_INFO,
    payload
  };
}

export function deleteConnectionFileFailed(payload: {
  error: Error,
  kernelRef: KernelRef
}): DeleteConnectionFileFailedAction {
  return {
    type: actionTypes.DELETE_CONNECTION_FILE_FAILED,
    payload,
    error: true
  };
}

export function deleteConnectionFileSuccessful(payload: {
  kernelRef: KernelRef
}): DeleteConnectionFileSuccessfulAction {
  return {
    type: actionTypes.DELETE_CONNECTION_FILE_SUCCESSFUL,
    payload
  };
}

export function shutdownReplySucceeded(payload: {
  text: string,
  kernelRef: KernelRef
}): ShutdownReplySucceeded {
  return {
    type: actionTypes.SHUTDOWN_REPLY_SUCCEEDED,
    payload
  };
}

export function shutdownReplyTimedOut(payload: {
  error: Error,
  kernelRef: KernelRef
}): ShutdownReplyTimedOut {
  return {
    type: actionTypes.SHUTDOWN_REPLY_TIMED_OUT,
    payload,
    error: true
  };
}

export function restartKernel(payload: {
  clearOutputs: boolean,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): RestartKernel {
  return {
    type: actionTypes.RESTART_KERNEL,
    payload
  };
}

export function restartKernelFailed(payload: {
  error: Error,
  kernelRef: KernelRef,
  contentRef: ContentRef
}): RestartKernelFailed {
  return {
    type: actionTypes.RESTART_KERNEL_FAILED,
    payload,
    error: true
  };
}

export function restartKernelSuccessful(payload: {
  kernelRef: KernelRef,
  contentRef: ContentRef
}): RestartKernelSuccessful {
  return {
    type: actionTypes.RESTART_KERNEL_SUCCESSFUL,
    payload
  };
}
