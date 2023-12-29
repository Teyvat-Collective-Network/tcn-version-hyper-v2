interface User {
    id: string;
    username: string;
    avatar: string;
    admin: boolean;
    owner: boolean;
}

declare namespace App {
    interface Locals {
        token: string?;
        darkMode: boolean;
        user: User;
    }

    interface PageData {
        token: string?;
        darkMode: boolean;
        user: User;
    }
}
