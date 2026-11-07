# 🐾 Pet Place — Modern Interactive Pet Care & E-Commerce Web Application

> **"We love pets like you do — Elevating pet care with modern design, interactive functionality, and seamless digital experiences."**

Pet Place is a full-featured, modern, and responsive pet care and e-commerce web application crafted with **HTML5, CSS3, and modern Vanilla JavaScript (ES6+)**. The application provides an engaging, professional, and accessible digital platform for pet parents, veterinary clinics, pet salons, and e-commerce pet supply stores.

---

## 🌐 Live Preview

🔗 **GitHub Pages Demo:**  
https://upeka200163.github.io/Pet-Place/

---

## 🚀 Key Features & Functionality

### 🌗 Dark / Light Mode Theme Engine
* Instant theme switching with smooth transitions
* Automatic user preference persistence via `localStorage`
* Full CSS variable architecture supporting high-contrast accessible palettes

### 🛍️ Complete E-Commerce Store Experience
* **Slide-out Shopping Cart Drawer**:
  * Real-time item thumbnail, title, and price calculation
  * In-cart quantity adjustment (`+` / `-`) and item removal
  * Free shipping logic (automatic free shipping on orders over $50)
  * Promo discount code engine (`PET10` for 10% off, `FREESHIP` for free express shipping)
* **Real-Time Product Search & Category Filters**:
  * Instant search filtering by title and description
  * Category tabs: *All Products, Food & Treats, Accessories, Health & Care, Toys & Play*
* **Product Quick View Modal**:
  * Detailed modal preview with ratings, stock status, and direct "Add to Cart" action
* **Interactive Wishlist**:
  * Heart icon toggle with saved favorites tracking

### 📅 Multi-Step Veterinary Appointment Wizard
* Intuitive 4-step interactive booking modal:
  1. **Select Service**: Routine Wellness, Emergency Care, Vaccination, Dental Scaling, Nutrition, Grooming
  2. **Pet Information**: Pet Name, Species (Dog, Cat, Bird, Rabbit), Age, Reason/Symptoms
  3. **Doctor & Slot Selection**: Doctor choice, date picker, and interactive time chips
  4. **Confirmation & Receipt**: Owner contact details, booking summary, and instant generated booking reference code (e.g. `PET-2026-8941`)

### 🐾 Smart Pet Health & Calorie Calculator
* Scientific veterinary formula calculating:
  * **Daily Caloric Intake (kcal/day)** based on Resting Energy Requirement (RER)
  * **Human Age Equivalent**
  * **Recommended Daily Water Intake (ml)**
  * Tailored dietary advice for canine and feline companions

### 💬 Interactive Client Testimonials & FAQ Accordion
* Swiper.js slider with responsive breakpoints, touch swipe, and auto-play
* Expandable, animated FAQ accordion addressing clinic procedures and policies

### 🔔 Floating Toast Notification System
* Dynamic, non-intrusive notification toasts for actions (item added to cart, promo code applied, appointment confirmed, theme switched)

### 🚨 24/7 Emergency Care Bar & Floating Quick Call
* Top emergency announcement bar with dismiss persistence
* Floating Action Button (FAB) for instant phone dialer and back-to-top smooth scrolling

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessible forms, and modal dialogs |
| **CSS3** | Glassmorphism, CSS variables, dark theme, fluid flex/grid layouts |
| **JavaScript (ES6+)** | State management (Cart, Wishlist, Theme, Wizard, Calculator, Toasts) |
| **Remix Icons** | Modern, lightweight vector icon library |
| **Swiper.js** | Touch-friendly testimonial carousel |
| **ScrollReveal.js** | Scroll-triggered entrance animations |

---

## 📂 Project Structure

```text
Pet-Place/
│
├── assets/                  # High-resolution graphics, photos & icons
│   ├── about-1.jpg ...
│   ├── product-1.jpg ...
│   ├── client-1.jpg ...
│   └── service-1.png ...
│
├── index.html               # Main semantic single-page web app
├── styles.css               # Design system, CSS variables & theme styling
├── main.js                  # Core application logic & interactive features
└── README.md                # Documentation & feature roadmap
```

---

## ⚙️ Getting Started

### Prerequisites
* Any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Brave)

### Run Locally
Simply double-click or open `index.html` in your browser:
```bash
# Or launch a local development server using Python:
python -m http.server 8000

# Or using Node:
npx serve .
```
Then visit `http://localhost:8000` in your web browser.

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
