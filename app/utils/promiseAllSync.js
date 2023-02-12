export const allSynchronously = async (resolvables) => {
  const results = [];
  for (const resolvable of resolvables) {
    results.push(await resolvable());
  }
  return results;
};
