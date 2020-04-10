function save_option() {
    var value = $("#tag").val();
    chrome.storage.local.set({ "nvas_tag": value }, function () {
        $("#status").text("保存しました");
        setTimeout(function () {
            $("#status").text(" ");
        }, 1500);
    });
}

function restore_option() {
    chrome.storage.local.get("nvas_tag", function (value) {
        const tag = value.nvas_tag;
        if (tag !== undefined) {
            $("option").each(function () {
                if ($(this).val() == tag) {
                    $(this).prop("selected", "true");
                }
            });
        }
    });
}



$(function () {
    restore_option();
    $("#save").bind("click", save_option);
});