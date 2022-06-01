import gsap, { Linear } from "gsap";

export default function (targetOffsetTop: number) {
    const obj = document.body.scrollTop ? document.body : document.documentElement;
    gsap.to(obj, {
        duration: 0.3,
        scrollTop: targetOffsetTop,
        ease: Linear.easeNone,
    });
}
