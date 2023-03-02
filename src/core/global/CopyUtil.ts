import dialog_message from "@/views/dialog_message";
import LangUtil from "./LangUtil";

export default function (text: string) {
    const input = document.createElement("input");
    input.value = text;
    input.name = "copy";
    input.style.position = "fixed";
    document.body.insertBefore(input, document.body.childNodes[0]);
    input.select();
    input.setSelectionRange(0, input.value.length), document.execCommand("Copy");
    document.body.removeChild(input);
}
