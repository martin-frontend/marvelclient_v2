export default interface MessageVO {
    bConfirm?: boolean;
    title?: string;
    message: string;
    cancelFun?: Function | null;
    okFun?: Function | null;
    thisObj?: any;
    closeTime?: number;
    cancelTxt?: string;
    okTxt?: string;
    isNeetClose?: boolean;
}
