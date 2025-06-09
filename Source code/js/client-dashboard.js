// Client Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Handle navigation menu clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Handle job actions
    initializeJobActions();
    
    // Handle applicant actions
    initializeApplicantActions();
    
    // Handle settings form
    initializeSettingsForm();
    
    // Handle reviews section
    initializeReviewsSection();
});

function initializeDashboard() {
    // Show active section on page load
    const activeSection = document.querySelector('.nav-link.active');
    if (activeSection) {
        const section = activeSection.getAttribute('data-section');
        showSection(section);
    }
    
    // Initialize any charts or statistics
    updateDashboardStats();
}

function initializeJobActions() {
    const jobItems = document.querySelectorAll('.job-item');
    jobItems.forEach(job => {
        const viewBtn = job.querySelector('.view-btn');
        const editBtn = job.querySelector('.edit-btn');
        const deleteBtn = job.querySelector('.delete-btn');

        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const jobId = this.closest('.job-item').dataset.jobId;
                viewJobDetails(jobId);
            });
        }

        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const jobId = this.closest('.job-item').dataset.jobId;
                editJob(jobId);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const jobId = this.closest('.job-item').dataset.jobId;
                deleteJob(jobId);
            });
        }
    });
}

function initializeApplicantActions() {
    const applicantItems = document.querySelectorAll('.applicant-item');
    applicantItems.forEach(applicant => {
        const viewBtn = applicant.querySelector('.view-btn');
        const acceptBtn = applicant.querySelector('.accept-btn');
        const rejectBtn = applicant.querySelector('.reject-btn');

        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const applicantId = this.closest('.applicant-item').dataset.applicantId;
                viewApplicantProfile(applicantId);
            });
        }

        if (acceptBtn) {
            acceptBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const applicantId = this.closest('.applicant-item').dataset.applicantId;
                acceptApplicant(applicantId);
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const applicantId = this.closest('.applicant-item').dataset.applicantId;
                rejectApplicant(applicantId);
            });
        }
    });
}

function initializeSettingsForm() {
    const settingsForm = document.querySelector('#settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings(this);
        });
    }
}

function initializeReviewsSection() {
    const reviewsSection = document.querySelector('#reviews');
    if (reviewsSection) {
        loadReviews();
    }
}

// Section visibility management
function showSection(sectionId) {
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
    
    // Update URL hash for bookmarking
    window.location.hash = sectionId;
}

// Dashboard statistics
function updateDashboardStats() {
    // In production, this would fetch real data from the server
    const stats = {
        postedJobs: 8,
        hired: 5,
        applications: 24,
        rating: 4.9
    };
    
    // Update stats in the UI
    document.querySelectorAll('.stat-value').forEach(stat => {
        const statType = stat.closest('.stat-card').querySelector('.stat-title').textContent.toLowerCase();
        if (stats[statType]) {
            stat.textContent = stats[statType];
        }
    });
}

// Job management functions
function viewJobDetails(jobId) {
    // For prototype, redirect to job details page
    window.location.href = `job-details.html?id=${jobId}`;
}

function editJob(jobId) {
    // For prototype, redirect to job edit page
    window.location.href = `edit-job.html?id=${jobId}`;
}

function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job?')) {
        // For prototype, just show an alert
        alert(`Job ID: ${jobId} has been deleted`);
        // In production, this would make an API call to delete the job
        // After successful deletion, remove the job item from the UI
        const jobItem = document.querySelector(`.job-item[data-job-id="${jobId}"]`);
        if (jobItem) {
            jobItem.remove();
        }
    }
}

// Applicant management functions
function viewApplicantProfile(applicantId) {
    // For prototype, redirect to applicant profile page
    window.location.href = `student-profile.html?id=${applicantId}`;
}

function acceptApplicant(applicantId) {
    if (confirm('Are you sure you want to accept this applicant?')) {
        // For prototype, just show an alert
        alert(`Applicant ID: ${applicantId} has been accepted`);
        // In production, this would make an API call to update the application status
        // After successful acceptance, update the UI
        const applicantItem = document.querySelector(`.applicant-item[data-applicant-id="${applicantId}"]`);
        if (applicantItem) {
            applicantItem.classList.add('accepted');
            const actions = applicantItem.querySelector('.applicant-actions');
            if (actions) {
                actions.innerHTML = '<span class="badge badge-success">Accepted</span>';
            }
        }
    }
}

function rejectApplicant(applicantId) {
    if (confirm('Are you sure you want to reject this applicant?')) {
        // For prototype, just show an alert
        alert(`Applicant ID: ${applicantId} has been rejected`);
        // In production, this would make an API call to update the application status
        // After successful rejection, update the UI
        const applicantItem = document.querySelector(`.applicant-item[data-applicant-id="${applicantId}"]`);
        if (applicantItem) {
            applicantItem.classList.add('rejected');
            const actions = applicantItem.querySelector('.applicant-actions');
            if (actions) {
                actions.innerHTML = '<span class="badge badge-danger">Rejected</span>';
            }
        }
    }
}

// Settings management
function saveSettings(form) {
    // For prototype, just show an alert
    alert('Settings saved successfully');
    // In production, this would make an API call to save the settings
}

// Reviews management
function loadReviews() {
    // For prototype, just show a message
    const reviewsSection = document.querySelector('#reviews');
    if (reviewsSection) {
        reviewsSection.innerHTML += `
            <div class="no-reviews">
                <p>No reviews yet. Reviews will appear here once students complete their jobs.</p>
            </div>
        `;
    }
} 