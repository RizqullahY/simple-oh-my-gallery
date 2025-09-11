// script.js
const repoOwner = "RizqullahY";
const repoName = "simple-oh-my-gallery";

async function loadImages() {
  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contents/images`
  );
  const files = await response.json();
  const gallery = document.getElementById("gallery");

  files.forEach(file => {
    if (file.type === "file") {
      const img = document.createElement("img");
      img.src = file.download_url;
      img.loading = "lazy";
      img.className =
        "w-full mb-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300";
      gallery.appendChild(img);
    }
  });
}

loadImages();
