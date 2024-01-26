import gsap, { Linear } from "gsap";

/**
 * 放大到消失的动画
 * @param ele
 * @param tl
 * @param duration
 * @param repeat
 * @param repeatDelay
 * @returns
 */
export function AnimScaleAndFadeOut(
    ele: any,
    tl: gsap.core.Timeline | null,
    duration: number = 2,
    endScale: number = 1.5,
    repeat: number = -1,
    repeatDelay: number = 1
) {
    if (!tl) {
        tl = gsap.timeline();
    }
    if (!ele) return tl;

    const title_tl = gsap.timeline();
    title_tl.to(ele, {
        duration: 0,
        opacity: 0.5,
    });
    title_tl.to(
        ele,
        {
            duration: duration,
            scale: endScale,
            ease: "expo.out",
        },
        "<"
    );
    title_tl.to(
        ele,
        {
            duration: duration,
            opacity: 0,
            ease: "expo.out",
        },
        "<"
    );
    title_tl.repeat(repeat).repeatDelay(repeatDelay);
    // title_tl.play();
    tl.add(title_tl, "<");
    return tl;
}
/**
 * 旋转动画
 * @param ele 对象
 * @param tl
 * @param duration
 * @param rotation
 * @param repeat
 * @returns
 */
export function AnimRotation(ele: any, tl: gsap.core.Timeline | null, duration: number = 60, rotation: number = 360, repeat: number = -1) {
    if (!tl) {
        tl = gsap.timeline();
    }
    if (!ele) return tl;
    tl.to(ele, {
        duration: duration,
        rotation: rotation,
        repeat: repeat,
        ease: Linear.easeNone,
    });
    return tl;
}

export function AnimDoScale(
    ele: any,
    tl: gsap.core.Timeline | null = null,
    duration: number = 0.2,
    startScale: number = 0.8,
    repeat: number = -1,
    repeatDelay: number = 2
) {
    if (!tl) {
        tl = gsap.timeline();
    }
    if (!ele) return tl;
    const tl_btn = gsap.timeline();
    tl_btn.add(
        gsap.to(ele, {
            duration: 0,
            scale: startScale,
        })
    );

    tl_btn.add(
        gsap.to(ele, {
            duration: duration,
            scale: 1,
            repeat: 2,
        })
    );
    tl_btn.repeat(repeat);
    tl_btn.repeatDelay(repeatDelay);

    tl.add(tl_btn, "<");
    return tl;
}
