export type Awaitable<T> = Promise<T> | T;

export type User = {
    id: string;
    name: string;
    image: string;
    admin: boolean;
    observer: boolean;
    owner: boolean;
    council: boolean;
    staff: boolean;
};
