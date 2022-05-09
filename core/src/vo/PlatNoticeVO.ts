module core {
    export interface PlatNoticeVO {
        id: number;
        data_belong: string;
        plat_id: number;
        name: string;
        type: number;
        app_types: number[];
        start_time: string;
        end_time: string;
        status: number;
        img_url: string;
        content: string;
        created_by: string;
        created_at: string;
        updated_by: string;
        updated_at: string;

        open_mode:number;
        open_mode_url: string;
    }
}
