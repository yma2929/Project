// Contact form code
const form = document.querySelector("#contactForm");
const msg = document.querySelector("#msg");

// Validation functions
function isFilled(selector, messages, msg) {
    const input = document.querySelector(selector);
    if (!input || input.value.trim().length < 1) {
        messages.push(msg);
    }
    return messages;
}

function isEmail(selector, messages, msg) {
    const input = document.querySelector(selector);
    if (!input || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        messages.push(msg);
    }
    return messages;
}

function isMobileValid(selector, messages, msg) {
    const input = document.querySelector(selector);
    if (!input || !/^\d{10}$/.test(input.value.trim())) {
        messages.push(msg);
    }
    return messages;
}

function isSelected(name, messages, msg) {
    const radioButtons = document.querySelectorAll(`input[name="${name}"]:checked`);
    if (radioButtons.length < 1) {
        messages.push(msg);
    }
    return messages;
}

function isOptionSelected(selector, messages, msg) {
    const input = document.querySelector(selector);
    if (!input || input.value === "") {
        messages.push(msg);
    }
    return messages;
}

// Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    let messages = [];
    messages = isFilled("#firstName", messages, "First name is required");
    messages = isFilled("#lastName", messages, "Last name is required");
    messages = isSelected("gender", messages, "Please select your gender");
    messages = isFilled("#mobile", messages, "Mobile number is required");
    if (document.querySelector("#mobile").value.trim()) {
        messages = isMobileValid("#mobile", messages, "Mobile number must be 10 digits");
    }
    messages = isFilled("#email", messages, "Email is required");
    if (document.querySelector("#email").value.trim()) {
        messages = isEmail("#email", messages, "Email format is invalid");
    }
    messages = isFilled("#date", messages, "Date of birth is required");
    messages = isOptionSelected("#language", messages, "Please select a language");
    messages = isFilled("#message", messages, "Message cannot be empty");

    if (messages.length > 0) {
        msg.innerHTML = `🚫 Issues found (${messages.length}):<br><ul><li>${messages.join("</li><li>")}</li></ul>`;
    } else {
        try {
            const formData = {
                firstName: document.querySelector("#firstName").value.trim(),
                lastName: document.querySelector("#lastName").value.trim(),
                gender: document.querySelector('input[name="gender"]:checked').value,
                mobile: document.querySelector("#mobile").value.trim(),
                date: document.querySelector("#date").value,
                email: document.querySelector("#email").value.trim(),
                language: document.querySelector("#language").value,
                message: document.querySelector("#message").value.trim()
            };

            fetch("http://localhost:4000/contact", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error connecting to server");
                }
            })
            .then(result => {
                if (result.status) {
                    msg.innerHTML = `<span style="color: green;">✅ ${result.message || "Form submitted successfully!"}</span>`;
                    form.reset(); // Clear form after success
                } else {
                    msg.innerHTML = `<span style="color: red;">❌ ${result.err || "Error submitting form!"}</span>`;
                }
            })
            .catch(error => {
                console.error('Error sending form:', error);
                msg.innerHTML = `<span style="color: red;">❌ Error connecting to server. Please try again later.</span>`;
            });
        } catch (error) {
            console.error('Error preparing form data:', error);
            msg.innerHTML = `<span style="color: red;">❌ Error preparing form data.</span>`;
        }
    }
});

// Reset button event listener
document.querySelector("#Reset").addEventListener('click', function () {
    msg.innerHTML = ''; // Clear messages on reset
});
