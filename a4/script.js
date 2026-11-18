const jobResults = document.getElementById("job-results");
const jobDetails = document.getElementById("job-details");
const searchBar = document.getElementById("job-search");
const saveBtn = document.getElementById("save-button");
const criteriaContainer = document.querySelector(".criteria-container");

let currentSelectedJob = null;

const searchPaths = {
    "software engineering internships in ottawa": "Ottawa",
    "software engineering internships in toronto": "Toronto"
};

const savedJobs = [];

function updateJobDetails(job){
    jobDetails.hidden = false;
    if (job){
        document.querySelector(".details-company").textContent = job.company;
        document.querySelector(".details-title").textContent = job.name;
        document.querySelector(".details-location").textContent = job.location;
        document.querySelector(".details-type").textContent = job.type;
    } else {
        jobDetails.hidden = true;
    }
    document.getElementById("save-confirmation").hidden = true;

}

function populateJobResults(location){
    //clear everything, find matching jobs, create new buttons for each job posting
    const matchingJobs = jobData.filter(job => job.location === location);
    document.getElementById("results-count").textContent = `${matchingJobs.length} results`;
    if(matchingJobs.length !== 0){
        document.getElementById("criteria-section").hidden = false;
        document.getElementById("location-tag") = location;

        matchingJobs.forEach(job => {
            const jobPosting = document.createElement("button");

            jobPosting.class = "job-card";
            jobPosting.type = "button";
            jobPosting.dataset.jobId = job.id;

            jobPosting.innerHTML = `div class="job-card-header">
                            <h2>${job.name}</h2>

                            <div class="job-card-tags">
                                <span class="mini-tag role-tag">${job.role}</span>
                                <span class="mini-tag type-tag">${job.type}</span>
                                <span class="mini-tag location-tag">${job.location}</span>
                            </div>
                        </div>

                        <p class="job-company">${job.company}</p>
                        <p class="job-location">${job.detailLocation}</p>`
            ;
            jobPosting.addEventListener("click", updateJobDetails(jobPosting));
            
            jobResults.appendChild(jobPosting);

            if(matchingsJobs[0] === job){
                updateJobDetails(jobPosting);
            }
        });
    }


    
}



