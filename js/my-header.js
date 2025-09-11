function createHeader() {
    console.log("Loading header content..."); // Debug: Check if header is loading
    const headerHTML = `
        <div class="header">
            <header class="header navbar-wapmash">
                <button class="header__button" id="btnNav" type="button">
                    <h2></h2>
                    <i class="material-icons">menu</i>
                </button>
                <h2></h2>
                <a href="/"><img src="/assets/img/logo.png" alt="logo" width="140" height="37" /></a>
                <h2></h2>
            </header>
        </div>
        <nav class="nav preload">
            <div class="nav__links">
                <a href="/" class="nav__link nav__link--active">
                    <i class="material-icons">home</i> Home
                </a>
                <a class="nav__link" href="/logout.html">
                    <i class="material-icons">login</i> Account
                </a>
                <a class="nav__link" href="/Copyright.html">
                    <i class="material-icons">copyright</i> Copyright
                </a>
                <a class="nav__link" href="/Privacy_Policy.html">
                    <i class="material-icons">policy</i> Privacy Policy
                </a>
                <div class="nav__title"><i class="material-icons">search</i> Search</div>
                <form class="search" action="/" method="get">
                    <input type="text" name="to-search" class="search-box" maxlength="2048" value="" placeholder="Search" />
                    <input type="submit" value="Search" />
                </form>
                <div style="color:#5b5b5b;font-size:13px;padding:0px 8px 8px 12px;">Search by Name, Category etc.</div>
            </div>
            <div class="nav__overlay"></div>
        </nav>
    `;
    
    const headerElement = document.createElement('div');
    headerElement.innerHTML = headerHTML;
    document.body.insertBefore(headerElement, document.body.firstChild);
    console.log("Header content loaded successfully.");
}

document.addEventListener('DOMContentLoaded', createHeader);
