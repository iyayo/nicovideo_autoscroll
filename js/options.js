document.addEventListener("DOMContentLoaded", () => {
    restore_option();
    const tag = document.getElementById("tag");
    const previewImage = document.getElementById("previewImage");
    const save_button = document.getElementById("save");
    
    save_button.addEventListener("click", save_option);

    tag.addEventListener("change", () => {
        previewImage.src = `/image/${tag.value.slice(1)}.png`;
    })

    function save_option() {
        const status = document.getElementById("status");
        chrome.storage.local.set({ "nvas_tag": tag.value }, () => {
            status.className = "show";
            setTimeout(() => {
                status.className = "hide";
            }, 2000);
        });   
    }
    
    function restore_option() {
        chrome.storage.local.get(["nvas_tag"], (value) => {
            if (value.nvas_tag !== undefined) {
                const option_list = document.querySelectorAll("option");
                option_list.forEach((option) => {
                    if (value.nvas_tag === option.value){
                        option.selected = true;
                        previewImage.src = `/image/${option.value.slice(1)}.png`;
                    }
                });
            }
        });
    }
});