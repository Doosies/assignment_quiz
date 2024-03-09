export async function stringToSha1(str: string) {
  const buffer = new TextEncoder().encode(str);

  return await crypto.subtle.digest('sha-1', buffer).then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  });
}
