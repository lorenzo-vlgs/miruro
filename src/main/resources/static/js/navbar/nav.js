
async function loadNavbar() {
    try {
        const response = await fetch('/html/navbar/nav.html');
        const text = await response.text();

        let oldelem = document.querySelector("script#replace_with_navbar");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);

        checkAuthStatus(); 
    
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/status');
        const isAuthenticated = await response.json();

        const dropdownMenu = document.getElementById('auth-dropdown');
        dropdownMenu.innerHTML = '';

        if (isAuthenticated) {
            dropdownMenu.innerHTML = `
                <li><a class="dropdown-item" href="/profile"><i class="bi bi-person"></i> Profile</a></li>
                <li><a class="dropdown-item" href="/logout"><i class="bi bi-box-arrow-right"></i> Log Out</a></li>
            `;
        } else {
            dropdownMenu.innerHTML = `
                <li><a class="dropdown-item" href="/login.html"><i class="bi bi-box-arrow-in-right"></i> Log In</a></li>
                <li><a class="dropdown-item" href="/register"><i class="bi bi-person-plus"></i> Register</a></li>
            `;
        }
    } catch (error) {
        console.error('Error fetching authentication status:', error);
    }
}

window.onload = loadNavbar;