const fileInput = document.getElementById('fileInput')
const uploadBtn = document.getElementById('uploadBtn')
const shareableLink = document.getElementById('shareableLink')

fileInput.addEventListener("change", ()=>{
    const selectedFiles = fileInput.files;
    if(selectedFiles.length>0){
        const filenames = Array.from(selectedFiles).map((file)=>file.name).join(",");
        const label = document.querySelector(".custom-file-lab");
        label.innerHTML = filenames
    }
})

uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if(file){
        try{

            const formData = new FormData();
            formData.append("file", file);

            uploadBtn.disabled = true;
            uploadBtn.textContent = "Uploading..."

            const response = await fetch("https://file.io/?expires=1d", {
                method: "POST",
                body: formData,
            });
            
            const data = await response.json();
            console.log(data);

            if(response.ok){
                const link = `<p>Download File <a href="${data.link}" target="_blank">${data.link}</a></p>`;
                shareableLink.innerHTML = link;
            } else{
                shareableLink.innerHTML = "File share failed. Please try again later!";
            }
        }catch(error){
            shareableLink.textContent = "An error occured. Please try again later!";
        } finally{
            uploadBtn.disabled = false;
            uploadBtn.textContent = "Share";
        } 
    } else{
        shareableLink.textContent = "Please select a file to share.";
    }
})