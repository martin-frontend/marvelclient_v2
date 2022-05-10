<template>
    <v-menu offset-y nudge-bottom="5">
        <template v-slot:activator="{ on, attrs }">
            <v-sheet
                class="rounded-pill d-flex align-center px-5 white--text cursor-pointer ml-5"
                color="colorSelectBg"
                height="48"
                width="340"
                v-bind="attrs"
                v-on="on"
            >
                <div class="icon-box iconfont icon-Filter icon__icon text-20"></div>
                <div class="text-16 ml-2">
                    {{
                        config.vendor_type_vendor_id[listQuery.vendor_type] &&
                        config.vendor_type_vendor_id[listQuery.vendor_type][listQuery.vendor_id].name
                    }}
                </div>
                <v-spacer />
                <div class="icon-box iconfont"></div>
            </v-sheet>
        </template>
        <v-sheet color="#24314a" class="listbox">
            <div
                class="d-flex align-center listitem cursor-pointer"
                :class="key == listQuery.vendor_id ? 'listitem-active' : ''"
                v-for="(item, key) of config.vendor_type_vendor_id[listQuery.vendor_type]"
                :key="key"
                @click="onItemClick(key)"
            >
                <div v-if="key == listQuery.vendor_id" class="icon iconfont icon-control icon__icon text-15"></div>
                <div v-else class="icon-box iconfont icon-Outlined icon__icon white--text"></div>
                <div class="ml-2">{{ item.name }}</div>
                <v-spacer />
                <dir>{{ item.amount }}</dir>
            </div>
        </v-sheet>
    </v-menu>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import GameListProxy from "../../proxy/GameListProxy";
@Component
export default class GameVendorType extends AbstractView {
    private myProxy: GameListProxy = this.getProxy(GameListProxy);
    private config = this.myProxy.config;
    private listQuery = this.myProxy.listQuery;

    private onItemClick(key: any) {
        this.listQuery.vendor_id = key;
        this.listQuery.page_count = 1;
        this.myProxy.api_plat_var_game_all_index();
    }
}
</script>

<style lang="scss" scoped>
.listbox {
    border-radius: 16px;
    padding: 16px 8px;
}
.listitem {
    padding: 8px 16px;
    height: 34.5px;
    color: rgb(157, 177, 216);
}
.listitem-active {
    color: white;
    .icon {
        color: rgb(111, 169, 250);
    }
}
</style>
