document.getElementById('btnReset').addEventListener("click", function () {
    localStorage.clear()
})

function handlePageUnload(event) {

}

window.addEventListener('beforeunload', handlePageUnload);