document.addEventListener("DOMContentLoaded", () => {
    // Dynamically assign attributes and randomly distribute scholarship types/statuses for demo purposes
    document.querySelectorAll('.country-section').forEach(section => {
        const country = section.dataset.country;
        let region = 'latam'; // default
        if (['usa', 'canada'].includes(country)) region = 'na';
        else if (['espana', 'alemania'].includes(country)) region = 'europa';
        else if (['japon', 'china'].includes(country)) region = 'asia';

        section.querySelectorAll('.university-card').forEach((card, index) => {
            card.dataset.country = country;
            card.dataset.region = region;
            
            // Distribute types and statuses for demonstration
            const types = ['academica', 'economica', 'deportiva'];
            const statuses = ['abierta', 'cerrada', 'proximamente'];
            
            let myTypes = [];
            myTypes.push(types[index % 3]);
            if (index % 2 === 0) myTypes.push(types[(index + 1) % 3]);
            card.dataset.scholarship = myTypes.join(',');
            
            const myStatus = statuses[index % 3];
            card.dataset.status = myStatus;

            // Update the UI Badge
            const badge = card.querySelector('.status-badge');
            if (badge) {
                badge.innerText = `Becas MESCyT 2026: ${myStatus.charAt(0).toUpperCase() + myStatus.slice(1)}`;
                badge.className = `status-badge status-${myStatus}`;
            }
            
            // Append a small tag for the scholarship types
            const tagsContainer = card.querySelector('.card-tags');
            if (tagsContainer) {
                myTypes.forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'tag scholarship-tag';
                    span.innerText = `Beca ${t.charAt(0).toUpperCase() + t.slice(1)}`;
                    tagsContainer.appendChild(span);
                });
            }
        });
    });

    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const countryFilter = document.getElementById('countryFilter');
    const scholarshipFilter = document.getElementById('scholarshipFilter');
    const statusFilter = document.getElementById('statusFilter');
    const resetBtn = document.getElementById('resetFiltersBtn');

    function applyFilters() {
        const searchText = searchInput.value.toLowerCase().trim();
        const region = regionFilter.value;
        const country = countryFilter.value;
        const scholarship = scholarshipFilter.value;
        const status = statusFilter.value;

        document.querySelectorAll('.university-card').forEach(card => {
            const text = card.innerText.toLowerCase();
            const cardRegion = card.dataset.region;
            const cardCountry = card.dataset.country;
            const cardScholarship = card.dataset.scholarship || "";
            const cardStatus = card.dataset.status;

            const matchSearch = text.includes(searchText);
            const matchRegion = region === 'all' || cardRegion === region;
            const matchCountry = country === 'all' || cardCountry === country;
            const matchScholarship = scholarship === 'all' || cardScholarship.includes(scholarship);
            const matchStatus = status === 'all' || cardStatus === status;

            if (matchSearch && matchRegion && matchCountry && matchScholarship && matchStatus) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Hide/show section headers
        document.querySelectorAll('.country-section').forEach(section => {
            const hasVisibleCards = Array.from(section.querySelectorAll('.university-card')).some(c => c.style.display !== 'none');
            section.style.display = hasVisibleCards ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('input', applyFilters);
    regionFilter.addEventListener('change', () => {
        // If region changes, reset country to 'all' because it might be incompatible
        countryFilter.value = 'all';
        applyFilters();
    });
    countryFilter.addEventListener('change', () => {
        // Automatically sync region based on country selection
        const val = countryFilter.value;
        if (['rd', 'colombia', 'mexico'].includes(val)) regionFilter.value = 'latam';
        else if (['usa', 'canada'].includes(val)) regionFilter.value = 'na';
        else if (['espana', 'alemania'].includes(val)) regionFilter.value = 'europa';
        else if (['japon', 'china'].includes(val)) regionFilter.value = 'asia';
        applyFilters();
    });
    scholarshipFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);

    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        regionFilter.value = 'all';
        countryFilter.value = 'all';
        scholarshipFilter.value = 'all';
        statusFilter.value = 'all';
        applyFilters();
    });

    // Initial apply to setup view
    applyFilters();
});