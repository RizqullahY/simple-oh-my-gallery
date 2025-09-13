const repoOwner = "RizqullahY";
const repoName = "simple-oh-my-gallery";
const gallery = document.getElementById("gallery");
const refreshBtn = document.getElementById("refreshBtn");

// Load images
async function loadImages() {
  gallery.innerHTML = ""; // reset sebelum render ulang
  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contents/images`
  );
  const files = await response.json();

  files.forEach(file => {
    if (file.type === "file") {
      const img = document.createElement("img");
      img.src = file.download_url;
      img.loading = "lazy";
      img.className =
        "w-full mx-auto mb-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer";

      // Klik gambar → buka swal
      img.addEventListener("click", () => {
        Swal.fire({
          title: file.name,
          html: `
            <img src="${file.download_url}" alt="preview" class="rounded-lg shadow-md mb-4">
          `,
          showCancelButton: true,
          confirmButtonText: "Hapus",
          cancelButtonText: "Tutup",
          confirmButtonColor: "#e3342f",
          background: "#1f2937", // gray-800
          color: "#fff",
        }).then(result => {
          if (result.isConfirmed) {
            window.open(
              `https://github.com/${repoOwner}/${repoName}/delete/master/images/${file.name}`,
              "_blank"
            );
          }
        });
      });

      gallery.appendChild(img);
    }
  });
}

// Refresh button
refreshBtn.addEventListener("click", () => {
  loadImages();
});

// Refresh button
addBtn.addEventListener("click", () => {
  window.open(
    `https://github.com/${repoOwner}/${repoName}/upload/master/images`,
    "_blank"

    // https://github.com/RizqullahY/simple-oh-my-gallery/upload/master/images
  
  );
});

// First load
loadImages();
