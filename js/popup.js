document.addEventListener("DOMContentLoaded", () => {
    restore_option();
    
    const tag = document.getElementById("tag");
    const auto_scroll = document.getElementById("auto_scroll");
    const auto_scroll_label = document.getElementById("auto_scroll_label");
    const auto_scroll_status = document.getElementById("auto_scroll_status");
    const scroll = document.getElementById("scroll");

    auto_scroll.addEventListener("change", save_option)
    tag.addEventListener("change", save_option)
    scroll.addEventListener("click", scroll_request)

    function save_option() {
        const options = {
            "nvas_autoscroll":auto_scroll.checked,
            "nvas_tag": tag.value
        }

        if (auto_scroll.checked == true) auto_scroll_status.innerText = "オン";
        else auto_scroll_status.innerText = "オフ";

        chrome.storage.local.set((options));   
    }
    
    function restore_option() {
        chrome.storage.local.get(["nvas_tag", "nvas_autoscroll"], (value) => {
            if (value.nvas_tag !== undefined) {
                const option_list = document.querySelectorAll("option");
                option_list.forEach((option) => {
                    if (value.nvas_tag === option.value) option.selected = true;
                });
            }

            if (value.nvas_autoscroll !== undefined) {
                if (value.nvas_autoscroll == false) auto_scroll_status.innerText = "オフ";

                auto_scroll.checked = value.nvas_autoscroll;
            }

            setTimeout(() => {
                auto_scroll_label.classList.remove("disabled_animation");
            }, 100);
        });
    }

    function scroll_request() {
        chrome.tabs.query({active: true, currentWindow: true}, tab => {
            chrome.tabs.sendMessage(tab[0].id, {message: "click"}, () => window.close())
        })
    }
});