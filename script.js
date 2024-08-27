function fetchData() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/hamzahalneshmi/JSON/newdesign/db.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Replace placeholders in the entire HTML with the corresponding data
            $('body').html(function(index, html) {
                return html
                    .replace(/RepoName/g, data.repository_full_name)
                    .replace(/Details1/g, '<button type=button id=detailsButton class=btn btn-primary data-bs-toggle=modal data-bs-target=#detailsModal>Details</button>')
                    .replace(/LastUpdated/g, new Date(data.started_at).toLocaleString())
                    .replace(/Status1/g, data.status);
            });
            // Update modal with JSON data when button is clicked
            $('#detailsButton').on('click', function() {
                $('#workflowJobId').text(data.workflow_job_id);
                $('#workflowName').text(data.workflow_name);
                $('#headBranch').text(data.head_branch);
                $('#status').text(data.status);
                $('#repositoryFullName').text(data.repository_full_name);
                $('#startedAt').text(new Date(data.started_at).toLocaleString());
                $('#htmlUrl').attr('href', data.html_url);
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