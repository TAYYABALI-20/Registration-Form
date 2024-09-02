const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const cPassword = document.getElementById("cpassword");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validate();
});

const sendData = (usernameVal, successCount, totalCount) => {

    if (successCount === totalCount) {

        swal("Welcome! " + usernameVal, "Registration Successful", "success").then(() => {

            form.reset();

            password.setAttribute("type", "password");
            cPassword.setAttribute("type", "password");

            const toggle = document.getElementById("toggle");
            const toggle2 = document.getElementById("toggle2");

            if (toggle) {
                toggle.classList.remove("hide");
                toggle.style.display = "block";
            };

            if (toggle2) {
                toggle2.classList.remove("hide");
                toggle2.style.display = "block";
            };

            const formControls = document.getElementsByClassName("form-control");
            Array.from(formControls).forEach(control => {
                control.classList.remove("success", "error");
            });

        });

    };

};

const successMsg = (usernameVal) => {

    const formControls = document.getElementsByClassName("form-control");

    let successCount = 0;

    Array.from(formControls).forEach(control => {
        if (control.classList.contains("success")) {
            successCount++;
        };
    });

    sendData(usernameVal, successCount, formControls.length);

};

const isValidEmail = (emailVal) => {
    const atSymbol = emailVal.indexOf("@");
    const dot = emailVal.lastIndexOf(".");
    return atSymbol > 0 && dot > atSymbol + 2 && dot < emailVal.length - 1;
};

const validate = () => {

    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const cPasswordVal = cPassword.value.trim();

    usernameVal.length <= 5 ? setErrorMsg(username, "Username Must Be Minimum Of 5 Characters") : setSuccessMsg(username);
    emailVal === "" || !isValidEmail(emailVal) ? setErrorMsg(email, "Not A Valid Email") : setSuccessMsg(email);
    phoneVal.length !== 11 ? setErrorMsg(phone, "Not A Valid Phone Number") : setSuccessMsg(phone);
    passwordVal.length <= 6 ? setErrorMsg(password, "Password Must Be Minimum Of 6 Characters") : setSuccessMsg(password);
    passwordVal !== cPasswordVal ? setErrorMsg(cPassword, "Password Do Not Match") : setSuccessMsg(cPassword);

    document.getElementById("toggle").style.display = passwordVal.length > 6 ? "none" : "block";
    document.getElementById("toggle2").style.display = passwordVal === cPasswordVal && passwordVal.length > 6 ? "none" : "block";

    successMsg(usernameVal);

};

const setErrorMsg = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    formControl.querySelector("small").innerText = message;
};

const setSuccessMsg = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
};

const toggleVisibility = (fieldId, toggleId) => {

    const field = document.getElementById(fieldId);
    const toggle = document.getElementById(toggleId);

    if (field.type === "password") {
        field.setAttribute("type", "text");
        toggle.classList.add("hide");
    } else {
        field.setAttribute("type", "password");
        toggle.classList.remove("hide");
    };

};