const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ---------- Render Task List ----------
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button onclick="deleteTask(${i})">Delete</button>`;
    taskList.appendChild(li);
  });
}

function addTask() {
  if (taskInput.value.trim()) {
    tasks.push(taskInput.value.trim());
    taskInput.value = '';
    saveTasks();
  }
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

addTaskButton.addEventListener('click', addTask);
renderTasks();

// ---------- Product List ----------
const products = [
  { name: "Smartphone", category: "electronics", img: "https://media.istockphoto.com/id/1307266595/photo/iphone-12-green-against-white-background-new-smartphone-from-apple-company-close-up.jpg?s=612x612&w=0&k=20&c=dRO0vPGMbCgSULr7ovzH4zgOv2GegV9V27g5TVMeWyY=" },
  { name: "Laptop", category: "electronics", img: "https://c1.wallpaperflare.com/preview/295/265/88/computer-imac-macbook-laptop.jpg" },
  { name: "T-Shirt", category: "clothing", img: "https://urturms.com/cdn/shop/files/02_4395d9f8-c97b-461f-b029-c648fcb4e4b4.jpg?v=1732873911" },
  { name: "Jeans", category: "clothing", img: "https://i.pinimg.com/564x/48/6a/5d/486a5d7e5bcd6694dfb38e084791978e.jpg" },
  { name: "Book", category: "books", img: "https://t3.ftcdn.net/jpg/06/13/47/20/360_F_613472072_YSkmDRTLl6twoSpkjXSYkCFE7kNCzet0.jpg" },
  { name: "Chair", category: "furniture", img: "https://m.media-amazon.com/images/I/61ukLYvoaRL._AC_UF894,1000_QL80_.jpg" },
  { name: "Teddy Bear", category: "toys", img: "https://t3.ftcdn.net/jpg/14/20/45/10/360_F_1420451096_9xjqtnygxfs7PgpsycAHBfZpDzxCW6rm.jpg" },
  { name: "Lipstick", category: "beauty", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTVaSjAtthff62FEOr3cSZzFh4RxQriRX5A&s" },
  { name: "Football", category: "sports", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSigco47GXwiuAKbFOb0ZFMtVktfCgf2CFuDw&s" },
  { name: "Notebook", category: "books", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDO_9ctANQ_v7WucoYnQr1Qixj-sY8kPbGeA&s" }
];

function filterProducts() {
  const checked = Array.from(document.querySelectorAll('.filters input:checked')).map(c => c.value);
  const search = document.getElementById("search").value.toLowerCase();
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';

  const visible = products.filter(p => {
    const matchCategory = checked.length === 0 || checked.includes(p.category);
    const matchSearch = p.name.toLowerCase().includes(search);
    return matchCategory && matchSearch;
  });

  visible.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div class="product-name">${product.name}</div>
    `;
    productList.appendChild(div);
  });
}

document.querySelectorAll('.filters input').forEach(input => input.addEventListener('change', filterProducts));
document.getElementById("search").addEventListener('input', filterProducts);
filterProducts();

// ---------- Nav Link Activation ----------
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove("active"));
      document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.add("active");
    }
  });
});

// ---------- GSAP Section Animation ----------
document.querySelectorAll("section").forEach((section, i) => {
  gsap.from(section, {
    opacity: 0,
    y: 30,
    delay: i * 0.2,
    duration: 1,
    ease: "power2.out"
  });
});
