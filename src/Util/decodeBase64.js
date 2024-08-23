export const decodeBase64 = (raw) => {
  const utf8Array = Uint8Array.from(atob(raw), (m) => m.charCodeAt(0));
  return new TextDecoder().decode(utf8Array);
};
