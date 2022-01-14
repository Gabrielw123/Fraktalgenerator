var favicon_images = [
    "bilderhem/tmp-0.gif",
    "bilderhem/tmp-1.gif",
    "bilderhem/tmp-2.gif",
    "bilderhem/tmp-3.gif",
    "bilderhem/tmp-4.gif",
    "bilderhem/tmp-5.gif",
  ],
  image_counter = 0;

setInterval(function () {
  if (document.querySelector("link[rel='icon']") !== null)
    document.querySelector("link[rel='icon']").remove();
  if (document.querySelector("link[rel='shortcut icon']") !== null)
    document.querySelector("link[rel='shortcut icon']").remove();
  document
    .querySelector("head")
    .insertAdjacentHTML(
      "beforeend",
      '<link rel="icon" href="' +
        favicon_images[image_counter] +
        '" type="image/gif">'
    );
  if (image_counter == favicon_images.length - 1) image_counter = 0;
  else image_counter++;
}, 200);
