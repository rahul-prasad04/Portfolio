document.addEventListener("DOMContentLoaded", () => {
    const scriptURL =
        "https://script.google.com/macros/s/AKfycbxkObhoJ44DtqVam0pu-M25lu4lFZVE0oAqfE_BFK7bQIOx6bOfdm9WW1VBkBQ4YsZrqg/exec"
    const form = document.forms["submit-to-google-sheet"]
    const msg = document.getElementById("msg")
    const submitButton = form.querySelector('button[type="submit"]')
    const buttonText = submitButton.querySelector(".button-text")
    const dotSpinner = submitButton.querySelector(".dot-spinner")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        submitButton.classList.add("loading")
        buttonText.style.opacity = "0"
        dotSpinner.style.opacity = "1"

        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok!")
                }
                return response.text()
            })
            .then(() => {
                msg.innerHTML = "Message sent successfully!"
                form.reset()
                setTimeout(() => {
                    msg.innerHTML = ""
                }, 5000)
            })
            .catch((error) => {
                console.error("Error!", error.message)
                msg.innerHTML = "There was an error sending your message. Please try again."
            })
            .finally(() => {
                submitButton.classList.remove("loading")
                buttonText.style.opacity = "1"
                dotSpinner.style.opacity = "0"
            })
    })
})

