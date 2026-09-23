const form = document.querySelector<HTMLFormElement>("[data-booking-form]");
const result = document.querySelector<HTMLElement>("[data-booking-result]");

if (form && result) {
  const dateInput = form.elements.namedItem("date") as HTMLInputElement;
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
  dateInput.min = localDate;
  dateInput.addEventListener("change", () => {
    const selected = new Date(`${dateInput.value}T12:00:00`);
    dateInput.setCustomValidity(selected.getDay() === 1 ? "Il lunedì il locale dimostrativo è chiuso." : "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = new Date(`${dateInput.value}T12:00:00`);
    dateInput.setCustomValidity(selected.getDay() === 1 ? "Il lunedì il locale dimostrativo è chiuso." : "");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const date = String(data.get("date"));
    const readableDate = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`));
    result.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = "Riepilogo dimostrativo";
    const summary = document.createElement("p");
    summary.textContent = `${String(data.get("guests"))} · ${readableDate} · ore ${String(data.get("time"))}.`;
    const note = document.createElement("p");
    note.textContent = "Noctis è immaginario: non è stata effettuata alcuna prenotazione.";
    result.append(heading, summary, note);
    result.hidden = false;
    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "nearest" });
  });
}
