import AbstractView from "@/core/abstract/AbstractView";
import dialog_contract from "@/views/dialog_contract";
import dialog_service from "@/views/dialog_service";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Footer extends AbstractView {
    goService() {
        dialog_service.show();
    }
    goContact() {
        dialog_contract.show();
    }
}
