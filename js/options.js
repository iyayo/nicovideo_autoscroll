document.addEventListener("DOMContentLoaded", () => {
    restore_option();
    const save_button = document.getElementById("save");
    save_button.addEventListener("click", () => {
        save_option();
    });
});


function save_option() {
    let tag = document.getElementById("tag").value;
    chrome.storage.local.set({ "nvas_tag": tag }, () => {
        let status = document.getElementById("status");
        status.innerText = "保存しました";
        setTimeout(function () {
            status.innerText = " ";
        }, 1500);
    });   
}

function restore_option() {
    chrome.storage.local.get(["nvas_tag"], (value) => {
        if (value.nvas_tag !== undefined) {
            const option_list = document.querySelectorAll("option");
            option_list.forEach((option) => {
                if (value.nvas_tag === option.value){
                    option.selected = true;
                }
            });
        }
    });
}