import { TastyAPI } from './tasty-api';
import { onRenderMarkup, clearRecipeCardsContent } from './dishes_list';

const tastyApi = new TastyAPI();

const categoriesContainer = document.querySelector('.categories-container');
const categoryList = categoriesContainer.querySelector('.category-list');
const allCategoryButton = document.querySelector('.all-category-button');

let sort = '';
let loadPage = 1;
let pictures = [];

async function fetchAndRenderCategories() {
  try {
    const categories = await tastyApi.getCategories();
    renderCategoriesMarkup(categories);
  } catch (error) {
    console.log(error);
  }
}

getCategoriesFilters();

function renderCategoriesMarkup(categories) {
  // allCategoryButton.addEventListener('click', () => {
  //   categoryList.querySelectorAll('.category-btn').forEach(button => button.classList.remove('active'));
  //   allCategoryButton.classList.add('active');
  //   sort = '';
  //   loadPage = 1;
  //   pictures = [];
  //   clearRecipeCardsContent();
  //   renderOnClickCategory(sort, loadPage);
  // });

  // categoryList.innerHTML = '';
  // renderOnClickCategory(sort, loadPage);

  categories.forEach(category => {
    const categoryButton = document.createElement('button');
    categoryButton.classList.add('category-btn');
    categoryButton.textContent = category.name;

    // categoryButton.addEventListener('click', () => {
    //   categoryList.querySelectorAll('.category-btn').forEach(button => button.classList.remove('active'));
    //   categoryButton.classList.add('active');
    //   sort = category.name;
    //   loadPage = 1;
    //   pictures = [];
    //   clearRecipeCardsContent();
    //   renderOnClickCategory(sort, loadPage);
    // });

    const catItem = document.createElement('li');
    catItem.classList.add('cat-items');
    catItem.appendChild(categoryButton);
    categoryList.appendChild(catItem);
  });
}

fetchAndRenderCategories();

function getCategoriesFilters() {
  tastyApi.getRecipeByFilter().then(data => onRenderMarkup(data))
}



const refs = {
  categoryContainer: document.querySelector('.category-container'),
  allCategoryButton: document.querySelector('.all-category-button')
};

refs.categoryContainer.addEventListener('click', onBtnCLick);

let lastClickedBtn = null;

function onBtnCLick(event) {
  const Btn = event.target;
  tastyApi.category = '';
  clearRecipeCardsContent();

  if (Btn.nodeName !== 'BUTTON') {
    return;
  }

  if (Btn.textContent === 'All categories') {
    getCategoriesFilters();
  }
  tastyApi.category = Btn.textContent;

  getCategoriesFilters();

  if (lastClickedBtn) {
    lastClickedBtn.classList.remove('active');
  }

  if (Btn === refs.allCategoryButton) {
    removeActiveClassFromAllButtons();
  } else {
    refs.allCategoryButton.classList.remove('active');
  }

  Btn.classList.add('active');
  lastClickedBtn = Btn;
}

function removeActiveClassFromAllButtons() {
  const buttons = categoryList.querySelectorAll('button');

  buttons.forEach(button => {
    button.classList.remove('active');
  });
}

categoryList.addEventListener('click', event => {
  if (!event.target.classList.contains('category-btn')) {
    event.stopPropagation();
  }
});
