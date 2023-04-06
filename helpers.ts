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

