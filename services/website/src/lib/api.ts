import { PUBLIC_API } from "$env/static/public";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (token: string | null, route: string, body?: unknown, forceText?: boolean, _fetch?: any) {
    const request = route.startsWith("!");
    if (request) route = route.slice(1);

    const [method, real] = route.split(/\s+/);

    const options: RequestInit & { headers: Record<string, string> } = { method, headers: {} };

    if (token) options.headers.Authorization = `Bearer ${token}`;

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const req = await (_fetch ?? fetch)(`${PUBLIC_API}${real}`, options);
    if (request) return req;

    if (!req.ok) {
        const res = await req.json();
        console.error(route, res);
        throw res.message ?? res;
    }

    const text = await req.text();
    if (forceText) return text;

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}
