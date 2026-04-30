document.querySelectorAll('.filter-btn').forEach(btn => {
btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const country = this.dataset.country;
    document.querySelectorAll('.country-section').forEach(section => {
    section.style.display = (country === 'all' || section.dataset.country === country)
        ? 'block' : 'none';
    });
    });
});