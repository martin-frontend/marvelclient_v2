import gsap from "gsap";

export default function () {
    setTimeout(() => {
        const listOverLayAvtive = document.querySelectorAll(".v-overlay--active");
        const needHiddenArr: any[] = [];
        let maxItem: HTMLElement;
        listOverLayAvtive.forEach((item) => {
            //@ts-ignore
            if (!maxItem || parseInt(item.style.zIndex) > parseInt(maxItem.style.zIndex)) {
                maxItem = <any>item;
            } else {
                needHiddenArr.push(item);
            }
        });
        for (const item of needHiddenArr) {
            gsap.to(item, { opacity: 0, duration: 0.3 });
        }
        // @ts-ignore
        if (maxItem) gsap.to(maxItem, { opacity: 1, duration: 0.3 });
    }, 50);
}
