import gsap, { Linear } from "gsap";

export default function (targetOffsetTop: number, duration: number = 0.3) {
    const obj = document.body.scrollTop ? document.body : document.documentElement;
    gsap.to(obj, {
        duration,
        scrollTop: targetOffsetTop,
        ease: Linear.easeNone,
    });
}
export function scrollUtil_div(obj: any, targetOffsetTop: number, duration: number = 0.3) {
    gsap.to(obj, {
        duration,
        scrollTop: targetOffsetTop,
        ease: Linear.easeNone,
    });
}
/**
/**
 * 是否允许滚动
 * @param bScroll
 */
export function scrollControl(bScroll: boolean) {
    if (!bScroll) {
        //禁止滚动
        document.body.addEventListener("touchmove", bodyScroll, { passive: false });
        document.body.style.overflow = "hidden";
    } else {
        //开启滚动
        document.body.removeEventListener("touchmove", bodyScroll, false);
        document.body.style.overflow = "";
    }
}
function bodyScroll(event: any) {
    event.preventDefault();
}
