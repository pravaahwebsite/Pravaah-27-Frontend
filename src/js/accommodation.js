/**
 * PRAVAAH 2026 - ACCOMMODATION PORTAL
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Nav indicator pill alignment for active ACCOMMODATION nav item
    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');
    
    if (activeNav && pill) {
        const updatePill = () => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        };

        updatePill();
        setTimeout(updatePill, 100);
        window.addEventListener('resize', updatePill);
    }

    // 2. Hostel Configuration & Fee Configuration Object
    // Values left null until official fees are announced
    const HOSTEL_FEES = {
        "sangam": null,
        "ganga": null,
        "rusikulya": null,
        "brahmaputra": null
    };

    const HOSTEL_OPTIONS = {
        girls: [
            { value: "sangam", label: "Sangam Hall of Residence" },
            { value: "ganga", label: "Ganga Hall of Residence" }
        ],
        boys: [
            { value: "rusikulya", label: "Rusikulya Hall of Residence" },
            { value: "brahmaputra", label: "Brahmaputra Hall of Residence" }
        ]
    };

    // DOM Elements
    const categorySelect = document.getElementById("acc-category");
    const hostelSelect = document.getElementById("acc-hostel");
    const feeStatusDisplay = document.getElementById("feeStatusDisplay");

    // Dynamic Hostel Dropdown Filtering
    if (categorySelect && hostelSelect) {
        categorySelect.addEventListener("change", (e) => {
            const selectedCategory = e.target.value;

            // Reset Hostel Select Dropdown
            hostelSelect.innerHTML = "";

            if (selectedCategory && HOSTEL_OPTIONS[selectedCategory]) {
                // Enable hostel selection
                hostelSelect.disabled = false;

                // Default choose option
                const defaultOpt = document.createElement("option");
                defaultOpt.value = "";
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                defaultOpt.textContent = "-- Select Hostel / Hall --";
                hostelSelect.appendChild(defaultOpt);

                // Add correct two options
                HOSTEL_OPTIONS[selectedCategory].forEach(h => {
                    const opt = document.createElement("option");
                    opt.value = h.value;
                    opt.textContent = h.label;
                    hostelSelect.appendChild(opt);
                });
            } else {
                // Disabled state before category selection
                hostelSelect.disabled = true;
                const defaultOpt = document.createElement("option");
                defaultOpt.value = "";
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                defaultOpt.textContent = "-- Select category first --";
                hostelSelect.appendChild(defaultOpt);
            }

            updateFeeDisplay(hostelSelect.value);
        });

        hostelSelect.addEventListener("change", (e) => {
            updateFeeDisplay(e.target.value);
        });
    }

    function updateFeeDisplay(hostelValue) {
        if (!feeStatusDisplay) return;

        if (hostelValue && HOSTEL_FEES[hostelValue] !== null) {
            feeStatusDisplay.textContent = `FEE: ₹${HOSTEL_FEES[hostelValue]}`;
        } else {
            // Exact status text required
            feeStatusDisplay.textContent = "[ ACCOMMODATION FEE — TO BE ANNOUNCED ]";
        }
    }
});
