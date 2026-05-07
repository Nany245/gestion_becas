//el icono del birrete que ya no esta

const icono = document.getElementById("icono");

document.addEventListener("mousemove", (e) => {

    const rect = icono.getBoundingClientRect();

    // centro del icono
    const iconoX = rect.left + rect.width / 2;
    const iconoY = rect.top + rect.height / 2;

    // distancia entre mouse y el icono
    const deltaX = e.clientX - iconoX;
    const deltaY = e.clientY - iconoY;

    // rotación basada en esa distancia
    const rotateY = deltaX / 20;
    const rotateX = -deltaY / 20;

    icono.style.transform = `
        translateY(-5px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;
});

   
//el slider de los paises
const track = document.getElementById("sliderTrack");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let scrollAmount = 0;

const scrollStep = 600;

nextBtn.addEventListener("click", () => {
    scrollAmount += scrollStep;

    track.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    });
});

prevBtn.addEventListener("click", () => {
    scrollAmount -= scrollStep;

    if (scrollAmount < 0) scrollAmount = 0;

    track.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    });
});



//la barra de becas por tipo

const opciones = document.querySelectorAll(".barra2 p");


const becas = document.querySelectorAll(".beca-card");


opciones.forEach(opcion => {
    opcion.addEventListener("click", () => {
        
        const texto = opcion.textContent.toLowerCase();

        becas.forEach(beca => {
            if (texto.includes("excelencia")) {
                beca.style.display = beca.classList.contains("excelencia") ? "block" : "none";
            } 
            else if (texto.includes("económica") || texto.includes("economica")) {
                beca.style.display = beca.classList.contains("economica") ? "block" : "none";
            }
        });

    });
});
   
