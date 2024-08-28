function fetchData() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/hamzahalneshmi/JSON/newdesign/db.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Replace placeholders in the entire HTML with the corresponding data
            $('body').html(function(index, html) {
                return html
                    .replace(/RepoName1/g, data.repository_full_name)
                    .replace(/Details1/g, '<button type=button id=detailsButton class=btn data-bs-toggle=modal data-bs-target=#detailsModal>Details</button>')
                    .replace(/LastUpdated1/g, new Date(data.started_at).toLocaleString())
                    .replace(/Status1/g, data.status);
            });
            // Update modal with JSON data when button is clicked
            $('#detailsButton').on('click', function() {
                $('#workflowJobId').text(data.workflow_job_id);
                $('#workflowName').text(data.workflow_name);
                $('#headBranch').text(data.head_branch);
                $('#senderlogin').text(data.sender_login);
                $('#status').text(data.status);
                $('#repositoryFullName').text(data.repository_full_name);
                $('#startedAt').text(new Date(data.started_at).toLocaleString());
                $('#htmlUrl').attr('href', data.html_url);
                $('#version1').text(data.version1);
                $('#version2').text(data.version2);
                $('#version3').text(data.version3);
                $('#version4').text(data.version4);
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