import gsap, { Linear } from "gsap";

export default function (targetOffsetTop: number, duration: number = 0.3) {
    const obj = document.body.scrollTop ? document.body : document.documentElement;
    gsap.to(obj, {
        duration,
        scrollTop: targetOffsetTop,
        ease: Linear.easeNone,
    });
}
