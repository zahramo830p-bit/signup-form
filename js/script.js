const form = document.getElementById("form");
const username = document.getElementById("username");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const button = form.querySelector("button");

function setError(input, message) {
  input.classList.remove("success");
  input.classList.add("error");
  input.nextElementSibling.innerText = message;
}

function setSuccess(input) {
  input.classList.remove("error");
  input.classList.add("success");
  input.nextElementSibling.innerText = "";
}

function validateUsername() {
  if (username.value.length < 3 || username.value.length > 15) {
    setError(username, "نام کاربری باید بین ۳ تا ۱۵ کاراکتر باشد");
    return false;
  }
  if (!/^[a-zA-Z0-9]+$/.test(username.value)) {
    setError(username, "نام کاربری فقط می‌تواند شامل حروف و اعداد باشد");
    return false;
  }
  setSuccess(username);
  return true;
}

function validateFullname() {
  if (!/^[a-zA-Z ]+$/.test(fullname.value)) {
    setError(fullname, "نام کامل باید فقط شامل حروف و فاصله باشد");
    return false;
  }
  if (!fullname.value.trim().includes(" ")) {
    setError(fullname, "لطفاً نام کامل خود را وارد کنید");
    return false;
  }
  setSuccess(fullname);
  return true;
}

function validateEmail() {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    setError(email, "لطفاً یک آدرس ایمیل معتبر وارد کنید");
    return false;
  }
  setSuccess(email);
  return true;
}

function validatePassword() {
  const pwd = password.value;
  const namePart = fullname.value.split(" ")[0] || "";
  const emailPart = email.value.split("@")[0] || "";

  if (pwd.length < 8) {
    setError(password, "رمز عبور باید حداقل ۸ کاراکتر باشد");
    return false;
  }
  if (!(/[0-9]/.test(pwd) || /[!@#$%^&*]/.test(pwd))) {
    setError(password, "رمز عبور باید شامل عدد یا نماد باشد");
    return false;
  }
  if (pwd.includes(namePart)) {
    setError(password, "رمز عبور نباید شامل نام شما باشد");
    return false;
  }
  if (pwd.includes(emailPart)) {
    setError(password, "رمز عبور نباید شامل ایمیل شما باشد");
    return false;
  }
  setSuccess(password);
  return true;
}

function validateForm() {
  const valid =
    validateUsername() &
    validateFullname() &
    validateEmail() &
    validatePassword();

  button.disabled = !valid;
  return valid;
}

[username, fullname, email, password].forEach(input => {
  input.addEventListener("input", validateForm);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateForm()) {
    console.log({
      username: username.value,
      fullname: fullname.value,
      email: email.value,
      password: "********"
    });
    alert("ثبت‌نام با موفقیت انجام شد ✅");
    form.reset();
    button.disabled = true;
    document.querySelectorAll("input").forEach(i => i.className = "");
    document.querySelectorAll("small").forEach(s => s.innerText = "");
  }
});