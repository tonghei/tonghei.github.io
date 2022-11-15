export function createLi(val: string, type: number = 1) {
    let li = document.createElement("li");
    li.innerText = `${val}`;
    li.style.opacity = '1';
    (document.querySelector("#alertMsg") as HTMLElement).appendChild(li)
    if (!type) {
        li.style.backgroundColor = "rgb(235, 61, 60)";
    }
    setTimeout(() => {
        let set = setInterval(() => {
            li.style.opacity = (Number(li.style.opacity) - 0.05) + '';
            if (Number(li.style.opacity) <= 0) {
                (document.querySelector("#alertMsg") as HTMLElement).removeChild(li)
                clearInterval(set)
            }
        }, 50);
    }, 1500);
}
