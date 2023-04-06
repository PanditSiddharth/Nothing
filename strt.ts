let startTime: number;
export function st() {
    startTime = performance.now();
}

export function up(): number {
    const i: number = Math.floor((performance.now() - startTime) / 1000);
    let s: any = (i % 60).toString().padStart(2, '0')
    let m: any = (Math.floor(i / 60) % 60).toString().padStart(2, '0')
    let h: any = (Math.floor(Math.floor(i / 60) / 60)).toString().padStart(2, '0')
    let upt = { h: h, m: m, s: s, strt: '*' } as any;
    let yt;
    return upt;
}
export default up

export const sleep = (t: number | undefined) => new Promise((resolve) => setTimeout(resolve, t));

export type Upt = {
    s? : string;
    m? : string;
    h? : string;
    strt? : string;
}

export type T = {
    chatId? : number | undefined;
    sleep ? :( (num: number) => void ) | undefined;
    Upt? : Upt;
}
