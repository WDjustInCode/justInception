export async function sendContact(formData: FormData): Promise<{
    ok: boolean;
    error?: string;
  }> {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      let msg = "Failed to send.";
      try {
        const data = (await res.json()) as { error?: string };
        if (data?.error) msg = data.error;
      } catch {}
      return { ok: false, error: msg };
    }
  
    return { ok: true };
  }
  