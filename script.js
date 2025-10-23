const stateSelect = document.getElementById("state");
const lgaSelect = document.getElementById("lga");

// Karanta nigeria.json
async function loadNigeriaData() {
  try {
    const response = await fetch("nigeria.json");
    const data = await response.json();

    // Cika list din jahohi
    Object.keys(data).forEach(state => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });

    // Lokacin da aka zabi jaha
    stateSelect.addEventListener("change", () => {
      const selectedState = stateSelect.value;
      lgaSelect.innerHTML = '<option value="">-- Zaɓi LGA --</option>';

      if (selectedState && data[selectedState]) {
        data[selectedState].forEach(lga => {
          const opt = document.createElement("option");
          opt.value = lga;
          opt.textContent = lga;
          lgaSelect.appendChild(opt);
        });
      }
    });
  } catch (error) {
    alert("An kasa loda fayil ɗin nigeria.json");
    console.error(error);
  }
}

// Kira function
loadNigeriaData();