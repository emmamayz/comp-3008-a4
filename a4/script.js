const jobResults = document.getElementById("job-results");
const jobDetails = document.getElementById("job-details");
const searchBar = document.getElementById("job-search");
const saveBtn = document.getElementById("save-job");
const criteriaContainer = document.querySelector(".criteria-container");
const jobsPage = document.getElementById("jobsResultsPage");
const savedPage = document.getElementById("savedJobsPage");

let currentSelectedJob = null;
const savedJobs = [];


const searchPaths = {
    "software engineering internships in ottawa": "Ottawa",
    "software engineering internships in toronto": "Toronto",
    "software engineering internship in ottawa": "Ottawa",
    "software engineering internship in toronto": "Toronto"
};


function updateJobDetails(job){
    if (job){
        jobDetails.hidden = false;
        document.querySelector(".details-company").textContent = job.company;
        document.querySelector(".details-title").textContent = job.name;
        document.querySelector(".details-location").textContent = job.location;
        document.querySelector(".details-type").textContent = job.type;
        currentSelectedJob = job;
    } else {
        jobDetails.hidden = true;
    }
    document.getElementById("save-confirmation").hidden = true;

}


function populateJobResults(location){
    //clear everything, find matching jobs, create new buttons for each job posting
    jobResults.innerHTML = "";
    const matchingJobs = jobData.filter(job => job.location === location);
    document.getElementById("results-count").textContent = `${matchingJobs.length} results`;
    if(matchingJobs.length !== 0){
        document.getElementById("criteria-section").hidden = false;
        document.getElementById("location-tag").textContent = location;

        matchingJobs.forEach(job => {
            const jobPosting = document.createElement("button");

            jobPosting.className = "job-card";
            jobPosting.type = "button";
            jobPosting.dataset.jobId = job.id;

            jobPosting.innerHTML = `<div class="job-card-header">
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
            jobPosting.addEventListener("click", ()=>updateJobDetails(job));
            
            jobResults.appendChild(jobPosting);

            if(matchingJobs[0] === job){
                updateJobDetails(job);
            }
        });
    }


    
}

function displaySearchResults(searchQuery){
    jobsPage.hidden = false;
    savedPage.hidden = true;
    const lowercaseSearch = searchQuery.toLowerCase().trim();

    const location = searchPaths[lowercaseSearch];

    if(location){
        populateJobResults(location);
    } else {
        populateJobResults("");
        document.getElementById("criteria-section").hidden = true;
        jobDetails.hidden = true;
        jobResults.innerHTML = `<p>No results found for search "${searchQuery}".</p>` 

    }
}

const savedSearch = sessionStorage.getItem("searchQuery") || "";
displaySearchResults(savedSearch);

