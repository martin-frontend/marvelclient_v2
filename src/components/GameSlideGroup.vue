<template>
    <div class="mt-8">
        <div class="text-16 mb-2 ml-2 mr-4 d-flex align-center">
            <v-icon class="mr-1" color="primary">{{ gameProxy.categoryIcon[data.category] }}</v-icon>
            <div>{{ data.category_name }}</div>
            <v-spacer />
            <v-btn
                v-if="bShowAll"
                class="text-12 mr-16 rounded-pill"
                color="rgba(243, 231, 231, 0.098)"
                width="78"
                height="24"
                @click="onShowAll"
            >
                查看全部
            </v-btn>
        </div>
        <v-sheet max-width="1430" class="mx-auto" color="transparent">
            <v-slide-group show-arrows>
                <v-slide-item v-for="item of data.list" :key="item.vendor_prodcut_id">
                    <GameItem :item="item" />
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import GameItem from "@/components/GameItem.vue";
import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component({
    components: {
        GameItem,
    },
})
export default class GameSlideGroup extends AbstractView {
    private gameProxy: GameProxy = this.getProxy(GameProxy);
    @Prop() data!: any;
    @Prop() bShowAll!: boolean;

    private getIcon(item: any) {
        if (item.icon.indexOf("http") != -1) {
            return item.icon;
        } else {
            if (item.list_type == 0) {
                return `img/productimage/${item.icon}`;
            } else {
                return `img/changlogo/${item.icon}`;
            }
        }
    }

    private onShowAll() {
        router.replace("/gamelist");
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
::v-deep .v-slide-group__prev {
    position: absolute;
    top: -33px;
    right: 40px;
    min-width: 0;
    border-radius: 12pt 0pt 0pt 12pt;
    width: 32px;
    height: 24px;
    i {
        font-size: 30px;
    }
}
::v-deep .v-slide-group__next {
    position: absolute;
    top: -33px;
    right: 5px;
    min-width: 0;
    border-radius: 0pt 12pt 12pt 0pt;
    width: 32px;
    height: 24px;
    i {
        font-size: 30px;
    }
}
::v-deep .theme--dark {
    .v-slide-group__prev,
    .v-slide-group__next {
        background: rgba(243, 231, 231, 0.098);
    }
}
::v-deep .theme--light {
    .v-slide-group__prev,
    .v-slide-group__next {
        background: rgba(243, 231, 231, 0.098);
    }
}
</style>
