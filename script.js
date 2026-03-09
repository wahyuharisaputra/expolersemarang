// Sticky Navbar
window.addEventListener('scroll', function() {
    const header = document.getElementById('navbar');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Hamburger Animation (basic toggle)
    hamburger.classList.toggle('toggle');
    if(hamburger.classList.contains('toggle')) {
        hamburger.children[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    }
});

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Trigger initial reveal incase elements are above fold visually
reveal();

// Kuliner Modal Logic
const kulinerModal = document.getElementById('kulinerModal');

function openKulinerModal() {
    kulinerModal.style.display = 'block';
    // Gunakan timeout kecil untuk transisi CSS
    setTimeout(() => {
        kulinerModal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden'; // Mencegah background agar tidak bisa discroll
}

function closeKulinerModal() {
    kulinerModal.classList.remove('show');
    // Tunggu animasi CSS selesai sebelum display none
    setTimeout(() => {
        kulinerModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Mengembalikan scroll
    }, 400);
}

// Sejarah Modal Logic
const sejarahModal = document.getElementById('sejarahModal');

function openSejarahModal() {
    sejarahModal.style.display = 'block';
    setTimeout(() => {
        sejarahModal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeSejarahModal() {
    sejarahModal.classList.remove('show');
    setTimeout(() => {
        sejarahModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

// Alam Modal Logic
const alamModal = document.getElementById('alamModal');

function openAlamModal() {
    alamModal.style.display = 'block';
    setTimeout(() => {
        alamModal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeAlamModal() {
    alamModal.classList.remove('show');
    setTimeout(() => {
        alamModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

// Menutup modal otomatis jika area di luar box diklik
window.addEventListener('click', (event) => {
    if (event.target === kulinerModal) {
        closeKulinerModal();
    }
    if (event.target === sejarahModal) {
        closeSejarahModal();
    }
    if (event.target === alamModal) {
        closeAlamModal();
    }
});
