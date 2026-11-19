const searchBar = document.getElementById("job-search");

searchBar.addEventListener("keydown", (event) => {
    //searched this up
    if(event.key === "Enter") {
        const newSearch = searchBar.value.trim();
        sessionStorage.setItem("searchQuery", newSearch);
        window.location.href = "results.html"
    }
});
