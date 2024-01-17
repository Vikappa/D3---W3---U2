document.getElementById('btnReset').addEventListener("click", function () {
    console.log("prova")
    localStorage.clear()
    updateSchermoPet()
    updateOwnerList()
    let self = this

    self.classList.remove('btn-info')
    self.classList.add("btn-success")

    setTimeout(function () {
        self.classList.remove('btn-success')
        self.classList.add("btn-light")
        self.classList.add("text-white")
        setTimeout(function () {
            self.classList.remove('text-white')
            self.classList.remove('btn-light')
            self.classList.add("btn-info")
        }, 500)
    }, 1000)

    updateSchermoPet()
    updateOwnerList()
})