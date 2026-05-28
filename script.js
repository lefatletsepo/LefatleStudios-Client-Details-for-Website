document.addEventListener("DOMContentLoaded", () => {
    const steps = Array.from(document.querySelectorAll(".form-step"));
    const progressSteps = Array.from(document.querySelectorAll(".progress-bar .step"));
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const form = document.getElementById("projectForm");

    let currentStep = 0;

    // Next Step Event Listener
    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (validateStepInputs()) {
                currentStep++;
                updateFormSteps();
            }
        });
    });

    // Previous Step Event Listener
    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            updateFormSteps();
        });
    });

    // Handle updates for views and progress bar
    function updateFormSteps() {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        progressSteps.forEach((pStep, index) => {
            pStep.classList.toggle("active", index <= currentStep);
        });
    }

    // Simple built-in validation before proceeding
    function validateStepInputs() {
        const activeStepInputs = steps[currentStep].querySelectorAll("input[required], textarea[required]");
        let allValid = true;

        activeStepInputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                allValid = false;
            }
        });

        return allValid;
    }

    // Form submission 
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Gather values from form inputs
        const fullName = document.getElementById("fullName").value;
        const companyName = document.getElementById("companyName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value || "Not provided";
        const currentUrl = document.getElementById("currentUrl").value || "None";
        const socials = document.getElementById("socials").value || "None";
        
        const businessNature = document.getElementById("businessNature").value || "Not provided";
        const websiteGoal = document.getElementById("websiteGoal").value;
        const pagesRequired = Array.from(document.querySelectorAll("input[name='pages']:checked")).map(el => el.value).join(", ") || "None selected";
        const featuresRequired = Array.from(document.querySelectorAll("input[name='features']:checked")).map(el => el.value).join(", ") || "None selected";
        
        const brandIdentity = document.getElementById("brandIdentity").value === "yes" ? "Yes (Assets ready)" : "No (Needs LefatleStudios to design)";
        const vibeStyle = Array.from(document.querySelectorAll("input[name='vibe']:checked")).map(el => el.value).join(", ") || "None selected";
        const inspiration = document.getElementById("inspiration").value || "None provided";
        const copywriting = document.getElementById("copywriting").value === "providing" ? "Client providing text" : "Needs help writing content";
        
        const domainOwned = document.getElementById("domainOwned").value === "yes" ? "Yes" : "No (Needs help purchasing)";
        const launchDate = document.getElementById("launchDate").value || "Flexible";
        const budget = document.getElementById("budget").value || "Not specified";
        const driveLink = document.getElementById("driveLink").value || "None provided";

        // Generate a beautiful, clean Markdown README structured text block
        let readmeText = `# Project Details: ${companyName}\n\n`;
        readmeText += `## 1. Contact Info\n`;
        readmeText += `* **Client:** ${fullName}\n`;
        readmeText += `* **Email:** ${email}\n`;
        readmeText += `* **Phone/WA:** ${phone}\n`;
        readmeText += `* **Current Web:** ${currentUrl}\n`;
        readmeText += `* **Socials:** ${socials}\n\n`;
        
        readmeText += `## 2. Project Scope\n`;
        readmeText += `* **Business Nature:** ${businessNature}\n`;
        readmeText += `* **Primary Goal:** ${websiteGoal}\n`;
        readmeText += `* **Pages Needed:** ${pagesRequired}\n`;
        readmeText += `* **Features Needed:** ${featuresRequired}\n\n`;
        
        readmeText += `## 3. Brand & Visual Design\n`;
        readmeText += `* **Has Brand Kit:** ${brandIdentity}\n`;
        readmeText += `* **Vibe/Aesthetic:** ${vibeStyle}\n`;
        readmeText += `* **Inspiration links:** ${inspiration}\n`;
        readmeText += `* **Copywriting status:** ${copywriting}\n\n`;
        
        readmeText += `## 4. Logistics & Launch\n`;
        readmeText += `* **Domain Owned:** ${domainOwned}\n`;
        readmeText += `* **Target Launch:** ${launchDate}\n`;
        readmeText += `* **Allocated Budget:** ${budget}\n`;
        readmeText += `* **Assets Folder Link:** ${driveLink}\n\n`;
        readmeText += `*Generated via LefatleStudios Web Onboarding System.*`;

        // Base WhatsApp Business link provided by user
        const baseUrl = "https://wa.me/message/NZDAVGURN5ZCO1";
        
        // Encode the README text block to safely append to URL query string
        const finalUrl = `${baseUrl}?text=${encodeURIComponent(readmeText)}`;

        // Open WhatsApp in a new tab to send the formatted details
        window.open(finalUrl, "_blank");

        // Notify client and reset layout gracefully
        alert("Awesome! Your detailed README file layout has been compiled. You are being redirected to WhatsApp to submit it to LefatleStudios.");
        form.reset();
        currentStep = 0;
        updateFormSteps();
    });
});
