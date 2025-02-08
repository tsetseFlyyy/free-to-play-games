export async function parseJSON(query) {
  const response = await query;
  return response.json();
}
