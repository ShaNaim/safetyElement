const form = document.querySelector("form");
const emailError = document.querySelector(".email.error");
const firstNameError = document.querySelector(".firstName.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset Errors
  emailError.textContent = "";
  firstNameError.testContent = "";
  //lastNameError.testContent = "";
  passwordError.textContent = "";
  //get the values
  const email = form.email.value;
  const password = form.password.value;
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const contact = form.contact.value;
  const dob = form.dob.value;
  const gender = form.gender.value;
  const address = `${form.house.value} , ${form.area.value} , ${form.city.value} , ${form.zip.value}`;
  console.log(address);
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(contact, gender);
    const res = await fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        contact,
        dob,
        gender,
        address,
      }),
      headers: myHeaders,
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      firstNameError.textContent = data.errors.name;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (error) {
    console.log(error);
  }
});
