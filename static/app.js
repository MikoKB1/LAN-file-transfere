const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const fileList = document.getElementById("file-list");
const uploadBtn = document.getElementById("upload-btn");
const statusText = document.getElementById("status");

let files = [];

dropZone.onclick = () => fileInput.click();

fileInput.onchange = () => addFiles(fileInput.files);

dropZone.ondragover = e => {
    e.preventDefault();
    dropZone.classList.add("drag");
};

dropZone.ondragleave = () => dropZone.classList.remove("drag");

dropZone.ondrop = e => {
    e.preventDefault();
    dropZone.classList.remove("drag");
    addFiles(e.dataTransfer.files);
};

function addFiles(newFiles) {
    for (const file of newFiles) {
        files.push(file);
    }
    renderList();
    uploadBtn.disabled = files.length === 0;
}

function renderList() {
    fileList.innerHTML = "";
    files.forEach((file, i) => {
        const div = document.createElement("div");
        div.className = "file-item";
        div.innerHTML = `
            <div>${file.name}</div>
            <div class="progress">
                <div class="bar" id="bar-${i}"></div>
            </div>
        `;
        fileList.appendChild(div);
    });
}

uploadBtn.onclick = () => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    files.forEach(f => formData.append("files", f));

    xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            document.querySelectorAll(".bar").forEach(bar => {
                bar.style.width = percent + "%";
            });
        }
    };

    xhr.onload = () => {
        statusText.textContent = "Upload complete";
        uploadBtn.disabled = true;
    };

    xhr.open("POST", "/");
    xhr.send(formData);
};
