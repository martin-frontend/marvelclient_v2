module core.GlobalTimer {
    let timer: number;
    let vec: TimerWorkVO[] = [];
    let running: boolean;
    let baseDelay: number = 1;

    /**
     * 初始化
     * @param baseDelay
     */
    export function init(baseDelay) {
        if (!running) {
            running = true;
            timer = setInterval(onTimmer, baseDelay);
        }
    }

    /**
     * 注册一个计时器
     * @param listener
     * @param thisObj
     * @param repeated
     * @param delay
     * @param params
     */
    export function registerInterval(listener: any, thisObj: any, repeated?: number, delay?: number, params?: any[]) {
        if (delay >= baseDelay && delay % baseDelay === 0) {
            unregister(listener, thisObj);
            const twvo: TimerWorkVO = {
                thisObj,
                listener,
                repeated: repeated ? repeated : 1,
                delay: delay ? Math.round(delay / baseDelay) : 1,
                delayCount: 0,
                params,
            };
            if (repeated === 0) {
                twvo.repeated = -1;
            }
            vec.push(twvo);
        } else {
            throw "delay必须大于baseDelay，并且delay是baseDelay的整数倍";
        }
    }

    /**
     * 注册一个定时器
     * @param listener
     * @param thisObj
     * @param delay
     * @param params
     */
    export function registerSetTimeOut(listener: any, thisObj: any, delay?: number, params?: any[]) {
        registerInterval(listener, thisObj, 1, delay, params);
    }

    /**
     * 移除定时器或者计时器
     * @param listener
     * @param thisObj
     */
    export function unregister(listener: any, thisObj: any) {
        const len = vec.length;
        for (let i = 0; i < len; i++) {
            const twvo = vec[i];
            if (twvo.listener === listener && twvo.thisObj === thisObj) {
                vec.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 等待
     * @param delay
     */
    export function wait(delay: number): Promise<any> {
        return new Promise((resolve) => {
            GlobalTimer.registerSetTimeOut(
                () => {
                    resolve();
                },
                this,
                delay
            );
        });
    }

    function onTimmer() {
        const vecRemove: TimerWorkVO[] = [];
        const len = vec.length;
        for (let i = 0; i < len; i++) {
            const twvo = vec[i];
            if (twvo) {
                twvo.delayCount += 1;
                if (twvo.delayCount === twvo.delay) {
                    twvo.listener.apply(twvo.thisObj, twvo.params);
                    twvo.delayCount = 0;
                    twvo.repeated--;
                    if (twvo.repeated === 0) {
                        vecRemove.push(twvo);
                    }
                }
            }
        }

        while (vecRemove.length > 0) {
            const c: any = vecRemove.pop();
            const idx = vec.indexOf(c);
            vec.splice(idx, 1);
        }
    }
}

interface TimerWorkVO {
    thisObj: any;
    listener: any;
    repeated: number; // 重复次数 -1:永远
    delay: number; // 等待时间（次数）
    delayCount: number; // 当前等待计数
    params?: Array<any>;
}
