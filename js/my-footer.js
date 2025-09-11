function createFooter() {
    const footerHTML = `
        <center>
            <h2>
                <div class="header3"></div>
                <b>Made by <a href="/link/ak.html" target="_blank">
                    <font color="yellow">Avdhesh Kushwah</font>
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
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createFooter);
