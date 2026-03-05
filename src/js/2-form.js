/ 1. Оголошення об'єкта стану форми
const formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

// 3. Перевірка сховища при завантаженні сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  const parsedData = JSON.parse(savedData);
  
  // Оновлюємо і об'єкт formData, і поля форми
  Object.assign(formData, parsedData);
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// 2. Відстеження змін (Делегування на події input)
form.addEventListener("input", (event) => {
  const { name, value } = event.target;
  
  // Оновлюємо дані в об'єкті
  formData[name] = value.trim();
  
  // Записуємо в локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 4. Обробка відправлення форми
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Перевірка на заповненість усіх полів
  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return;
  }

  // Вивід у консоль, очищення сховища та форми
  console.log("Submitted Data:", formData);
  
  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
});