import { objectRemoveNull } from "@/core/global/Functions";

export default class DialogBetFilterProxy extends puremvc.Proxy {
    static NAME = "DialogBetFilterProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };

    teamDirectlyInfo = <any>[];//团队直属信息页面的 数据;

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }
    clearData() {
        this.teamDirectlyInfo = <any>[];
    }

    setData(data: any) {
        this.pageData.loading = false;

    }
    //设置团队数据
    setTeamData(data: any) {
        this.pageData.loading = false;
        //console.log("----data.list " , data)
        if (!data.list || data.list.length < 1) {
            //console.log("没有数据");
            return;
        }
        //将数据放入显示的数组中
        if (!this.teamDirectlyInfo || this.teamDirectlyInfo.length < 1) {
            this.teamDirectlyInfo = <any>{};
            const selfData = {
                user_id: core.user_id,
                directly_users: data.pageInfo.pageTotal,
                remark: "",
                nick_name: "",
            }
            //this.teamDirectlyInfo.push(selfData);
            Object.assign(this.teamDirectlyInfo, selfData);
        }
        const obj_1 = data.list[0].invite_user_id // 第一个元素， 根据第一个元素中的 上级 确定 放在哪个地方

        const targetObj = this.teamDirectlyInfo;
        //console.log("需要查找的id 为 ", obj_1);
        let addobj = this.searchChild(targetObj, obj_1);
        if (!addobj) {
            //console.log("没有穿出值");
            addobj = targetObj;
        }

        if (!addobj.childs) {
            //console.log("子节点为空");
            addobj.childs = <any>[];
        }
        //检测 是否包含 其中 
        addobj.childs.push(...data.list);

        this.teamDirectlyInfo = JSON.parse(JSON.stringify( this.teamDirectlyInfo));
        //console.log("当前所有的数据", this.teamDirectlyInfo);

    }

    searchChild(arr: any, key: any) {
        if (!arr.childs || arr.childs.length < 1) {
            return;
        }
        for (let i = 0; i < arr.childs.length; i++) {
            const element = arr.childs[i];

            if (element.user_id == key) {
                //console.log("搜索到了",element);
                return element;
            }
            else {
                const res = <any>this.searchChild(element, key);
                if (res)
                {
                    return res;
                }
            }
        }
    }


    /**--代理推广--直属成员*/
    api_user_var_agent_direct_list(direct_user_id: any = null) {
        this.pageData.loading = true;

        const data = {
            user_id: core.user_id,
            agent_user_id: direct_user_id,
            page_count: 1,
            page_size: 10000,
        };

        this.sendNotification(net.HttpType.api_user_var_agent_direct_list, objectRemoveNull(data));
    }

    //查询 当前直属用户的 信息
    api_user_var_fetch_direct_user_info(direct_user_id: any = null) {
        // this.pageData.loading = true;
        // const data = {
        //     user_id: core.user_id,
        //     direct_user_id:direct_user_id,
        // };
        // this.sendNotification(net.HttpType.api_user_var_fetch_direct_user_info, objectRemoveNull(data));
    }
}
