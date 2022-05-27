export default function (targetOffsetTop: number) {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop == targetOffsetTop) return;
    const STEP = Math.abs((scrollTop - targetOffsetTop)/20)
    if (scrollTop > targetOffsetTop) {
        smoothUp();
    } else {
        smoothDown();
    }
    // 定义往下滑函数
    function smoothDown() {
        if (scrollTop < targetOffsetTop) {
            if (targetOffsetTop - scrollTop >= STEP) {
                scrollTop += STEP;
            } else {
                scrollTop = targetOffsetTop;
            }
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            requestAnimationFrame(smoothDown);
        }
    }
    // 定义往上滑函数
    function smoothUp() {
        if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
                scrollTop -= STEP;
            } else {
                scrollTop = targetOffsetTop;
            }
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            requestAnimationFrame(smoothUp);
        }
    }
}
