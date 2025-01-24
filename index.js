function addSkill() {
    const skillsList = document.getElementById('skills-list');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'skill';
    input.placeholder = 'Enter a skill';
    input.required = true;
    skillsList.appendChild(input);
}

function addLanguage() {
    const languagesList = document.getElementById('languages-list');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'language';
    input.placeholder = 'Enter a language';
    input.required = true;
    languagesList.appendChild(input);
}

function addProject() {
    const projectsList = document.getElementById('projects-list');
    const projectDiv = document.createElement('div');
    projectDiv.innerHTML = `
        <label>Project Name:</label>
        <input type="text" name="project-name" required>
        <label>Project Description:</label>
        <textarea name="project-description" rows="3" required></textarea>
    `;
    projectsList.appendChild(projectDiv);
}

function generateResume() {
    const form = document.getElementById('resume-form');
    const resume = document.getElementById('resume');
    const content = document.getElementById('resume-content');

    const name = form.name.value;
    const dob = form.dob.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const address = form.address.value.replace(/\n/g, '<br>');
    const profession = form.profession.value;
    const summary = form.summary.value;

    const education10th = form['education-10th'].value;
    const education12th = form['education-12th'].value;
    const educationCollege = form['education-college'].value;

    const linkedin = form.linkedin.value;
    const github = form.github.value;

    const skills = Array.from(document.getElementsByName('skill')).map(input => input.value).join(', ');
    const languages = Array.from(document.getElementsByName('language')).map(input => input.value).join(', ');

    const projects = Array.from(document.getElementById('projects-list').children).map(project => {
        const name = project.querySelector('input[name="project-name"]').value;
        const description = project.querySelector('textarea[name="project-description"]').value;
        return `<strong>${name}:</strong> ${description}`;
    }).join('<br>');

    const profileImage = form['profile-image'].files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const profileImageUrl = event.target.result;

        content.innerHTML = `
            <div class="resume-header">
                <img src="${profileImageUrl}" alt="Profile Image">
                <div>
                    <h2>${name}</h2>
                    <p>${profession}</p>
                </div>
            </div>
            <div class="resume-content">
                <div class="resume-section">
                    <div class="section-title">Personal Information</div>
                    <p><strong>Date of Birth:</strong> ${dob}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Address:</strong> ${address}</p>
                </div>
                <div class="resume-section">
                    <div class="section-title">Summary</div>
                    <p>${summary}</p>
                </div>
                <div class="resume-section">
                    <div class="section-title">Education</div>
                    <p><strong>10th Percentage:</strong> ${education10th}</p>
                    <p><strong>12th Percentage:</strong> ${education12th}</p>
                    <p><strong>College CGPA:</strong> ${educationCollege}</p>
                </div>
                <div class="resume-section">
                    <div class="section-title">Skills</div>
                    <p>${skills}</p>
                </div>
                <div class="resume-section">
                    <div class="section-title">Languages</div>
                    <p>${languages}</p>
                </div>
                <div class="resume-section">
                    <div class="section-title">Projects</div>
                    <p>${projects}</p>
                </div>
                <div class="resume-section">
                    <div class="section-title">Links</div>
                    <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                    <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
                </div>
            </div>
        `;

        resume.style.display = 'block';
    };

    if (profileImage) {
        reader.readAsDataURL(profileImage);
    }
}

function downloadResume() {
    const content = document.getElementById('resume-content');
    const options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(content).save();
}
