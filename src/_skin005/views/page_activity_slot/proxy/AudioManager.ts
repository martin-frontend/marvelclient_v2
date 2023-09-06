
//银屏播放的
export default class AudioManager {
    private static _Instance: AudioManager;
    public static get Instance(): AudioManager {
        if (!this._Instance) {
            this._Instance = new AudioManager();
        }
        return this._Instance;
    }
    constructor() {
        // this.Init();
    }
    bassPath = "@/_skin005/assets/ballaward/sound_res/";
    sourceData_background = <any>{}; //背景音乐的播放列表
    sourceData_effect = <any>{}; //音效的播放列表

    curBackground: any; //当前的背景音乐对象
    playBackgroundMusic(path: string) {
        if (!path || !path.trim()) {
            return;
        }

        let destAudio = this.sourceData_background[path] || null;
        if (!destAudio) {
            // 替换为音频文件路径
            destAudio = new Audio(require(`${this.bassPath}${path}`));
            this.sourceData_background[path] = destAudio;
        }
        if (this.curBackground) {
            this.curBackground.stop();
        }
        this.curBackground = destAudio;
        this.curBackground.play();
        // 设置背景音乐循环播放
        this.curBackground.loop = true;
    }
    playEffectSound(path: string) {
        if (!path || !path.trim()) {
            return;
        }
        // let destAudio = this.sourceData_effect[path] || null;
        const destAudio = new Audio(require(`${this.bassPath}${path}`));
        // const destAudio = new Audio(require(`@/_skin005/assets/ballaward/sound_res/countdown_go.wav`));
        destAudio.play();
    }

    // playSound_slot_begin() {
    //     const destAudio = new Audio(require(`@/_skin005/assets/ballaward/sound_res/slot_begin.mp3`));
    //     destAudio.play();
    // }
    // playSound_slot_end() {
    //     const destAudio = new Audio(require(`@/_skin005/assets/ballaward/sound_res/slot_end.wav`));
    //     destAudio.play();
    // }
    // playSound_slot_fast() {
    //     const destAudio = new Audio(require(`@/_skin005/assets/ballaward/sound_res/slot_fast.mp3`));
    //     destAudio.play();
    // }
    // playSound_slot_slowdown() {
    //     const destAudio = new Audio(require(`@/_skin005/assets/ballaward/sound_res/slot_slowdown.mp3`));
    //     destAudio.play();
    // }
}
