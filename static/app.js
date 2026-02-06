const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");
const progressText = document.getElementById("progressText");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!fileInput.files.length) return;

    const data = new FormData();
    for (const file of fileInput.files) {
        data.append("files", file);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/", true);

    progressContainer.classList.remove("hidden");
    progressBar.style.width = "0%";
    progressText.textContent = "Uploading...";

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            progressBar.style.width = percent + "%";
            progressText.textContent = `Uploading… ${percent}%`;
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            progressBar.style.width = "100%";
            progressText.textContent = "Upload complete ✅";
            setTimeout(() => location.reload(), 800);
        } else {
            progressText.textContent = "Upload failed ❌";
        }
    };

    xhr.send(data);
});
