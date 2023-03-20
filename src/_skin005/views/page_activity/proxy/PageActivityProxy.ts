

export default class PageActivityProxy extends puremvc.Proxy {
    static NAME = "PageActivityProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        //this.api_plat_activity();
    }

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        // 列表是否加载完成，手机模式专用
        finished: false,
        done: <any>null,

        tabIndex: -1, //用于  切换标签的
        categoryData: <any>[],
        isLoadData: true,
    };
    
    //保存 活动详情数据
    activityDetailData = <any>{};

    setTestData() {
        const newobj = {
            id: 684,
            model_id: 0,
            plat_id: 30024,
            model_open_mode: 1,
            open_mode_url: "",
            activity_name: "96富文本测试",
            activity_category: "测试文职",
            icon: "https://sftpuser.testjj9.com/resource/images/activity/26/77/267767291b03b46ca9900f689332bcc5.jpg",
            start_time: "2023-03-07",
            end_time: "2040-03-08",
            settlement_period: 0,
            show_type: 1,
            link_url:
                '<p><span style="color: #666666;">独赢是指在单一赛事中投注于三种可能的胜利结果中的任何一种。 1 表示首先被提及的队伍（通常是主队）；X 代表赛事结果平局（一些赛事盘口不包含平局）；2 代表第二个被提及的队伍（通常是客队）。 以下是其他独赢/赛果盘口以及描述：</span></p>\r\n<table style="width: 100%; border-collapse: collapse; border-color: #66666; border-style: solid;" border="1">\r\n<tbody>\r\n<tr>\r\n<td style="background-color: #f7f7f7; width: 16%; border-style: solid; border-color: #666666; padding: 4px;"><span style="color: #666666;"><strong>盘口</strong></span></td>\r\n<td style="background-color: #f7f7f7; width: 84%; border-style: solid; border-color: #666666; padding: 4px;" colspan="2"><span style="color: #666666;"><strong>描述</strong></span></td>\r\n</tr>\r\n<tr>\r\n<td style="width: 16%; border-style: solid; border-color: #666666; padding: 4px;"><span style="color: #666666;">全场独赢</span></td>\r\n<td style="width: 84%; border-style: solid; border-color: #666666; padding: 4px;" colspan="2"><span style="color: #666666;">预测哪一支球队将会在全场90分钟内胜出，或赛事平局，包含补时。</span></td>\r\n</tr>\r\n<tr>\r\n<td style="width: 16%; border-style: solid; border-color: #666666; padding: 4px;"><span style="color: #666666;">上半场独赢</span></td>\r\n<td style="width: 84%; border-style: solid; border-color: #666666; padding: 4px;" colspan="2"><span style="color: #666666;">预测哪一支球队将会在上半场45分钟内胜出，或赛事平局，包含补时。</span></td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
            is_preheat: 0,
            publish_status: 2,
            process_status: 11,
            activity_desc: null,
            unread_num: 0,
        };

        const list = <any>[];
        for (let index = 0; index < 10; index++) {
            const addobj = <any>{};
            Object.assign(addobj, newobj);
            addobj.id = newobj.id + index;
            addobj.activity_name = newobj.activity_name + index;
            if (index > 8) {
                addobj.activity_category = newobj.activity_category + "3";
            } else if (index > 5) {
                addobj.activity_category = newobj.activity_category + "5";
            } else if (index > 3) {
                addobj.activity_category = newobj.activity_category + "8";
            }
            list.push(addobj);
        }
        return list;
    }
    /**设置 标签页面 数组 */
    setCategoryData() {
        this.pageData.categoryData = <any>[];

        //将list 中的 标签都 提取出来 作为 数组
        if (this.pageData.list && this.pageData.list.length > 0) {
            //将全部 活动添加 进去
            const allActivity = {
                title: "全部活动",
                data: this.pageData.list,
            };
            this.pageData.categoryData.push(allActivity);

            for (let index = 0; index < this.pageData.list.length; index++) {
                const element = this.pageData.list[index];

                //检查分类标题是否有效
                if (element.activity_category.trim()) {
                    //将标题  用  # 分成数组
                    const titleArr = element.activity_category.split("#");
                    for (let n = 0; n < titleArr.length; n++) {
                        //如果为空字符串不添加
                        if (!titleArr[n].trim()) {
                            continue;
                        }
                        let addObj;
                        for (let p = 0; p < this.pageData.categoryData.length; p++) {
                            const tempEle = this.pageData.categoryData[p];
                            if (titleArr[n] == tempEle.title) {
                                addObj = tempEle;
                            }
                        }
                        if (!addObj) {
                            addObj = {
                                title: titleArr[n],
                                data: <any>[],
                            };
                            this.pageData.categoryData.push(addObj);
                        }
                        addObj.data.push(element);
                    }
                }
            }
        }
        console.log("提取出来的 数据分类", this.pageData.categoryData);
    }

    reseData() {
        console.log("重置数据");
        this.pageData.tabIndex = 0;
    }
    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.isLoadData = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
        //this.pageData.list = this.setTestData();

        this.setCategoryData();
        this.pageData.tabIndex = 0;
    }

    /**获取活动列表 */
    api_plat_activity() {
        this.pageData.loading = true;
        this.pageData.isLoadData = true;
        this.sendNotification(net.HttpType.api_plat_activity, { user_id: core.user_id, have_content: "0" });
    }
    /**获取活动列表 */
    api_plat_activity_var(idx: any) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_plat_activity_var, { user_id: core.user_id, id: idx });
    }
}
