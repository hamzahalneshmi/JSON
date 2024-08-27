function fetchData() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/hamzahalneshmi/JSON/newdesign/db.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Replace placeholders in the entire HTML with the corresponding data
            $('body').html(function(index, html) {
                return html
                    .replace(/VisitRepo/g, '<a href=' + data.link + ' target=_blank>' + 'Click Here' + '</a>')
                    .replace(/RepoName/g, data.ReopName)
                    .replace(/Details1/g, '<button type=button id=detailsButton class=btn btn-primary data-bs-toggle=modal data-bs-target=#detailsModal>Details</button>')
                    .replace(/LastUpdated/g, data.lastUpdated);
            });
        },
        error: function() {
            console.error("An error occurred while fetching the data.");
        }
    });
}

$(document).ready(function() {
    fetchData(); // Fetch and display the data immediately
    setInterval(fetchData, 10000); // Optionally, refresh the data every 10 seconds
});