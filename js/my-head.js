// Function to append head content without overwriting
function createHead() {
    const headHTML = `
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="theme-color" content="#161616">
        <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/ajax/libs/bootstrap/4.3.1/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/wrapper.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/ajax/libs/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="/js/click-heart.js"></script>
        <script src="/js/menu/list.js"></script>
    `;

    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headHTML;

    // Append each child to <head>
    while (tempDiv.firstChild) {
        document.head.appendChild(tempDiv.firstChild);
    }

    console.log("Head content appended successfully."); // Debug: Check in console
}

// Call on DOM loaded
document.addEventListener('DOMContentLoaded', createHead);
