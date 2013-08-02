
function save_options() {
    var textarea = document.getElementById("black_words");
    var words = textarea.value;
    localStorage["black_words"] = words;

  
    var status = document.getElementById("status");
    status.innerHTML = "Сохранено.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

function restore_options() {
    var favorite = localStorage["black_words"];
    if (!favorite) {
      return;
    }
    var textarea = document.getElementById("black_words");
    textarea.value = favorite;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);