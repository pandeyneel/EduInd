export async function fetchBackendData(endpoint: string) {
    try {
        const res = await fetch(`http://localhost:5000/api/${endpoint}`);
        if (res.ok) {
            return await res.json();
        }
    } catch (e) {
        console.error("Backend fetch error:", e);
    }
    return null;
}
