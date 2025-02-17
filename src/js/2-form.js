const form = document.querySelector(".feedback-form");
const formData = {
    email: "",
    message: "",
};

form.addEventListener("input", (event) => {
    formData[event.target.name] = event.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
});

document.addEventListener("DOMContentLoaded", () => {
    const savedData = JSON.parse(localStorage.getItem("feedback-form-state"));
    if (savedData) {
        form.email.value = savedData.email || "";
        form.message.value = savedData.message || "";
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.email.value || !form.message.value) {
        alert("Fill please all fields");
        return;
    }
    console.log(formData);
    localStorage.removeItem("feedback-form-state");
    form.reset();
});
