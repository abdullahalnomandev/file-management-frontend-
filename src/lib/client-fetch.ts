// lib/client-fetch.ts
export async function clientFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const token = typeof window !== "undefined" && window.sessionStorage.getItem("token");
  
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let errorMessage = `API Error: ${res.status}`;
    const errorData = await res.json();

    if (errorData) {
      errorMessage =
        errorData.message ||
        (errorData.errorMessages?.[0]?.message ?? errorMessage);
    }

    throw new Error(errorMessage);
  }
  return res.json();
}
