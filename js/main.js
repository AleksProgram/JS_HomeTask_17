import { products } from "./config.js";

const userNameField = document.querySelector("#nameInput");
const userCategoryField = document.querySelector("#categoryInput");
const buttonAdd = document.querySelector("#addButton");
const buttonList = document.querySelector("#listButton");
const fridgeLitValue = document.querySelector("#productList");

const errorModal = document.querySelector("#errorModal");
const errorMessage = document.querySelector("#errorMessage");
const closeModalBtn = document.querySelector("#closeModalBtn");

closeModalBtn.addEventListener("click", () => {
  // отслеживает клик по кнопке и закрывает модальное окно;
  errorModal.close();
});

function renderList(products, fridgeLitValue) {
  fridgeLitValue.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    //выводим на страницу
    const newLi = document.createElement("li");
    if (products[i].bought) {
      newLi.textContent = `${products[i].name} ✓`;
    } else {
      newLi.textContent = products[i].name;
    }
    fridgeLitValue.append(newLi);
  }
}

function newProductObject(nameProduct, category) {
  const isDuplicate = products.some(
    (product) => product.name.toLowerCase() === nameProduct.toLowerCase(),
  );

  if (isDuplicate) {
    userNameField.value = "";
    userCategoryField.value = "";
    userNameField.focus();
    throw new Error("The product already exist!");
  }
  const newProduct = {
    id: products.length + 1,
    name: nameProduct,
    category: category,
    bought: false,
  };
  products.push(newProduct);
  userNameField.value = "";
  userCategoryField.value = "";
  userNameField.focus();
}

buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    if (!userNameField.value || !userNameField.value.trim()) {
      throw new Error("The name of the product is required!");
    }

    newProductObject(
      userNameField.value.trim(),
      userCategoryField.value.trim(),
    );
    fridgeLitValue.innerHTML = ""; //очищаем список
    userNameField.focus(); //снова делаем активным поле ввода, чтобы пользователь не нажимал повторно
  } catch (error) {
    // В случае ЛЮБОЙ ошибки
    errorMessage.textContent = error.message;
    errorModal.showModal(); // Показываем модалку
  }
});

buttonList.addEventListener("click", (e) => {
  e.preventDefault();
  fridgeLitValue.innerHTML = ""; //очищаем список
  try {
    renderList(products, fridgeLitValue);

    userNameField.focus(); //снова делаем активным поле ввода, чтобы пользователь не нажимал повторно
  } catch (error) {
    // В случае ЛЮБОЙ ошибки
    errorMessage.textContent = error.message;
    errorModal.showModal(); // Показываем модалку
  }
});

fridgeLitValue.addEventListener("click", (e) => {
  //#1 пЕРВЫЙ СПОСОБ: добавление/удаление галочки около названия продукта
  if (e.target.tagName === "LI") {
    const cleanName = e.target.textContent.replace("✓", "").trim();
    const product = products.find(
      (item) => item.name.toLowerCase() === cleanName.toLowerCase(),
    );

    if (product) {
      // Переключаем статус в объекте на противоположный
      product.bought = !product.bought;

      // Обновляем текст на странице
      if (product.bought) {
        e.target.textContent = `${product.name} ✓`;
      } else {
        e.target.textContent = product.name;
      }
    }
  }
});