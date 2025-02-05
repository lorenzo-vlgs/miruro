
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
        const data = await response.json();
        const isAuthenticated = data.isAuthenticated;
        const isAdmin = data.isAdmin;

        const dropdownMenu = document.getElementById('auth-dropdown');
        dropdownMenu.innerHTML = '';

        if (isAuthenticated) {
            let menuItems = `
                <li><a class="dropdown-item" href="/profile"><i class="bi bi-person"></i> Profile</a></li>
            `;

            if (isAdmin) {
                menuItems += `
                    <li><a class="dropdown-item" href="/admin"><i class="bi bi-person-video3"></i> View Admin</a></li>
                `;
            }

            menuItems += `
                <li><a class="dropdown-item" href="/logout"><i class="bi bi-box-arrow-right"></i> Log Out</a></li>
            `;

            dropdownMenu.innerHTML = menuItems;
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