document.getElementById("contactForm").addEventListener("submit", function(event) {
    let isGeldig = true;

    function showError(id, message) {
        document.getElementById(id).innerHTML = message + "<br>";
        isGeldig = false;
    }

    function clearError(id) {
        document.getElementById(id).innerHTML = "";
    }

    const voornaam = document.getElementById("voornaam").value.trim();
    if (voornaam === "") {
        showError("voornaamError", "First name is required.");
    } else {
        clearError("voornaamError");
    }

    const achternaam = document.getElementById("achternaam").value.trim();
    if (achternaam === "") {
        showError("achternaamError", "Last name is required.");
    } else {
        clearError("achternaamError");
    }

    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    if (!emailPattern.test(email)) {
        showError("emailError", "Please enter a valid email address.");
    } else {
        clearError("emailError");
    }

    const bericht = document.getElementById("bericht").value.trim();
    if (bericht === "") {
        showError("berichtError", "Message cannot be empty.");
    } else {
        clearError("berichtError");
    }

    if (!isGeldig) {
        event.preventDefault();
    }
});