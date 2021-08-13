export const addDataIntoCache = () => {
  var url = "https://localhost:3000";
  let cacheName = "rewards";
  var date = Date.now();

  const data = new Response(JSON.stringify(date));
  if ("caches" in window) {
    caches.open(cacheName).then((cache) => {
      cache.put(url, data);
    });
  }
};

export const readCache = async () => {
  var url = "https://localhost:3000";
  let cacheName = "rewards";
  const cacheStorage = await caches.open(cacheName);

  const cachedResponse = await cacheStorage.match(url);
  var data = await cachedResponse.json();
  console.log(data);

  return parseInt(data);
};
