document.getElementById("galleryMoldForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const loader = document.getElementById("formLoader");
    loader.style.display = "block";

    // Get form values
    let name = document.getElementById("name").value.trim();
    let contactInfo = document.getElementById("contactInfo").value.trim();
    let message = document.getElementById("message").value.trim();

    // Validate contact
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{10,15})$/;
    const isEmail = emailRegex.test(contactInfo);
    const isPhone = phoneRegex.test(contactInfo);

    if (!isEmail && !isPhone) {
        alert("Please enter a valid email or phone number.");
        loader.style.display = "none";
        return;
    }

    // Prepare data
    const data = {
        emails: ["shilpa.designs@gmail.com"],
        cc: ["thegallerymold@gmail.com"],
        subject: "New Website Registration",
        message: `<strong>Name</strong>: ${name}<br/>
                  <strong>Contact</strong>: ${contactInfo}<br/>
                  <strong>Message</strong>: ${message || "N/A"}`
    };

    // Send request
    try {
        const response = await fetch("https://mailer-5x4h33dpla-uc.a.run.app/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        if (response.ok) {
            document.getElementById("galleryMoldForm").reset();
            window.open("thankyou.html");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            alert("Failed: " + result);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong. Please try again later.");
    } finally {
        loader.style.display = "none";
    }
});

