var currentLocation = window.location.href;

export const addDataIntoCache = () => {
  var url = currentLocation;
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
  var url = currentLocation;
  let cacheName = "rewards";
  const cacheStorage = await caches.open(cacheName);

  const cachedResponse = await cacheStorage.match(url);
  if (cachedResponse) {
    var data = await cachedResponse.json();
    console.log(data);
    if (data) {
      return parseInt(data);
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
