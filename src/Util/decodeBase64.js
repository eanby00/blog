export const decodeBase64 = (raw) => {
  try {
    const utf8Array = Uint8Array.from(atob(raw), (m) => m.charCodeAt(0));
    return new TextDecoder().decode(utf8Array);
  } catch {
    return null;
  }
};
