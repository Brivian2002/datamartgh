// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
});

// ===== NETWORK SELECTION & BUNDLE DATA =====
const networkItems = document.querySelectorAll('.network-item');
const bundleGrid = document.getElementById('bundleGrid');

// Bundle data for different networks
const bundles = {
    mtn: [
        { size: '1GB', price: '5.00', oldPrice: '7.00', validity: '30 days', popular: true },
        { size: '2GB', price: '9.00', oldPrice: '12.00', validity: '30 days', popular: false },
        { size: '5GB', price: '20.00', oldPrice: '25.00', validity: '30 days', popular: false },
        { size: '10GB', price: '35.00', oldPrice: '40.00', validity: '30 days', popular: false }
    ],
    vodafone: [
        { size: '1GB', price: '5.00', oldPrice: '7.00', validity: '30 days', popular: true },
        { size: '3GB', price: '12.00', oldPrice: '15.00', validity: '30 days', popular: false },
        { size: '6GB', price: '22.00', oldPrice: '27.00', validity: '30 days', popular: false },
        { size: '12GB', price: '40.00', oldPrice: '45.00', validity: '30 days', popular: false }
    ],
    airteltigo: [
        { size: '1GB', price: '5.00', oldPrice: '7.00', validity: '30 days', popular: true },
        { size: '2.5GB', price: '10.00', oldPrice: '13.00', validity: '30 days', popular: false },
        { size: '5GB', price: '18.00', oldPrice: '23.00', validity: '30 days', popular: false },
        { size: '8GB', price: '28.00', oldPrice: '33.00', validity: '30 days', popular: false }
    ],
    glo: [
        { size: '1GB', price: '5.00', oldPrice: '7.00', validity: '30 days', popular: true },
        { size: '2GB', price: '9.50', oldPrice: '12.00', validity: '30 days', popular: false },
        { size: '4GB', price: '17.00', oldPrice: '22.00', validity: '30 days', popular: false },
        { size: '7GB', price: '28.00', oldPrice: '33.00', validity: '30 days', popular: false }
    ]
};

// Function to render bundles
function renderBundles(network) {
    const selectedBundles = bundles[network] || bundles.mtn;
    bundleGrid.innerHTML = selectedBundles.map(bundle => `
        <div class="bundle-card ${bundle.popular ? 'popular' : ''}">
            <div class="bundle-size">${bundle.size}</div>
            <div class="bundle-price">
                GH₵${bundle.price} <span>was GH₵${bundle.oldPrice}</span>
            </div>
            <ul class="bundle-features">
                <li><i class="fas fa-check"></i> Valid for ${bundle.validity}</li>
                <li><i class="fas fa-check"></i> All networks supported</li>
                <li><i class="fas fa-check"></i> Instant delivery</li>
            </ul>
            <button class="btn-buy" onclick="window.open('https://www.cheapdata.shop/shop/brivian-ltd', '_blank')">
                Buy ${bundle.size} for GH₵${bundle.price}
            </button>
        </div>
    `).join('');
}

// Network selection handler
networkItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all
        networkItems.forEach(n => n.classList.remove('active'));
        // Add active class to clicked
        item.classList.add('active');
        // Get network and render bundles
        const network = item.dataset.network;
        renderBundles(network);
    });
});

// Initial render with MTN bundles
renderBundles('mtn');

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            mainNav.classList.remove('show');
        }
    });
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== COPY PHONE NUMBER FUNCTIONALITY (optional) =====
function copyPhoneNumber() {
    const phoneNumber = '+233XXXXXXXXX';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert('Phone number copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
