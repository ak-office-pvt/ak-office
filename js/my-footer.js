function createFooter() {
    console.log("Loading footer content..."); // Debug: Check if footer is loading
    const footerHTML = `
        <center>
            <h2>
                <div class="header3"></div>
                <b>Made by <a href="/link/ak.html" target="_blank">
                    <span style="color: yellow">Avdhesh Kushwah</span>
                </a></b>
            </h2>
            <br>
            <script type="text/javascript" src="//widget.supercounters.com/ssl/online_i.js"></script>
            <script type="text/javascript">sc_online_i(1689631, "ffffff", "303030");</script><br>
        </center>
        <br><br>
    `;
    
    const footerElement = document.createElement('footer');
    footerElement.innerHTML = footerHTML;
    document.body.appendChild(footerElement);
    console.log("Footer content loaded successfully.");
}

document.addEventListener('DOMContentLoaded', createFooter);
