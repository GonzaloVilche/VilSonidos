const SUPABASE_URL = "https://onxxudtngavrnpulydrn.supabase.co";
const SUPABASE_KEY = "sb_publishable_aT4IGFAaLtcCCnt5RtKLWw_SqF1YTpI"; // Key pública
const WHATSAPP_NUMBER = "5492994152246";

// Inicializar cliente de Supabase
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = contactForm.querySelector(".btn-enviar");
      const originalBtnText = btnSubmit.textContent;

      // Obtener datos del formulario
      const formData = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        mensaje: document.getElementById("mensaje").value,
        created_at: new Date().toISOString(),
      };

      try {
        // Estado de carga
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Enviando...";

        // 1. Guardar en Supabase
        const { error } = await _supabase.from("contactos").insert([formData]);

        if (error) throw error;

        // 2. Armar mensaje de WhatsApp
        const text = `Hola! Soy ${formData.nombre}. Me interesa un servicio. %0A%0AMensaje: ${formData.mensaje}%0A%0AEmail: ${formData.email}%0ATel: ${formData.telefono}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

        // 3. Éxito
        alert("¡Mensaje enviado y guardado correctamente!");
        contactForm.reset();

        // 4. Abrir WhatsApp
        window.open(waUrl, "_blank");
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Hubo un error al enviar el mensaje. Por favor intenta de nuevo.",
        );
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = originalBtnText;
      }
    });
  }
});
