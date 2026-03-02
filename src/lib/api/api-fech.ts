import { authKey } from "@/constants/storageKey";
import { getCokkiesToken } from "../getToken";
import { redirect } from "next/navigation";
import { removeAccessTokenToCookie } from "@/services/removeTokeknFromCookie";

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {},
    caller?: 'server' | 'client'
): Promise<T> {

    // const accessToken =  await getCokkiesToken();

    const isFormData = options.body instanceof FormData;
    let accessToken = '';

    if (caller === 'client' && typeof window !== 'undefined') {
        accessToken = sessionStorage.getItem(authKey) || '';
    } else if (caller === 'server') {
        accessToken = await getCokkiesToken() || '';
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...options.headers,
        },
        cache: "no-cache",
    });

    // Handle 401 Session Expired gracefully
    if (res.status === 401) {
        if (typeof window !== "undefined") {
            // Client side
            window.location.href = "/partner-login";
            return Promise.reject(); // stop execution

        }
    }

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
            errorData?.message ||
            errorData?.errorMessages?.[0]?.message ||
            `API Error: ${res.status}`
        );
    }

    return res.json();
}



export const getImage = (path: string) => {
    if (!path) return "";

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") ?? "";

    return `${baseUrl}${path}`;
};


// type User = {
//   id: string;
//   name: string;
// };

// const users = await serverFetch<User[]>("/users");



// await serverFetch("/posts", {
//   method: "POST",
//   body: JSON.stringify({ title: "Hello" }),
// });
