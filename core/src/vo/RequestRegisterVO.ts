module core {
    export interface RequestRegisterVO extends RequestLoginVO {
        uuid?: string;
        auth_code?: string;
        password_confirm?: string;
        invite_user_id?: number;
    }
}
