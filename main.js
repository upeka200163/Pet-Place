/**
 * Pet Place — Modern Interactive Frontend Application Script
 * Features: Dark/Light Mode, Slide-out Shopping Cart, Checkout Modal,
 * Multi-Step Vet Appointment Wizard, Product Search & Category Filtering,
 * Pet Health & Calorie Calculator, FAQ Accordion, Wishlist, Toast Notifications
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. Toast Notification Engine
  // =========================================================================
  const toastContainer = document.getElementById("toast-container");

  function showToast(title, message, type = "info") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconClass = "ri-information-line";
    if (type === "success") iconClass = "ri-checkbox-circle-fill";
    if (type === "error") iconClass = "ri-error-warning-fill";

    toast.innerHTML = `
      <i class="toast-icon ${iconClass}"></i>
      <div class="toast__content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // Auto dismiss after 3.5s
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 400);
    }, 3500);
  }

  // =========================================================================
  // 2. Dark / Light Theme Toggle & Persistence
  // =========================================================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;
  const landingThemeToggleBtn = document.getElementById("landing-theme-toggle");
  const landingThemeIcon = landingThemeToggleBtn ? landingThemeToggleBtn.querySelector("i") : null;
  const drawerThemeToggleBtn = document.getElementById("drawer-theme-toggle");
  const drawerThemeIcon = drawerThemeToggleBtn ? drawerThemeToggleBtn.querySelector("i") : null;
  const savedTheme = localStorage.getItem("pet_place_theme");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      if (themeIcon) {
        themeIcon.classList.remove("ri-moon-line");
        themeIcon.classList.add("ri-sun-line");
      }
      if (landingThemeIcon) {
        landingThemeIcon.classList.remove("ri-moon-line");
        landingThemeIcon.classList.add("ri-sun-line");
      }
      if (drawerThemeIcon) {
        drawerThemeIcon.classList.remove("ri-moon-line");
        drawerThemeIcon.classList.add("ri-sun-line");
      }
    } else {
      document.body.classList.remove("dark-theme");
      if (themeIcon) {
        themeIcon.classList.remove("ri-sun-line");
        themeIcon.classList.add("ri-moon-line");
      }
      if (landingThemeIcon) {
        landingThemeIcon.classList.remove("ri-sun-line");
        landingThemeIcon.classList.add("ri-moon-line");
      }
      if (drawerThemeIcon) {
        drawerThemeIcon.classList.remove("ri-sun-line");
        drawerThemeIcon.classList.add("ri-moon-line");
      }
    }
  }

  if (savedTheme) {
    applyTheme(savedTheme);
  }

  function handleThemeToggle() {
    const isDark = document.body.classList.contains("dark-theme");
    const nextTheme = isDark ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("pet_place_theme", nextTheme);
    showToast("Theme Updated", `Switched to ${nextTheme} mode`, "info");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", handleThemeToggle);
  }
  if (landingThemeToggleBtn) {
    landingThemeToggleBtn.addEventListener("click", handleThemeToggle);
  }
  if (drawerThemeToggleBtn) {
    drawerThemeToggleBtn.addEventListener("click", handleThemeToggle);
  }

  // =========================================================================
  // 3. Top Announcement Bar
  // =========================================================================
  const announcementBar = document.getElementById("announcement-bar");
  const closeAnnouncementBtn = document.getElementById("close-announcement");
  const copyPromoTopBtn = document.getElementById("copy-promo-top");

  if (copyPromoTopBtn) {
    copyPromoTopBtn.addEventListener("click", () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText("PET10").then(() => {
          showToast("Coupon Copied! 🎉", "Promo code PET10 copied to clipboard. Enjoy 10% off!", "success");
        }).catch(() => {
          showToast("Coupon Code", "Use promo code PET10 at checkout for 10% off!", "info");
        });
      } else {
        showToast("Coupon Code", "Use promo code PET10 at checkout for 10% off!", "info");
      }
    });
  }

  if (closeAnnouncementBtn && announcementBar) {
    if (sessionStorage.getItem("announcement_closed") === "true") {
      announcementBar.style.display = "none";
    }

    closeAnnouncementBtn.addEventListener("click", () => {
      announcementBar.style.opacity = "0";
      announcementBar.style.transform = "translateY(-100%)";
      setTimeout(() => {
        announcementBar.style.display = "none";
        sessionStorage.setItem("announcement_closed", "true");
      }, 300);
    });
  }

  // =========================================================================
  // 4. Navigation, Mobile Menu & Active ScrollSpy
  // =========================================================================
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav__links a");
  const sections = document.querySelectorAll("header[id], section[id], footer[id]");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Sticky navbar shadow and ScrollSpy
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // ScrollSpy active link
    const scrollPos = window.scrollY + 200;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });

    // Back to top visibility
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =========================================================================
  // Multi-Currency Exchange Engine & Helper
  // =========================================================================
  const CURRENCY_CONFIG = {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)", decimals: 2 },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)", decimals: 2 },
    GBP: { symbol: "£", rate: 0.78, label: "GBP (£)", decimals: 2 },
    LKR: { symbol: "Rs. ", rate: 305.0, label: "LKR (Rs.)", decimals: 0 },
    AUD: { symbol: "A$", rate: 1.52, label: "AUD (A$)", decimals: 2 },
  };

  let currentCurrency = localStorage.getItem("pet_place_currency") || "USD";

  function formatPrice(amountInUSD, showCode = false) {
    const cfg = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG.USD;
    const val = parseFloat(amountInUSD) || 0;
    const converted = val * cfg.rate;
    const formatted = cfg.decimals === 0
      ? Math.round(converted).toLocaleString()
      : converted.toFixed(cfg.decimals);
    return `${cfg.symbol}${formatted}${showCode ? " " + currentCurrency : ""}`;
  }

  function updateAllPricesOnPage() {
    document.querySelectorAll("[data-base-price]").forEach((el) => {
      const basePrice = parseFloat(el.getAttribute("data-base-price"));
      if (isNaN(basePrice)) return;
      const isCurrentPrice = el.classList.contains("current-price");
      const isServicePrice = el.classList.contains("service__price");
      const suffix = el.getAttribute("data-suffix") || "";
      if (isServicePrice) {
        el.textContent = `From ${formatPrice(basePrice)}${suffix}`;
      } else if (isCurrentPrice) {
        el.textContent = formatPrice(basePrice, true);
      } else {
        el.textContent = formatPrice(basePrice);
      }
    });
    updateCartUI();
  }

  // Currency select dropdown listener
  const currencySelect = document.getElementById("currency-select");
  if (currencySelect) {
    currencySelect.value = currentCurrency;
    currencySelect.addEventListener("change", (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem("pet_place_currency", currentCurrency);
      updateAllPricesOnPage();
      const cfg = CURRENCY_CONFIG[currentCurrency];
      showToast(
        "Currency Updated",
        `Store converted to ${cfg.label}`,
        "info"
      );
    });
  }

  // =========================================================================
  // 5. Shopping Cart & Wishlist System
  // =========================================================================
  let cart = JSON.parse(localStorage.getItem("pet_place_cart")) || [
    {
      id: "prod-2",
      name: "Ergonomic Comfort Harness",
      price: 49.0,
      img: "assets/product-2.jpg",
      quantity: 1,
    },
  ];

  let wishlist = JSON.parse(localStorage.getItem("pet_place_wishlist")) || [];
  let appliedDiscountRate = 0; // 0.1 for 10%

  const cartOverlay = document.getElementById("cart-overlay");
  const cartBtn = document.getElementById("cart-btn");
  const cartClose = document.getElementById("cart-close");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartCountBadge = document.getElementById("cart-count");
  const wishlistCountBadge = document.getElementById("wishlist-count");

  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartDiscountEl = document.getElementById("cart-discount");
  const discountRow = document.getElementById("discount-row");
  const cartShippingEl = document.getElementById("cart-shipping");
  const cartTotalEl = document.getElementById("cart-total");

  function saveCart() {
    localStorage.setItem("pet_place_cart", JSON.stringify(cart));
    updateCartUI();
  }

  function saveWishlist() {
    localStorage.setItem("pet_place_wishlist", JSON.stringify(wishlist));
    updateWishlistUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalItems;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart__empty">
          <i class="ri-shopping-bag-line"></i>
          <h4>Your cart is empty</h4>
          <p>Explore our store to find healthy nutrition, toys, and gear for your pet!</p>
          <a href="#store" class="btn__primary" id="btn-shop-now" style="display: inline-flex;">
            Browse Store
          </a>
        </div>
      `;
      const shopNowBtn = document.getElementById("btn-shop-now");
      if (shopNowBtn) {
        shopNowBtn.addEventListener("click", () => {
          if (cartOverlay) cartOverlay.classList.remove("open");
        });
      }
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(0);
      if (cartTotalEl) cartTotalEl.textContent = formatPrice(0);
      if (cartShippingEl) cartShippingEl.textContent = formatPrice(0);
      if (discountRow) discountRow.style.display = "none";
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = cart
      .map((item) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}" />
          <div class="cart-item__info">
            <h4>${item.name}</h4>
            <div class="price">${formatPrice(item.price, true)}</div>
            <div class="cart-item__qty">
              <button class="qty-btn btn-qty-minus" data-id="${item.id}">-</button>
              <span style="font-size: 0.9rem; font-weight: 600; padding: 0 4px;">${item.quantity}</span>
              <button class="qty-btn btn-qty-plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="cart-item__remove" data-id="${item.id}" title="Remove item">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      `;
      })
      .join("");

    // Calculate totals
    const discountAmount = subtotal * appliedDiscountRate;
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
    const finalTotal = subtotal - discountAmount + shipping;

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
    if (cartDiscountEl) cartDiscountEl.textContent = `-${formatPrice(discountAmount)}`;
    if (discountRow) {
      discountRow.style.display = appliedDiscountRate > 0 ? "flex" : "none";
    }
    if (cartShippingEl) {
      cartShippingEl.textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
    }
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(finalTotal);
  }

  function updateWishlistUI() {
    if (wishlistCountBadge) {
      wishlistCountBadge.textContent = wishlist.length;
    }

    // Update heart icons on cards
    document.querySelectorAll(".product__wishlist-btn").forEach((btn) => {
      const pid = btn.getAttribute("data-id");
      if (wishlist.includes(pid)) {
        btn.classList.add("active");
        const icon = btn.querySelector("i");
        if (icon) icon.className = "ri-heart-fill";
      } else {
        btn.classList.remove("active");
        const icon = btn.querySelector("i");
        if (icon) icon.className = "ri-heart-line";
      }
    });
  }

  function addToCart(id, name, price, img) {
    const existingIndex = cart.findIndex((item) => item.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price: parseFloat(price),
        img,
        quantity: 1,
      });
    }
    saveCart();
    showToast("Added to Cart!", `${name} is in your shopping cart.`, "success");
  }

  // Cart item qty controls and removals
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
      const minusBtn = e.target.closest(".btn-qty-minus");
      const plusBtn = e.target.closest(".btn-qty-plus");
      const removeBtn = e.target.closest(".cart-item__remove");

      if (minusBtn) {
        const id = minusBtn.getAttribute("data-id");
        const item = cart.find((i) => i.id === id);
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            cart = cart.filter((i) => i.id !== id);
          }
          saveCart();
        }
      }

      if (plusBtn) {
        const id = plusBtn.getAttribute("data-id");
        const item = cart.find((i) => i.id === id);
        if (item) {
          item.quantity += 1;
          saveCart();
        }
      }

      if (removeBtn) {
        const id = removeBtn.getAttribute("data-id");
        const item = cart.find((i) => i.id === id);
        cart = cart.filter((i) => i.id !== id);
        saveCart();
        showToast("Removed", `${item ? item.name : "Item"} removed from cart.`, "info");
      }
    });
  }

  // Open & Close Cart Drawer
  if (cartBtn && cartOverlay) {
    cartBtn.addEventListener("click", () => {
      cartOverlay.classList.add("open");
    });
  }

  if (cartClose && cartOverlay) {
    cartClose.addEventListener("click", () => {
      cartOverlay.classList.remove("open");
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove("open");
      }
    });
  }

  // Promo code
  const promoInput = document.getElementById("promo-input");
  const applyPromoBtn = document.getElementById("apply-promo-btn");

  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener("click", () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === "PET10") {
        appliedDiscountRate = 0.1;
        updateCartUI();
        showToast("Promo Applied!", "10% discount has been applied to your order.", "success");
      } else if (code === "FREESHIP") {
        appliedDiscountRate = 0;
        updateCartUI();
        showToast("Free Shipping Applied!", "Free express delivery granted.", "success");
      } else {
        showToast("Invalid Promo Code", "Please enter a valid coupon like PET10", "error");
      }
    });
  }

  // Global Add to Cart & Wishlist event delegation on cards
  document.addEventListener("click", (e) => {
    const addCartBtn = e.target.closest(".btn-add-cart");
    const wishlistBtn = e.target.closest(".product__wishlist-btn");

    if (addCartBtn) {
      const id = addCartBtn.getAttribute("data-id");
      const name = addCartBtn.getAttribute("data-name");
      const price = addCartBtn.getAttribute("data-price");
      const img = addCartBtn.getAttribute("data-img");
      addToCart(id, name, price, img);
    }

    if (wishlistBtn) {
      const id = wishlistBtn.getAttribute("data-id");
      if (wishlist.includes(id)) {
        wishlist = wishlist.filter((item) => item !== id);
        showToast("Wishlist", "Item removed from your favorites.", "info");
      } else {
        wishlist.push(id);
        showToast("Saved!", "Added item to your favorites.", "success");
      }
      saveWishlist();
    }
  });

  // Initial cart & wishlist render
  updateCartUI();
  updateWishlistUI();

  // Wishlist Navbar Button click
  const navWishlistBtn = document.getElementById("wishlist-btn");
  if (navWishlistBtn) {
    navWishlistBtn.addEventListener("click", () => {
      showToast(
        "Wishlist Items",
        `You have ${wishlist.length} item(s) saved in your favorites.`,
        "info"
      );
      const storeSection = document.getElementById("store");
      if (storeSection) {
        storeSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // =========================================================================
  // 6. Product Store Filtering & Real-time Search
  // =========================================================================
  const productSearch = document.getElementById("product-search");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product__card");

  let activeCategory = "all";
  let searchQuery = "";

  function filterProducts() {
    productCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      const title = card.querySelector("h4").textContent.toLowerCase();
      const desc = card.querySelector("p").textContent.toLowerCase();

      const matchesCategory =
        activeCategory === "all" || cardCategory === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        title.includes(searchQuery) ||
        desc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      filterProducts();
    });
  });

  if (productSearch) {
    productSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProducts();
    });
  }

  // =========================================================================
  // 7. Product Quick View Modal
  // =========================================================================
  const quickViewModal = document.getElementById("quickview-modal");
  const closeQuickViewBtn = document.getElementById("close-quickview-modal");
  const qvImg = document.getElementById("qv-img");
  const qvTitle = document.getElementById("qv-title");
  const qvPrice = document.getElementById("qv-price");
  const qvDesc = document.getElementById("qv-desc");
  const qvBadge = document.getElementById("qv-badge");
  const qvAddCartBtn = document.getElementById("qv-add-cart-btn");
  const qvWishlistBtn = document.getElementById("qv-wishlist-btn");

  let activeQvData = null;

  document.addEventListener("click", (e) => {
    const qvTrigger = e.target.closest(".product__quick-view");
    if (qvTrigger) {
      const card = qvTrigger.closest(".product__card");
      if (!card) return;

      const id = card.getAttribute("data-id");
      const title = card.querySelector("h4").textContent;
      const desc = card.querySelector("p").textContent;
      const priceText = card.querySelector(".current-price").textContent;
      const priceVal = card.querySelector(".btn-add-cart").getAttribute("data-price");
      const img = card.querySelector(".product__img-box img").getAttribute("src");
      const badge = card.querySelector(".product__badge");

      activeQvData = { id, title, desc, priceVal, img };

      if (qvImg) qvImg.src = img;
      if (qvTitle) qvTitle.textContent = title;
      if (qvPrice) qvPrice.textContent = priceText;
      if (qvDesc) qvDesc.textContent = desc;
      if (qvBadge) {
        qvBadge.textContent = badge ? badge.textContent : "Featured";
      }

      if (quickViewModal) quickViewModal.classList.add("open");
    }
  });

  if (qvAddCartBtn) {
    qvAddCartBtn.addEventListener("click", () => {
      if (activeQvData) {
        addToCart(
          activeQvData.id,
          activeQvData.title,
          activeQvData.priceVal,
          activeQvData.img
        );
        if (quickViewModal) quickViewModal.classList.remove("open");
      }
    });
  }

  if (qvWishlistBtn) {
    qvWishlistBtn.addEventListener("click", () => {
      if (activeQvData) {
        const id = activeQvData.id;
        if (wishlist.includes(id)) {
          wishlist = wishlist.filter((item) => item !== id);
          showToast("Wishlist", "Removed from favorites.", "info");
        } else {
          wishlist.push(id);
          showToast("Saved!", "Added to your favorites.", "success");
        }
        saveWishlist();
      }
    });
  }

  if (closeQuickViewBtn && quickViewModal) {
    closeQuickViewBtn.addEventListener("click", () => {
      quickViewModal.classList.remove("open");
    });
    quickViewModal.addEventListener("click", (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove("open");
      }
    });
  }

  // =========================================================================
  // 8. Interactive Vet Appointment Booking Wizard Modal
  // =========================================================================
  const bookingModal = document.getElementById("booking-modal");
  const closeBookingModalBtn = document.getElementById("close-booking-modal");
  const openBookingBtns = document.querySelectorAll(".open-booking-btn");
  const bookServiceBtns = document.querySelectorAll(".btn-book-service");

  let currentWizardStep = 1;
  let bookingData = {
    service: "Routine Wellness Exam",
    petName: "",
    petSpecies: "Dog",
    petAge: "",
    notes: "",
    vet: "Dr. Sarah Wilson (Lead Surgeon)",
    date: "",
    time: "09:00 AM",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  };

  function updateWizardUI() {
    // Update step numbers
    document.querySelectorAll(".wizard__step-item").forEach((item) => {
      const step = parseInt(item.getAttribute("data-step"));
      item.classList.remove("active", "completed");
      if (step === currentWizardStep) {
        item.classList.add("active");
      } else if (step < currentWizardStep) {
        item.classList.add("completed");
      }
    });

    // Update panels
    document.querySelectorAll(".wizard-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    const activePanel = document.getElementById(`wizard-panel-${currentWizardStep}`);
    if (activePanel) activePanel.classList.add("active");

    // If step 4, update summary
    if (currentWizardStep === 4) {
      const summaryService = document.getElementById("summary-service");
      const summaryPet = document.getElementById("summary-pet");
      const summaryDatetime = document.getElementById("summary-datetime");
      const summaryDoctor = document.getElementById("summary-doctor");

      if (summaryService) summaryService.textContent = bookingData.service;
      if (summaryPet) {
        summaryPet.textContent = `${bookingData.petName || "Your pet"} (${bookingData.petSpecies})`;
      }
      if (summaryDatetime) {
        summaryDatetime.textContent = `${bookingData.date || "Tomorrow"} at ${bookingData.time}`;
      }
      if (summaryDoctor) summaryDoctor.textContent = bookingData.vet;
    }
  }

  function openBookingModal(preselectedService, prefilledNotes = "", prefilledSpecies = "") {
    if (preselectedService) {
      bookingData.service = preselectedService;
      document.querySelectorAll(".service-option-card").forEach((card) => {
        if (
          card.getAttribute("data-value").toLowerCase().includes(preselectedService.toLowerCase()) ||
          preselectedService.toLowerCase().includes(card.getAttribute("data-value").toLowerCase())
        ) {
          card.classList.add("selected");
        } else {
          card.classList.remove("selected");
        }
      });
    }

    if (prefilledNotes) {
      bookingData.notes = prefilledNotes;
      const notesField = document.getElementById("booking-pet-notes");
      if (notesField) notesField.value = prefilledNotes;
    }

    if (prefilledSpecies) {
      bookingData.petSpecies = prefilledSpecies;
      const speciesField = document.getElementById("booking-pet-species");
      if (speciesField) speciesField.value = prefilledSpecies;
    }

    // Set default date to tomorrow
    const bookingDateInput = document.getElementById("booking-date");
    if (bookingDateInput && !bookingDateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      bookingDateInput.value = tomorrow.toISOString().split("T")[0];
      bookingData.date = bookingDateInput.value;
    }

    currentWizardStep = 1;
    updateWizardUI();
    if (bookingModal) bookingModal.classList.add("open");
  }

  openBookingBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  bookServiceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceName = btn.getAttribute("data-service");
      openBookingModal(serviceName);
    });
  });

  if (closeBookingModalBtn && bookingModal) {
    closeBookingModalBtn.addEventListener("click", () => {
      bookingModal.classList.remove("open");
    });
    bookingModal.addEventListener("click", (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove("open");
      }
    });
  }

  // Service option selection
  document.querySelectorAll(".service-option-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".service-option-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      bookingData.service = card.getAttribute("data-value");
    });
  });

  // Time slot selection
  document.querySelectorAll(".slot-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".slot-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      bookingData.time = btn.getAttribute("data-time");
    });
  });

  // Step transitions
  document.querySelectorAll(".btn-next-step").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextStep = parseInt(btn.getAttribute("data-next"));

      // Validation for Step 2
      if (currentWizardStep === 2) {
        const petName = document.getElementById("booking-pet-name").value.trim();
        if (!petName) {
          showToast("Pet Name Required", "Please let us know your pet's name.", "error");
          return;
        }
        bookingData.petName = petName;
        bookingData.petSpecies = document.getElementById("booking-pet-species").value;
        bookingData.petAge = document.getElementById("booking-pet-age").value.trim();
        bookingData.notes = document.getElementById("booking-pet-notes").value.trim();
      }

      // Validation for Step 3
      if (currentWizardStep === 3) {
        const dateVal = document.getElementById("booking-date").value;
        if (!dateVal) {
          showToast("Date Required", "Please choose an appointment date.", "error");
          return;
        }
        bookingData.date = dateVal;
        bookingData.vet = document.getElementById("booking-vet-select").value;
      }

      currentWizardStep = nextStep;
      updateWizardUI();
    });
  });

  document.querySelectorAll(".btn-prev-step").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prevStep = parseInt(btn.getAttribute("data-prev"));
      currentWizardStep = prevStep;
      updateWizardUI();
    });
  });

  // Confirm booking
  const confirmBookingBtn = document.getElementById("confirm-booking-btn");
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", () => {
      const ownerName = document.getElementById("owner-name").value.trim();
      const ownerPhone = document.getElementById("owner-phone").value.trim();
      const ownerEmail = document.getElementById("owner-email").value.trim();

      if (!ownerName || !ownerPhone || !ownerEmail) {
        showToast("Missing Information", "Please fill in your contact information.", "error");
        return;
      }

      bookingData.ownerName = ownerName;
      bookingData.ownerPhone = ownerPhone;
      bookingData.ownerEmail = ownerEmail;

      const randomCode = `PET-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const refCodeEl = document.getElementById("booking-ref-code");
      if (refCodeEl) refCodeEl.textContent = randomCode;

      // Show success panel
      document.querySelectorAll(".wizard-panel").forEach((p) => p.classList.remove("active"));
      const successPanel = document.getElementById("wizard-panel-success");
      if (successPanel) successPanel.classList.add("active");

      showToast("Appointment Booked!", `Reference ${randomCode} generated successfully.`, "success");
    });
  }

  const closeBookingSuccessBtn = document.getElementById("close-booking-success-btn");
  if (closeBookingSuccessBtn && bookingModal) {
    closeBookingSuccessBtn.addEventListener("click", () => {
      bookingModal.classList.remove("open");
    });
  }

  // =========================================================================
  // 9. Interactive Pet Health & Calorie Calculator
  // =========================================================================
  const calcForm = document.getElementById("pet-calc-form");
  const resHumanAge = document.getElementById("res-human-age");
  const resCalories = document.getElementById("res-calories");
  const resWater = document.getElementById("res-water");
  const resStatus = document.getElementById("res-status");
  const resTip = document.getElementById("res-tip");

  if (calcForm) {
    calcForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const species = document.getElementById("pet-type").value;
      const weight = parseFloat(document.getElementById("pet-weight").value) || 10;
      const stage = document.getElementById("pet-age-stage").value;
      const activity = document.getElementById("pet-activity").value;

      // Resting Energy Requirement: RER = 70 * (weight_kg)^0.75
      const rer = 70 * Math.pow(weight, 0.75);

      let factor = 1.6; // default adult dog
      if (species === "cat") {
        factor = stage === "puppy" ? 2.5 : stage === "senior" ? 1.1 : 1.2;
      } else {
        factor = stage === "puppy" ? 2.2 : stage === "senior" ? 1.2 : 1.6;
      }

      if (activity === "low") factor *= 0.85;
      if (activity === "high") factor *= 1.25;

      const dailyCalories = Math.round(rer * factor);
      const waterMl = Math.round(weight * 55);

      // Human Age approximation
      let humanAge = 0;
      if (species === "dog") {
        if (stage === "puppy") humanAge = Math.round(weight < 15 ? 12 : 9);
        else if (stage === "adult") humanAge = Math.round(24 + (weight > 20 ? 5 : 4) * 3);
        else humanAge = Math.round(52 + (weight > 20 ? 6 : 4) * 3);
      } else {
        if (stage === "puppy") humanAge = 12;
        else if (stage === "adult") humanAge = 32;
        else humanAge = 60;
      }

      if (resHumanAge) resHumanAge.textContent = `~${humanAge} yrs`;
      if (resCalories) resCalories.textContent = `~${dailyCalories} kcal`;
      if (resWater) resWater.textContent = `~${waterMl} ml`;
      if (resStatus) {
        resStatus.textContent =
          activity === "low"
            ? "Needs More Exercise"
            : activity === "high"
              ? "Athletic & Energetic"
              : "Optimal & Healthy";
      }

      if (resTip) {
        if (species === "cat") {
          resTip.innerHTML = `💡 <em>Feline Advice: Cats thrive on high-protein wet food to maintain kidney hydration. Target ~${Math.round(
            dailyCalories * 0.5
          )} kcal from moisture-rich wet meals!</em>`;
        } else {
          resTip.innerHTML = `💡 <em>Canine Advice: Split ~${dailyCalories} kcal into two daily meals. Supplement with Omega-3s for shiny coat & healthy joints!</em>`;
        }
      }

      showToast("Health Profile Calculated", `Daily requirement: ~${dailyCalories} kcal`, "success");
    });
  }

  // =========================================================================
  // 10. FAQ Accordion
  // =========================================================================
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item) => {
    const header = item.querySelector(".faq__header");
    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all
        faqItems.forEach((i) => i.classList.remove("active"));

        // If wasn't active, open it
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // =========================================================================
  // 11. Checkout Modal & Order Processing
  // =========================================================================
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutModal = document.getElementById("checkout-modal");
  const closeCheckoutBtn = document.getElementById("close-checkout-modal");
  const checkoutTotalDisplay = document.getElementById("checkout-total-display");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutSuccess = document.getElementById("checkout-success");
  const orderRefCode = document.getElementById("order-ref-code");
  const closeCheckoutSuccessBtn = document.getElementById("close-checkout-success-btn");

  if (checkoutBtn && checkoutModal) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Cart is Empty", "Add some products to your cart before checkout.", "error");
        return;
      }

      // Close cart drawer and open checkout modal
      if (cartOverlay) cartOverlay.classList.remove("open");

      // Update total
      if (checkoutTotalDisplay && cartTotalEl) {
        checkoutTotalDisplay.textContent = cartTotalEl.textContent;
      }

      if (checkoutForm) checkoutForm.style.display = "block";
      if (checkoutSuccess) checkoutSuccess.style.display = "none";

      checkoutModal.classList.add("open");
    });
  }

  if (closeCheckoutBtn && checkoutModal) {
    closeCheckoutBtn.addEventListener("click", () => {
      checkoutModal.classList.remove("open");
    });
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) {
        checkoutModal.classList.remove("open");
      }
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const randomOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
        10 + Math.random() * 90
      )}`;

      if (orderRefCode) orderRefCode.textContent = randomOrderId;

      // Extract form info for live tracker
      const custName = document.getElementById("checkout-name")?.value || "Valued Pet Parent";
      const custPhone = document.getElementById("checkout-phone")?.value || "+94 77 123 4567";
      const custAddress = document.getElementById("checkout-address")?.value || "Colombo, Sri Lanka";

      // Register order into tracking repository
      const newOrderRecord = {
        id: randomOrderId,
        customer: custName,
        phone: custPhone,
        address: custAddress,
        status: 1, // 1: Confirmed, 2: Packed, 3: In Transit, 4: Delivered
        placedTime: "Just now",
        carrier: "PetPlace Express Logistics - Rapid Van #02",
        driver: "Kamal Rathnayake (+94 71 890 1234)",
        eta: "Today within 2-3 hours",
        note: "Order confirmed! Hospital pharmacy is currently preparing your sterile pack.",
        items: cart.length > 0 ? JSON.parse(JSON.stringify(cart)) : [
          { name: "Pet Health Care Item", price: 49.00, quantity: 1 }
        ]
      };
      saveCustomerOrder(newOrderRecord);

      checkoutForm.style.display = "none";
      if (checkoutSuccess) checkoutSuccess.style.display = "block";

      // Empty cart
      cart = [];
      saveCart();

      showToast("Order Placed! 🐾", `Order reference ${randomOrderId} confirmed.`, "success");

      // Bind Track Placed Order button
      const trackPlacedBtn = document.getElementById("track-placed-order-btn");
      if (trackPlacedBtn) {
        trackPlacedBtn.onclick = () => {
          if (checkoutModal) checkoutModal.classList.remove("open");
          openOrderTracker(randomOrderId);
        };
      }
    });
  }

  if (closeCheckoutSuccessBtn && checkoutModal) {
    closeCheckoutSuccessBtn.addEventListener("click", () => {
      checkoutModal.classList.remove("open");
    });
  }

  // =========================================================================
  // 12. Working Newsletter Subscription Form
  // =========================================================================
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterEmail = document.getElementById("newsletter-email");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email) {
        showToast(
          "Subscribed! 🎉",
          "Thank you for joining our VIP Pet Club. Use promo code PET10 for 10% off!",
          "success"
        );
        newsletterEmail.value = "";
      }
    });
  }

  // =========================================================================
  // 13. Swiper Carousel Initialization (Responsive Breakpoints)
  // =========================================================================
  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  // =========================================================================
  // 14. ScrollReveal Animations
  // =========================================================================
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      distance: "40px",
      origin: "bottom",
      duration: 900,
      easing: "ease-out",
      reset: false,
    });

    sr.reveal(".header__content h1", { delay: 100 });
    sr.reveal(".header__content h2", { delay: 200 });
    sr.reveal(".header__content p", { delay: 300 });
    sr.reveal(".header__actions", { delay: 400 });
    sr.reveal(".header__image", { delay: 200, origin: "right" });

    sr.reveal(".stat__box", { interval: 150 });
    sr.reveal(".intro__card", { interval: 200 });
    sr.reveal(".service__card-modern", { interval: 150 });
    sr.reveal(".triage__card", { delay: 150 });
    sr.reveal(".product__card", { interval: 150 });
    sr.reveal(".about__row", { interval: 250 });
    sr.reveal(".instagram__item", { interval: 150 });
    sr.reveal(".footer__cta-card", { delay: 150 });
    sr.reveal(".footer__col", { interval: 120 });
  }

  // =========================================================================
  // 15. Interactive Pet Symptom Checker & Emergency Triage Engine
  // =========================================================================
  const triageDatabase = {
    dog: {
      digestive: [
        {
          id: "d_dig_1",
          title: "Occasional grass eating with 1 mild vomit (active & drinking)",
          level: 3,
          guidance: "Grass eating is often harmless behavior or mild dietary fiber seeking. Provide fresh water and feed a bland meal (boiled lean chicken & white rice in a 2:1 ratio).",
          dos: ["Provide small sips of fresh water", "Rest the stomach for 2-3 hours", "Feed boiled lean chicken and white rice"],
          donts: ["Do not give rich fatty table scraps", "Do not give human anti-nausea meds"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_dig_2",
          title: "Vomited 2-3 times today, loose stool, slightly subdued",
          level: 2,
          guidance: "Multiple bouts of vomiting or diarrhea can cause dehydration and electrolyte imbalance. Requires a veterinary exam within 12-24 hours.",
          dos: ["Keep patient indoors, warm, and comfortable", "Collect a small stool sample in a clean container if possible", "Check gum color (should be healthy pink)"],
          donts: ["Do not force large volumes of water at once", "Do not administer human Imodium or Pepto-Bismol"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_dig_3",
          title: "Bloated, hard swollen abdomen + unsuccessful retching/gagging",
          level: 1,
          guidance: "CRITICAL MEDICAL EMERGENCY (Potential Gastric Dilatation-Volvulus / Bloat). The stomach may be twisting. Requires immediate surgical triage within minutes.",
          dos: ["Transport to our 24/7 ER hospital immediately", "Keep the dog flat and calm during transit", "Call our ER hotline while en route so surgeons prepare"],
          donts: ["Do NOT press or massage the stomach", "Do NOT offer any food or water"],
          suggestedService: "Emergency Trauma Care"
        },
        {
          id: "d_dig_4",
          title: "Swallowed foreign object (toy, bone, sock, needle, stone)",
          level: 1,
          guidance: "High risk of intestinal blockage or gastrointestinal perforation. Rapid ultrasound and endoscopic/surgical evaluation is vital.",
          dos: ["Bring any remaining packaging or remnants of the swallowed item", "Note the exact time ingestion occurred"],
          donts: ["Do NOT induce vomiting without specific vet instruction", "Do NOT pull strings protruding from mouth or anus"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      breathing: [
        {
          id: "d_br_1",
          title: "Occasional reverse sneezing or excitement snorting",
          level: 3,
          guidance: "Reverse sneezing is usually harmless pharyngeal spasms. Gently massage the dog's throat or briefly cover nostrils to encourage swallowing.",
          dos: ["Calm the dog with gentle strokes", "Keep environment free from aerosol sprays or smoke"],
          donts: ["Do not panic", "Do not squeeze the neck"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_br_2",
          title: "Persistent 'honking' dry cough or wheezing for 2+ days",
          level: 2,
          guidance: "May indicate Kennel Cough (Bordetella), tracheitis, or early cardiac issues. A veterinarian should auscultate the lungs and heart.",
          dos: ["Switch from collar to harness to avoid tracheal pressure", "Isolate from other dogs to prevent contagion"],
          donts: ["Do not exercise heavily", "Do not expose to cold damp air"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_br_3",
          title: "Severe choking, gasping, blue/purple gums, or rapid panting while resting",
          level: 1,
          guidance: "OXYGEN DEPRIVATION EMERGENCY. Blue or pale gums indicate respiratory distress, foreign object obstruction, or fluid in lungs.",
          dos: ["Rush to 24/7 Emergency Clinic immediately", "Keep vehicle well air-conditioned with open airflow"],
          donts: ["Do NOT put fingers deep in throat unless a visible loose object is easily grasped", "Do NOT muzzle"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      energy: [
        {
          id: "d_en_1",
          title: "A bit tired after a long play day or park walk",
          level: 3,
          guidance: "Post-exercise fatigue is normal. Ensure comfortable bed, cool environment, and fresh water.",
          dos: ["Allow 12-24 hours of quiet rest", "Check paw pads for minor scrapes"],
          donts: ["Do not force vigorous play"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_en_2",
          title: "Not eating for 24 hours, hides, reluctant to get up",
          level: 2,
          guidance: "Prolonged anorexia in dogs can signal infection, dental pain, pancreatitis, or organ stress.",
          dos: ["Offer a teaspoon of warm bone broth", "Check if body feels abnormally hot"],
          donts: ["Do not force-feed solid food"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_en_3",
          title: "Sudden collapse, seizure lasting > 2 mins, or unable to wake up",
          level: 1,
          guidance: "NEUROLOGICAL & CARDIOVASCULAR EMERGENCY. Potential seizure cluster, internal hemorrhage, or syncope.",
          dos: ["Move furniture away to prevent injury", "Time the duration of the episode", "Keep hands away from mouth"],
          donts: ["Do NOT hold the tongue", "Do NOT administer oral medications"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      mobility: [
        {
          id: "d_mob_1",
          title: "Slight stiffness after waking up, warms out of it",
          level: 3,
          guidance: "Common in adult and senior dogs (mild joint arthritis). Ask our vets about joint glucosamine supplements.",
          dos: ["Provide orthopedic supportive bedding", "Engage in gentle low-impact walks"],
          donts: ["Do not allow jumping off high sofas or beds"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_mob_2",
          title: "Limping on one leg, holds paw up, can bear some weight",
          level: 2,
          guidance: "Could be a sprain, torn cruciate ligament (CCL), or thorn embedded between pads.",
          dos: ["Inspect pads and between toes with a flashlight", "Restrict running and stairs"],
          donts: ["Do NOT give human painkillers (ibuprofen, paracetamol are toxic to pets)"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_mob_3",
          title: "Yelping in extreme pain, bone visibly displaced, or back legs dragging",
          level: 1,
          guidance: "TRAUMA / SPINAL EMERGENCY (Possible fracture or Intervertebral Disc Disease). Nerve damage can become permanent without rapid intervention.",
          dos: ["Transport on a flat, rigid board or blanket stretcher", "Keep spine completely straight and immobile"],
          donts: ["Do NOT bend the back or let dog walk"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      skin_eyes: [
        {
          id: "d_se_1",
          title: "Mild scratching or licking paws after park walk",
          level: 3,
          guidance: "Common seasonal contact allergy or grass seeds. Wipe paws with clean damp cloth.",
          dos: ["Clean paws with mild pet-safe wash", "Brush coat to remove burs"],
          donts: ["Do not use human alcohol wipes"],
          suggestedService: "Grooming & Dental"
        },
        {
          id: "d_se_2",
          title: "One eye squinting with thick yellow/green discharge",
          level: 2,
          guidance: "Possible corneal ulcer, foreign body, or conjunctivitis. Needs fluorescent eye stain test.",
          dos: ["Prevent pawing at eye with an Elizabethan cone if available"],
          donts: ["Do NOT use leftover human or steroid eye drops"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_se_3",
          title: "Sudden facial swelling, hives, and swollen muzzle/throat (bee sting / allergy)",
          level: 1,
          guidance: "ANAPHYLACTIC SHOCK RISK. Airway constriction can occur rapidly following stings or insect bites.",
          dos: ["Call our emergency hospital immediately", "Keep animal calm and cool during transit"],
          donts: ["Do NOT squeeze the sting site"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      toxins: [
        {
          id: "d_tox_1",
          title: "Licked a tiny crumb of chocolate cookie, acting completely normal",
          level: 3,
          guidance: "Small quantities of milk chocolate in large dogs rarely reach toxic theobromine thresholds. Monitor for 6 hours.",
          dos: ["Identify the chocolate type (Dark/Baker's chocolate is far more toxic than milk)", "Estimate pet weight vs grams ingested"],
          donts: ["Do not panic if amount is negligible"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "d_tox_2",
          title: "Ate human NSAID pills, grapes, raisins, xylitol sweetener, or dark chocolate",
          level: 1,
          guidance: "ACUTE POISONING DANGER. Xylitol causes fatal hypoglycemia; grapes cause irreversible kidney failure.",
          dos: ["Bring the pill bottle, wrapper, or ingredient label", "Note the exact time of ingestion", "Call our ER right now"],
          donts: ["Do NOT induce vomiting with salt (salt toxicity causes brain damage)"],
          suggestedService: "Emergency Trauma Care"
        },
        {
          id: "d_tox_3",
          title: "Suspected rat poison / anticoagulant bait ingestion",
          level: 1,
          guidance: "LETHAL INTERNAL BLEEDING RISK. Anticoagulants deplete Vitamin K1 and require immediate antidote therapy.",
          dos: ["Bring the manufacturer's bait box or chemical name", "Proceed directly to emergency clinic"],
          donts: ["Do NOT wait for bleeding symptoms to appear"],
          suggestedService: "Emergency Trauma Care"
        }
      ]
    },
    cat: {
      digestive: [
        {
          id: "c_dig_1",
          title: "Hacked up a hairball with small amount of clear fluid, alert",
          level: 3,
          guidance: "Normal feline hairball expulsion. Brush coat frequently and consider specialized hairball paste.",
          dos: ["Ensure fresh water is available", "Brush coat daily to reduce ingested fur"],
          donts: ["Do not feed heavy meal immediately"],
          suggestedService: "Grooming & Dental"
        },
        {
          id: "c_dig_2",
          title: "Vomited food twice, refuses food for 18 hours",
          level: 2,
          guidance: "Cats that do not eat for 24-48 hours are at severe risk of Hepatic Lipidosis (fatty liver disease). Vet visit recommended today.",
          dos: ["Offer fragrant warm wet food", "Keep in a calm, dark, quiet room"],
          donts: ["Never allow a cat to fast longer than 24 hours"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_dig_3",
          title: "Straining in litterbox with vocal crying / no urine produced (Male Cat)",
          level: 1,
          guidance: "CRITICAL LIFE-THREATENING URINARY BLOCKAGE. Urethral obstruction causes potassium buildup and cardiac arrest within 24 hours.",
          dos: ["Rush to 24/7 ER hospital immediately", "Handle cat extremely gently"],
          donts: ["Do NOT wait to see if cat produces urine later", "Do NOT press the hard bladder"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      breathing: [
        {
          id: "c_br_1",
          title: "Occasional mild sneeze while grooming or sleeping",
          level: 3,
          guidance: "Minor dust irritation or mild viral sniffle. Check eyes for discharge and keep warm.",
          dos: ["Provide clean warm sleeping spot", "Clean food bowls"],
          donts: ["Do not use essential oil diffusers around cats"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_br_2",
          title: "Crouched with neck extended, wheezing or coughing like choking",
          level: 2,
          guidance: "Classic posture for Feline Asthma or allergic bronchitis. Requires chest radiographs.",
          dos: ["Minimize stress and reduce dust in litterbox (use low-dust litter)", "Film a 10-second video of the episode for the vet"],
          donts: ["Do not smoke or use perfumes near the cat"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_br_3",
          title: "Open-mouth panting, tongue hanging out, blue gums",
          level: 1,
          guidance: "ACUTE RESPIRATORY EMERGENCY. Cats rarely pant like dogs; open-mouth breathing indicates severe hypoxia or pleural effusion.",
          dos: ["Place gently into carrier and rush to emergency unit", "Minimize handling and vehicle noise"],
          donts: ["Do NOT stress the cat", "Do NOT attempt to examine mouth yourself"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      energy: [
        {
          id: "c_en_1",
          title: "Sleeping more than usual on a rainy/cold day, eats well",
          level: 3,
          guidance: "Cats sleep 12-16 hours naturally. As long as appetite and litter habits are normal, observe.",
          dos: ["Engage with a feather wand toy", "Observe mealtime appetite"],
          donts: ["Do not disturb deep sleep"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_en_2",
          title: "Hiding in dark closet for entire day, refuses interaction",
          level: 2,
          guidance: "Hiding is a primary feline symptom of systemic illness or pain.",
          dos: ["Place food and litterbox nearby in a quiet room", "Schedule clinical exam"],
          donts: ["Do not drag cat forcefully from hiding spot"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_en_3",
          title: "Sudden loss of rear leg movement, crying in agony, cold paws",
          level: 1,
          guidance: "AORTIC SADDLE THROMBUS (Blood clot to hind limbs). Extreme emergency secondary to feline hypertrophic cardiomyopathy.",
          dos: ["Transport to ER immediately with warm towels", "Call emergency line so triage is waiting at door"],
          donts: ["Do NOT manipulate or stretch back legs"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      mobility: [
        {
          id: "c_mob_1",
          title: "Hesitant before jumping high onto counter, steps down carefully",
          level: 3,
          guidance: "Common sign of feline osteoarthritis in cats over 7 years old. Discuss joint therapy with our feline team.",
          dos: ["Provide intermediate steps or ramps to high places"],
          donts: ["Do not force jumping"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_mob_2",
          title: "Limping on one paw after jumping from cupboard",
          level: 2,
          guidance: "Possible sprain or metacarpal fracture. Restrict to a single room without jumping surfaces.",
          dos: ["Confine to a single quiet room with low litterbox"],
          donts: ["NEVER give human paracetamol/Tylenol (causes fatal liver failure in cats)"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_mob_3",
          title: "Unable to bear weight, bone protruding or high-rise fall trauma",
          level: 1,
          guidance: "HIGH-RISE SYNDROME / CRITICAL FRACTURE. Potential pneumothorax or internal rupture.",
          dos: ["Place on flat padded towel in bottom of carrier", "Transport smoothly"],
          donts: ["Do NOT let cat jump or move freely in car"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      skin_eyes: [
        {
          id: "c_se_1",
          title: "Frequent head shaking and scratching base of ears",
          level: 3,
          guidance: "Often ear mites (Otodectes cynotis) or bacterial otitis. Microscopic ear swab test will confirm.",
          dos: ["Check for dark coffee-ground discharge in ear flap"],
          donts: ["Do not insert Q-tips into ear canal"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_se_2",
          title: "Third eyelid visible across inner eye, squinting",
          level: 2,
          guidance: "Known as 'Haw's syndrome' or eye inflammation. Indicates corneal scratch, pain, or systemic stress.",
          dos: ["Keep lighting subdued and calm"],
          donts: ["Do not apply non-prescribed ointments"],
          suggestedService: "Routine Wellness Exam"
        },
        {
          id: "c_se_3",
          title: "Rapidly swelling face, tongue, or lips with excessive drooling",
          level: 1,
          guidance: "ANAPHYLACTIC REACTION or chemical burn from toxic houseplant. Airway obstruction risk.",
          dos: ["Check for chewed toxic plants (Dieffenbachia, etc.)", "Head directly to emergency hospital"],
          donts: ["Do NOT induce vomiting"],
          suggestedService: "Emergency Trauma Care"
        }
      ],
      toxins: [
        {
          id: "c_tox_1",
          title: "Brushed against and licked true Lilies (Easter, Tiger, Stargazer, Daylily)",
          level: 1,
          guidance: "FATAL NEPHROTOXIC EMERGENCY. Even a few grains of lily pollen or drinking vase water causes fatal acute kidney necrosis within 36 hours.",
          dos: ["Rush to 24/7 ER immediately for aggressive IV fluid diuresis", "Bring the flower or petal sample"],
          donts: ["Do NOT delay even one minute. Once kidneys fail, prognosis is grave."],
          suggestedService: "Emergency Trauma Care"
        },
        {
          id: "c_tox_2",
          title: "Ingested paracetamol (acetaminophen / Panadol / Tylenol)",
          level: 1,
          guidance: "DEADLY TOXIC EMERGENCY. Cats lack glucuronyl transferase. Methemoglobinemia and fatal cyanosis occur rapidly.",
          dos: ["Rush to emergency care immediately for N-acetylcysteine antidote therapy", "Bring the medicine box"],
          donts: ["Do NOT wait. Even a fraction of a pill is lethal."],
          suggestedService: "Emergency Trauma Care"
        },
        {
          id: "c_tox_3",
          title: "Accidental dog flea medication (permethrin) applied to cat",
          level: 1,
          guidance: "SEVERE NEUROTOXIC EMERGENCY. Permethrin causes muscle tremors, seizures, and death in felines.",
          dos: ["Wash area with liquid Dawn dish soap and lukewarm water if safe", "Proceed directly to emergency clinic"],
          donts: ["Do NOT use hot water (increases skin absorption)"],
          suggestedService: "Emergency Trauma Care"
        }
      ]
    }
  };

  let triageState = {
    species: "dog",
    category: "digestive",
    selectedSymptomId: null
  };

  const speciesButtons = document.querySelectorAll(".triage__species-toggle .species-btn");
  const categoryButtons = document.querySelectorAll(".triage__categories .triage-cat-btn");
  const symptomListContainer = document.getElementById("triage-symptom-list");
  const analyzeBtn = document.getElementById("btn-analyze-triage");
  const resultWrapper = document.getElementById("triage-result-wrapper");
  const resultCard = document.getElementById("triage-result-card");

  function renderSymptoms() {
    if (!symptomListContainer) return;

    const list = (triageDatabase[triageState.species] && triageDatabase[triageState.species][triageState.category]) || [];

    if (list.length === 0) {
      symptomListContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No specific symptoms logged for this combination. Please contact our 24/7 vet team.</p>`;
      triageState.selectedSymptomId = null;
      return;
    }

    triageState.selectedSymptomId = list[0].id;

    symptomListContainer.innerHTML = list.map((item, index) => {
      const isSelected = index === 0;
      let badgeClass = "risk-level-3";
      let badgeLabel = "Mild / Low Risk";
      if (item.level === 1) {
        badgeClass = "risk-level-1";
        badgeLabel = "🚨 Emergency";
      } else if (item.level === 2) {
        badgeClass = "risk-level-2";
        badgeLabel = "⚠️ Urgent Visit";
      }

      return `
        <div class="symptom-item ${isSelected ? "selected" : ""}" data-id="${item.id}">
          <div class="symptom-left">
            <input type="radio" name="symptom-radio" class="symptom-radio" value="${item.id}" ${isSelected ? "checked" : ""} />
            <span class="symptom-title">${item.title}</span>
          </div>
          <span class="risk-badge ${badgeClass}">${badgeLabel}</span>
        </div>
      `;
    }).join("");

    // Add click listeners to symptom cards
    document.querySelectorAll(".symptom-item").forEach((card) => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".symptom-item").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        const radio = card.querySelector(".symptom-radio");
        if (radio) radio.checked = true;
        triageState.selectedSymptomId = card.getAttribute("data-id");
      });
    });
  }

  // Handle Species Toggle
  speciesButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      speciesButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      triageState.species = btn.getAttribute("data-species");
      if (resultWrapper) resultWrapper.style.display = "none";
      renderSymptoms();
    });
  });

  // Handle Category Toggle
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      triageState.category = btn.getAttribute("data-cat");
      if (resultWrapper) resultWrapper.style.display = "none";
      renderSymptoms();
    });
  });

  // Initialize symptom list on page load
  renderSymptoms();

  // Evaluate Symptoms Button
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      const list = (triageDatabase[triageState.species] && triageDatabase[triageState.species][triageState.category]) || [];
      const symptom = list.find((item) => item.id === triageState.selectedSymptomId) || list[0];

      if (!symptom) {
        showToast("Select Symptom", "Please choose a symptom to evaluate.", "error");
        return;
      }

      const durationSelect = document.getElementById("triage-duration");
      const alertnessSelect = document.getElementById("triage-alertness");
      const durationText = durationSelect ? durationSelect.options[durationSelect.selectedIndex].text : "Today";
      const alertnessValue = alertnessSelect ? alertnessSelect.value : "normal";

      // If animal collapsed or unresponsive, immediately escalate to Level 1 Critical!
      let effectiveLevel = symptom.level;
      if (alertnessValue === "collapsed") {
        effectiveLevel = 1;
      } else if (alertnessValue === "lethargic" && effectiveLevel === 3) {
        effectiveLevel = 2;
      }

      let levelClass = "triage-level-mild";
      let iconClass = "ri-checkbox-circle-fill";
      let headerTitle = "Mild Condition — Safe for Home Monitoring";
      let headerSubtitle = "Symptoms appear non-critical at this time. Follow home care advice below and observe closely.";
      let levelToast = "Mild / Safe for Home Monitoring";
      let toastType = "success";

      if (effectiveLevel === 1) {
        levelClass = "triage-level-critical";
        iconClass = "ri-alarm-warning-fill";
        headerTitle = "🚨 CRITICAL EMERGENCY — SEEK IMMEDIATE VET CARE";
        headerSubtitle = "This is a potentially life-threatening emergency. Immediate clinical intervention is required. Do not wait.";
        levelToast = "CRITICAL EMERGENCY ALERT";
        toastType = "error";
      } else if (effectiveLevel === 2) {
        levelClass = "triage-level-urgent";
        iconClass = "ri-error-warning-fill";
        headerTitle = "⚠️ URGENT CLINICAL ATTENTION RECOMMENDED";
        headerSubtitle = "Your pet requires prompt veterinary evaluation within the next 12 to 24 hours to prevent complications.";
        levelToast = "Urgent Clinic Visit Recommended";
        toastType = "info";
      }

      const dosListHtml = symptom.dos.map((item) => `<li><i class="ri-check-line check"></i> <span><strong>DO:</strong> ${item}</span></li>`).join("");
      const dontsListHtml = symptom.donts.map((item) => `<li><i class="ri-close-line cross"></i> <span><strong>DON'T:</strong> ${item}</span></li>`).join("");

      let actionButtonsHtml = "";
      if (effectiveLevel === 1) {
        actionButtonsHtml = `
          <a href="tel:+94708765432" class="btn-triage-emergency">
            <i class="ri-phone-fill"></i> Call 24/7 ER: +94 70 876 5432
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" class="btn__secondary">
            <i class="ri-direction-line"></i> Directions to 24/7 Clinic
          </a>
          <button type="button" class="btn__secondary btn-reset-triage">
            <i class="ri-refresh-line"></i> Check Another Symptom
          </button>
        `;
      } else if (effectiveLevel === 2) {
        actionButtonsHtml = `
          <button type="button" class="btn__primary btn-triage-book-now">
            <i class="ri-calendar-check-fill"></i> Book Fast-Track Appointment
          </button>
          <a href="tel:+94708765432" class="btn__secondary">
            <i class="ri-phone-line"></i> Speak with Clinic Vet
          </a>
          <button type="button" class="btn__secondary btn-reset-triage">
            <i class="ri-refresh-line"></i> Check Another Symptom
          </button>
        `;
      } else {
        actionButtonsHtml = `
          <button type="button" class="btn__secondary btn-triage-book-now">
            <i class="ri-calendar-line"></i> Schedule Routine Checkup
          </button>
          <button type="button" class="btn__primary btn-reset-triage">
            <i class="ri-refresh-line"></i> Check Another Symptom
          </button>
        `;
      }

      if (resultCard) {
        resultCard.className = `triage__result-card ${levelClass}`;
        resultCard.innerHTML = `
          <div class="triage-res-header">
            <div class="triage-res-icon">
              <i class="${iconClass}"></i>
            </div>
            <div class="triage-res-title">
              <h3>${headerTitle}</h3>
              <p>${headerSubtitle}</p>
            </div>
          </div>
          <div class="triage-res-body">
            <div class="triage-guidance-box">
              <strong>Veterinary Triage Assessment:</strong>
              ${symptom.guidance}
              <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
                <em>Patient context: ${triageState.species === "dog" ? "Canine (Dog)" : "Feline (Cat)"} • Reported duration: ${durationText}</em>
              </div>
            </div>

            <div class="triage-checklist">
              <h5>Care Protocols & First-Aid Instructions:</h5>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                ${dosListHtml}
                ${dontsListHtml}
              </ul>
            </div>

            <div class="triage-res-actions">
              ${actionButtonsHtml}
            </div>
          </div>
        `;
      }

      if (resultWrapper) {
        resultWrapper.style.display = "block";
        resultWrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      showToast("Triage Evaluation Complete", levelToast, toastType);

      // Wire Book Appointment button from Triage
      const bookFromTriageBtn = resultCard ? resultCard.querySelector(".btn-triage-book-now") : null;
      if (bookFromTriageBtn) {
        bookFromTriageBtn.addEventListener("click", () => {
          const notesText = `[Symptom Triage Assessment: ${symptom.title} (Duration: ${durationText}, Alertness: ${alertnessValue})]`;
          const speciesText = triageState.species === "dog" ? "Dog" : "Cat";
          openBookingModal(symptom.suggestedService, notesText, speciesText);
        });
      }

      // Wire Reset button
      const resetBtn = resultCard ? resultCard.querySelector(".btn-reset-triage") : null;
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (resultWrapper) resultWrapper.style.display = "none";
          const card = document.getElementById("triage-card");
          if (card) card.scrollIntoView({ behavior: "smooth" });
        });
      }
    });
  }

  // =========================================================================
  // 17. Interactive Order Tracking Portal
  // =========================================================================
  const orderTrackerModal = document.getElementById("order-tracker-modal");
  const closeOrderTrackerBtn = document.getElementById("close-order-tracker-modal");
  const navTrackBtn = document.getElementById("nav-track-btn");
  const footerTrackBtn = document.getElementById("footer-track-btn");
  const trackerInput = document.getElementById("tracker-input-code");
  const trackerSubmitBtn = document.getElementById("tracker-submit-btn");
  const trackerResultArea = document.getElementById("tracker-result-area");
  const trackerSampleChips = document.querySelectorAll(".order-tracker__sample-chip");

  // Pre-seeded mock orders
  const DEFAULT_TRACKED_ORDERS = [
    {
      id: "ORD-9824-77",
      customer: "Nuwan Jayasuriya",
      phone: "+94 77 982 4771",
      address: "No. 124 Flower Road, Colombo 07",
      status: 3, // In Transit
      placedTime: "Today, 09:30 AM",
      carrier: "PetPlace Express Fleet — Van #04",
      driver: "Kasun Perera (+94 77 123 4567)",
      eta: "Today, 3:30 PM – 4:15 PM",
      note: "Driver is approximately 3.2 km away. Out for priority doorstep delivery.",
      items: [
        { name: "Ergonomic Comfort Harness", price: 49.00, quantity: 1 },
        { name: "Bio-Degradable Waste Bags", price: 29.00, quantity: 2 }
      ]
    },
    {
      id: "ORD-4412-89",
      customer: "Sarah Fernando",
      phone: "+94 71 441 2890",
      address: "45 Havelock Road, Colombo 05",
      status: 2, // Packed at Pharmacy
      placedTime: "Today, 11:15 AM",
      carrier: "PetPlace Express Logistics",
      driver: "Assigned upon dispatch",
      eta: "Tomorrow morning (09:00 AM – 12:00 PM)",
      note: "Sterile packaging completed by Veterinary Pharmacist. Awaiting carrier pickup.",
      items: [
        { name: "Dental Care Ultrasonic Kit", price: 79.00, quantity: 1 }
      ]
    },
    {
      id: "ORD-1088-33",
      customer: "Dinesh Wickremasinghe",
      phone: "+94 76 108 8333",
      address: "88 Kandy Road, Kiribathgoda",
      status: 4, // Delivered
      placedTime: "Yesterday, 02:40 PM",
      carrier: "Island Express Courier",
      driver: "Rohan Alwis (Completed)",
      eta: "Delivered Today at 10:20 AM",
      note: "Package successfully handed to recipient. Signed: D. Wickremasinghe.",
      items: [
        { name: "Digestive Probiotic Chews", price: 38.00, quantity: 1 },
        { name: "Interactive Laser Chase Toy", price: 19.00, quantity: 1 }
      ]
    }
  ];

  function getTrackedOrders() {
    try {
      const stored = localStorage.getItem("pet_place_tracked_orders");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) { }
    localStorage.setItem("pet_place_tracked_orders", JSON.stringify(DEFAULT_TRACKED_ORDERS));
    return DEFAULT_TRACKED_ORDERS;
  }

  function saveCustomerOrder(orderRecord) {
    const list = getTrackedOrders();
    const idx = list.findIndex(o => o.id === orderRecord.id);
    if (idx >= 0) {
      list[idx] = orderRecord;
    } else {
      list.unshift(orderRecord);
    }
    localStorage.setItem("pet_place_tracked_orders", JSON.stringify(list));
  }

  function openOrderTracker(orderCode) {
    if (!orderTrackerModal) return;
    orderTrackerModal.classList.add("open");
    const codeToTrack = orderCode || (trackerInput?.value.trim()) || "ORD-9824-77";
    if (trackerInput) trackerInput.value = codeToTrack;
    renderTrackingResult(codeToTrack);
  }

  function closeOrderTracker() {
    if (orderTrackerModal) orderTrackerModal.classList.remove("open");
  }

  function renderTrackingResult(code) {
    if (!trackerResultArea) return;

    const list = getTrackedOrders();
    let order = list.find(o => o.id.toUpperCase() === code.trim().toUpperCase());

    // Fallback: If not found, dynamically generate a realistic tracking preview for whatever ID was typed
    if (!order) {
      order = {
        id: code.trim().toUpperCase(),
        customer: "Valued Pet Parent",
        phone: "+94 77 000 0000",
        address: "Colombo, Sri Lanka",
        status: 2,
        placedTime: "Today, 10:00 AM",
        carrier: "PetPlace Express Logistics",
        driver: "Express Dispatch Unit",
        eta: "Today by 5:00 PM",
        note: "Order processing verified in hospital central inventory.",
        items: [
          { name: "Veterinary Prescription Item", price: 35.00, quantity: 1 }
        ]
      };
    }

    const s = order.status; // 1, 2, 3, or 4
    const progressWidth = s === 1 ? "15%" : s === 2 ? "45%" : s === 3 ? "75%" : "100%";
    const statusBadgeText = s === 4 ? "Delivered ✓" : s === 3 ? "In Transit 🚚" : s === 2 ? "Packed 📦" : "Confirmed ✓";
    const statusBadgeClass = s === 4 ? "delivered" : s === 3 ? "transit" : "confirmed";

    let itemsHtml = "";
    let orderSubtotal = 0;
    if (order.items && order.items.length) {
      itemsHtml = order.items.map(it => {
        const lineTotal = (it.price || 0) * (it.quantity || 1);
        orderSubtotal += lineTotal;
        return `
          <div class="tracking-item-row">
            <span>${it.name} <strong style="color: var(--text-muted); font-size: 0.8rem;">x${it.quantity || 1}</strong></span>
            <span style="font-weight: 700; color: var(--text-dark);">${formatPrice(lineTotal)}</span>
          </div>
        `;
      }).join("");
    }

    trackerResultArea.innerHTML = `
      <div class="tracking-result-card">
        <!-- Result Header -->
        <div class="tracking-result-header">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Order Reference</div>
            <h4 style="font-size: 1.35rem; color: var(--primary-accent); font-weight: 800; margin: 0.15rem 0 0 0;">${order.id}</h4>
          </div>
          <div style="text-align: right;">
            <span class="tracking-order-badge ${statusBadgeClass}">
              <span class="online-indicator" style="background-color: currentColor;"></span>
              ${statusBadgeText}
            </span>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.35rem;">Placed: ${order.placedTime}</div>
          </div>
        </div>

        <!-- 4-Step Animated Timeline -->
        <div class="tracking-timeline">
          <div class="tracking-timeline-progress" style="width: ${progressWidth}; --progress-height: ${progressWidth};"></div>

          <!-- Step 1 -->
          <div class="timeline-step ${s >= 1 ? "completed" : ""}">
            <div class="timeline-node">
              <i class="ri-check-line"></i>
            </div>
            <div class="timeline-title">Order Confirmed</div>
            <div class="timeline-time">${order.placedTime}</div>
          </div>

          <!-- Step 2 -->
          <div class="timeline-step ${s > 2 ? "completed" : s === 2 ? "active" : ""}">
            <div class="timeline-node">
              <i class="ri-box-3-line"></i>
            </div>
            <div class="timeline-title">Pharmacy Packed</div>
            <div class="timeline-time">${s >= 2 ? "Quality Checked" : "Pending"}</div>
          </div>

          <!-- Step 3 -->
          <div class="timeline-step ${s > 3 ? "completed" : s === 3 ? "active" : ""}">
            <div class="timeline-node">
              <i class="ri-truck-line"></i>
            </div>
            <div class="timeline-title">Out for Delivery</div>
            <div class="timeline-time">${s >= 3 ? "In Transit" : "Queued"}</div>
          </div>

          <!-- Step 4 -->
          <div class="timeline-step ${s === 4 ? "completed" : ""}">
            <div class="timeline-node">
              <i class="ri-home-heart-line"></i>
            </div>
            <div class="timeline-title">Delivered</div>
            <div class="timeline-time">${s === 4 ? "Handed Over" : "Estimated"}</div>
          </div>
        </div>

        <!-- Live Courier & ETA Notice -->
        <div style="background: rgba(112, 88, 230, 0.08); border-left: 4px solid var(--primary-accent); border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <i class="ri-information-fill" style="color: var(--primary-accent); font-size: 1.25rem;"></i>
            <span style="font-size: 0.88rem; color: var(--text-dark); font-weight: 600;">${order.note}</span>
          </div>
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary-accent);">
            ETA: ${order.eta}
          </span>
        </div>

        <!-- Details Grid -->
        <div class="tracking-details-grid">
          <div class="tracking-detail-box">
            <h5><i class="ri-e-bike-2-line"></i> Carrier & Driver</h5>
            <p>${order.carrier}</p>
            <p style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500; margin-top: 0.25rem;">
              Driver: ${order.driver}
            </p>
          </div>

          <div class="tracking-detail-box">
            <h5><i class="ri-map-pin-user-line"></i> Destination</h5>
            <p>${order.customer}</p>
            <p style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500; margin-top: 0.25rem;">
              ${order.address}
            </p>
          </div>
        </div>

        <!-- Package Items List -->
        ${itemsHtml ? `
          <div class="tracking-items-list">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Package Contents</span>
              <span style="font-size: 0.88rem; font-weight: 800; color: var(--primary-accent);">Total: ${formatPrice(orderSubtotal)}</span>
            </div>
            ${itemsHtml}
          </div>
        ` : ""}

        <!-- Need Help with order action -->
        <div style="margin-top: 1.3rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <button type="button" class="btn__outline tracker-chat-pawbot-btn" style="padding: 0.55rem 1.2rem; font-size: 0.84rem;">
            <i class="ri-robot-2-line"></i> Need Help with this order? Ask PawBot
          </button>
        </div>
      </div>
    `;

    // Wire PawBot trigger inside tracker
    const chatWithPawBotBtn = trackerResultArea.querySelector(".tracker-chat-pawbot-btn");
    if (chatWithPawBotBtn) {
      chatWithPawBotBtn.addEventListener("click", () => {
        closeOrderTracker();
        openPawBot(`Where is my order ${order.id}?`);
      });
    }
  }

  // Bind Order Tracker Events
  if (navTrackBtn) {
    navTrackBtn.addEventListener("click", () => openOrderTracker());
  }
  const drawerTrackBtn = document.getElementById("drawer-track-btn");
  if (drawerTrackBtn) {
    drawerTrackBtn.addEventListener("click", () => {
      const navLinks = document.getElementById("nav-links");
      const navBackdrop = document.getElementById("nav-backdrop");
      if (navLinks && navLinks.classList.contains("active")) navLinks.classList.remove("active");
      if (navBackdrop && navBackdrop.classList.contains("active")) navBackdrop.classList.remove("active");
      document.body.style.overflow = "";
      openOrderTracker();
    });
  }
  if (footerTrackBtn) {
    footerTrackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openOrderTracker();
    });
  }
  if (closeOrderTrackerBtn) {
    closeOrderTrackerBtn.addEventListener("click", closeOrderTracker);
  }
  if (orderTrackerModal) {
    orderTrackerModal.addEventListener("click", (e) => {
      if (e.target === orderTrackerModal) closeOrderTracker();
    });
  }
  if (trackerSubmitBtn) {
    trackerSubmitBtn.addEventListener("click", () => {
      const code = trackerInput?.value.trim();
      if (code) {
        renderTrackingResult(code);
      } else {
        showToast("Order Reference Required", "Please enter an order ID like ORD-9824-77", "info");
      }
    });
  }
  if (trackerInput) {
    trackerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const code = trackerInput.value.trim();
        if (code) renderTrackingResult(code);
      }
    });
  }
  trackerSampleChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const code = chip.getAttribute("data-code");
      if (trackerInput) trackerInput.value = code;
      renderTrackingResult(code);
    });
  });

  // =========================================================================
  // 18. PawBot — Interactive Live Chat Assistant
  // =========================================================================
  const pawbotTrigger = document.getElementById("pawbot-trigger");
  const pawbotWindow = document.getElementById("pawbot-window");
  const pawbotCloseBtn = document.getElementById("pawbot-close-btn");
  const pawbotRestartBtn = document.getElementById("pawbot-restart-btn");
  const pawbotForm = document.getElementById("pawbot-form");
  const pawbotInput = document.getElementById("pawbot-input");
  const pawbotMessages = document.getElementById("pawbot-messages");
  const pawbotHint = document.getElementById("pawbot-hint");
  const pawbotQuickChips = document.querySelectorAll(".pawbot-chip");
  const footerPawbotBtn = document.getElementById("footer-pawbot-btn");

  let isBotTyping = false;

  // Web Audio API Gentle Chime (Offline, synthesized)
  function playPawBotChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.14); // G5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (err) { }
  }

  function openPawBot(initialMessage) {
    if (!pawbotWindow) return;
    pawbotWindow.classList.add("open");
    if (pawbotHint) pawbotHint.style.display = "none";
    if (initialMessage && pawbotInput) {
      pawbotInput.value = initialMessage;
      handlePawBotUserSubmit();
    } else if (pawbotInput) {
      setTimeout(() => pawbotInput.focus(), 300);
    }
  }

  function closePawBot() {
    if (pawbotWindow) pawbotWindow.classList.remove("open");
  }

  function formatCurrentTime() {
    const d = new Date();
    let hours = d.getHours();
    let mins = d.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    mins = mins < 10 ? "0" + mins : mins;
    return `${hours}:${mins} ${ampm}`;
  }

  function appendPawBotMessage(sender, contentHtml) {
    if (!pawbotMessages) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = `pawbot-msg ${sender}-msg`;

    msgDiv.innerHTML = `
      <div class="pawbot-bubble">
        ${contentHtml}
      </div>
      <span class="pawbot-time">${formatCurrentTime()}</span>
    `;

    pawbotMessages.appendChild(msgDiv);
    pawbotMessages.scrollTop = pawbotMessages.scrollHeight;

    // Attach click listeners for dynamic actions inside this message
    bindPawBotActionButtons(msgDiv);
  }

  function bindPawBotActionButtons(container) {
    // 1. Booking action button
    container.querySelectorAll(".pawbot-action-book").forEach(btn => {
      btn.addEventListener("click", () => {
        closePawBot();
        const service = btn.getAttribute("data-service") || "Emergency & Critical Care";
        openBookingModal(service);
      });
    });

    // 2. Track Order action button
    container.querySelectorAll(".pawbot-action-track").forEach(btn => {
      btn.addEventListener("click", () => {
        closePawBot();
        const code = btn.getAttribute("data-code") || "";
        openOrderTracker(code);
      });
    });

    // 3. Triage Symptom Checker action button
    container.querySelectorAll(".pawbot-action-triage").forEach(btn => {
      btn.addEventListener("click", () => {
        closePawBot();
        const triageEl = document.getElementById("triage");
        if (triageEl) {
          triageEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // 4. Store action button
    container.querySelectorAll(".pawbot-action-store").forEach(btn => {
      btn.addEventListener("click", () => {
        closePawBot();
        const storeEl = document.getElementById("store");
        if (storeEl) {
          storeEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // 5. Promo Code Copy action
    container.querySelectorAll(".pawbot-action-copy-code").forEach(btn => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-code") || "PET10";
        navigator.clipboard.writeText(code).then(() => {
          showToast("Coupon Copied! 🎉", `Code '${code}' copied to clipboard. Apply it at checkout!`, "success");
        }).catch(() => {
          showToast("Coupon Code", `Use code: ${code} at checkout for your discount!`, "info");
        });
      });
    });
  }

  // Natural Language Response Generator
  function getPawBotReply(rawText) {
    const text = rawText.toLowerCase().trim();

    // 1. Emergency & Urgent Symptoms
    if (
      text.includes("emergency") ||
      text.includes("urgent") ||
      text.includes("sick") ||
      text.includes("vomit") ||
      text.includes("bleed") ||
      text.includes("poison") ||
      text.includes("chok") ||
      text.includes("letharg") ||
      text.includes("breath") ||
      text.includes("seiz") ||
      text.includes("colla") ||
      text.includes("dying")
    ) {
      return `
        <p>🚨 <strong style="color: #e11d48;">VETERINARY EMERGENCY ALERT:</strong> If your pet is unresponsive, choking, or in acute pain, please call our 24/7 ICU Trauma Unit immediately.</p>
        <p>Our trauma doctors and oxygen chambers are staffed round the clock at No. 25 Galle Road, Colombo 03.</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <a href="tel:+94708765432" class="pawbot-cta-btn" style="background: #e11d48;">
            <i class="ri-phone-fill"></i> Call 24/7 Hotline (+94 70 876 5432)
          </a>
          <button type="button" class="pawbot-cta-btn pawbot-action-triage" style="background: #7058e6;">
            <i class="ri-stethoscope-line"></i> Run Clinical Triage Tool
          </button>
        </div>
      `;
    }

    // 2. Appointment Booking / Doctor
    if (
      text.includes("book") ||
      text.includes("appointment") ||
      text.includes("doctor") ||
      text.includes("vet") ||
      text.includes("consult") ||
      text.includes("visit") ||
      text.includes("schedule") ||
      text.includes("checkup")
    ) {
      return `
        <p>📅 I can help you secure an appointment with our specialist veterinary staff! We offer consultations for General OPD, Dental Surgery, Orthopedics, and Cardiac screenings.</p>
        <p>Would you like to reserve a consultation slot right now?</p>
        <button type="button" class="pawbot-cta-btn pawbot-action-book" data-service="Routine Checkup & Diagnostics">
          <i class="ri-calendar-check-line"></i> Open Appointment Booking Form
        </button>
      `;
    }

    // 3. Order Tracking / Shipping / Delivery
    if (
      text.includes("track") ||
      text.includes("order") ||
      text.includes("deliver") ||
      text.includes("shipping") ||
      text.includes("package") ||
      text.includes("courier") ||
      text.includes("where is my")
    ) {
      // Check if user provided an order code like ORD-XXXX-XX
      const match = rawText.match(/ORD-d{4}-d{2}/i);
      const codeParam = match ? match[0].toUpperCase() : "ORD-9824-77";

      return `
        <p>📦 You can monitor your orders and pharmacy deliveries with our live GPS-integrated tracker!</p>
        <p>• <strong>Colombo & Suburbs:</strong> Express Same-Day Delivery<br>• <strong>Islandwide Sri Lanka:</strong> 1–2 Business Days</p>
        <button type="button" class="pawbot-cta-btn pawbot-action-track" data-code="${codeParam}">
          <i class="ri-truck-line"></i> Track Order Live (${codeParam})
        </button>
      `;
    }

    // 4. Promo Codes & Discounts
    if (
      text.includes("promo") ||
      text.includes("discount") ||
      text.includes("coupon") ||
      text.includes("offer") ||
      text.includes("code") ||
      text.includes("sale") ||
      text.includes("cheap")
    ) {
      return `
        <p>🏷️ Here are today's active Pet Place promo codes:</p>
        <p>• <strong>PET10:</strong> 10% OFF all nutrition, accessories & pharmacy products.<br>
           • <strong>FREESHIP:</strong> Free express delivery on orders over $50.</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <button type="button" class="pawbot-cta-btn pawbot-action-copy-code" data-code="PET10">
            <i class="ri-file-copy-line"></i> Copy 'PET10' Code
          </button>
          <button type="button" class="pawbot-cta-btn pawbot-action-store">
            <i class="ri-shopping-bag-3-line"></i> Browse Pet Store
          </button>
        </div>
      `;
    }

    // 5. Clinic Hours & Location
    if (
      text.includes("hour") ||
      text.includes("location") ||
      text.includes("address") ||
      text.includes("where are you") ||
      text.includes("open") ||
      text.includes("close") ||
      text.includes("contact") ||
      text.includes("direction")
    ) {
      return `
        <p>📍 <strong>Pet Place Veterinary Hospital</strong></p>
        <p><strong>Address:</strong> No. 25, Galle Road, Colombo 03, Sri Lanka.<br>
           <strong>24/7 Emergency & ICU:</strong> Always Open (Day & Night)<br>
           <strong>Outpatient Clinic & Pharmacy:</strong> 8:00 AM – 9:00 PM daily</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" class="pawbot-cta-btn">
            <i class="ri-map-pin-2-fill"></i> Get Google Map Directions
          </a>
          <a href="tel:+94708765432" class="pawbot-cta-btn">
            <i class="ri-phone-fill"></i> Call Reception
          </a>
        </div>
      `;
    }

    // 6. Vaccinations & Preventive Care
    if (
      text.includes("vaccin") ||
      text.includes("shot") ||
      text.includes("rabies") ||
      text.includes("deworm") ||
      text.includes("flea") ||
      text.includes("tick") ||
      text.includes("microchip")
    ) {
      return `
        <p>💉 We offer comprehensive immunization & parasite control:</p>
        <p>• <strong>Dogs:</strong> DHPP Core 5-in-1, Rabies & Leptospirosis.<br>
           • <strong>Cats:</strong> Feline FVRCP & Rabies.<br>
           • <strong>Microchipping:</strong> ISO 11784 standard lifetime RFID chip.</p>
        <button type="button" class="pawbot-cta-btn pawbot-action-book" data-service="Core Vaccines & Microchip">
          <i class="ri-shield-check-line"></i> Book Vaccination & Microchip
        </button>
      `;
    }

    // 7. Grooming & Spa
    if (
      text.includes("groom") ||
      text.includes("spa") ||
      text.includes("bath") ||
      text.includes("haircut") ||
      text.includes("nail") ||
      text.includes("wash")
    ) {
      return `
        <p>✨ Our Luxury Pet Spa provides gentle, stress-free grooming:</p>
        <p>• Medicated herbal flea & tick bath<br>
           • Breed-specific scissor styling & coat de-shedding<br>
           • Ultrasonic dental polish & ear sanitization</p>
        <button type="button" class="pawbot-cta-btn pawbot-action-book" data-service="Luxury Boarding & Spa">
          <i class="ri-sparkling-fill"></i> Book Grooming Spa Slot
        </button>
      `;
    }

    // 8. Food & Nutrition
    if (
      text.includes("food") ||
      text.includes("diet") ||
      text.includes("feed") ||
      text.includes("kibble") ||
      text.includes("nutrition") ||
      text.includes("weight")
    ) {
      return `
        <p>🥩 Proper nutrition is the foundation of longevity! In our pet store, we stock veterinary-approved grain-free kibble, digestive probiotic toppers, and sensitive-skin salmon oil.</p>
        <p>You can also compute your pet's precise daily kcal requirements using our Health Calculator!</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <button type="button" class="pawbot-cta-btn pawbot-action-store">
            <i class="ri-store-2-line"></i> Visit Store
          </button>
          <a href="#calculator" class="pawbot-cta-btn" onclick="document.getElementById('pawbot-window').classList.remove('open')">
            <i class="ri-calculator-line"></i> Calculate Calories
          </a>
        </div>
      `;
    }

    // 9. TeleVet Virtual Video Consultation
    if (
      text.includes("televet") ||
      text.includes("video") ||
      text.includes("virtual") ||
      text.includes("online vet") ||
      text.includes("telehealth") ||
      text.includes("call doctor")
    ) {
      return `
        <p>📹 <strong>PetPlace TeleVet 24/7 Live Video Care:</strong></p>
        <p>You can connect directly with our licensed veterinarians from home for non-emergency triage, skin consultations, behavioral guidance, and digital e-prescriptions!</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <a href="#televet-section" class="pawbot-cta-btn" onclick="document.getElementById('pawbot-window').classList.remove('open')">
            <i class="ri-video-chat-fill"></i> View TeleVet Clinic
          </a>
        </div>
      `;
    }

    // 10. Digital Pet Passport & Records
    if (
      text.includes("passport") ||
      text.includes("record") ||
      text.includes("vitals") ||
      text.includes("certificate") ||
      text.includes("travel")
    ) {
      return `
        <p>📋 <strong>Digital Pet Passport & Health Vault:</strong></p>
        <p>Manage your companion's verified ISO microchip registration, vaccination boosters, weight velocity, and IATA travel clearances from any device.</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <a href="#passport" class="pawbot-cta-btn" onclick="document.getElementById('pawbot-window').classList.remove('open')">
            <i class="ri-profile-fill"></i> Open Pet Passport
          </a>
        </div>
      `;
    }

    // 11. Medication Tracker & PetRx
    if (
      text.includes("medication") ||
      text.includes("pill") ||
      text.includes("dose") ||
      text.includes("reminder") ||
      text.includes("schedule") ||
      text.includes("rx")
    ) {
      return `
        <p>💊 <strong>PetRx Daily Medication & Prevention Tracker:</strong></p>
        <p>Track doses, maintain your adherence streak, and never miss daily heartworm or allergy medications.</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <a href="#med-tracker" class="pawbot-cta-btn" onclick="document.getElementById('pawbot-window').classList.remove('open')">
            <i class="ri-capsule-fill"></i> View Dose Scheduler
          </a>
        </div>
      `;
    }

    // 12. PawAlert Lost & Found
    if (
      text.includes("lost") ||
      text.includes("found") ||
      text.includes("missing") ||
      text.includes("stray") ||
      text.includes("flyer") ||
      text.includes("poster")
    ) {
      return `
        <p>🚨 <strong>PawAlert Community Pet Finder:</strong></p>
        <p>Every second counts! You can search active community sightings or generate an instant high-visibility printable missing pet poster with a reward QR code.</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <a href="#lost-found" class="pawbot-cta-btn" onclick="document.getElementById('pawbot-window').classList.remove('open')">
            <i class="ri-broadcast-fill"></i> View Lost & Found Bulletin
          </a>
        </div>
      `;
    }

    // 13. Multi-Currency & Payment
    if (
      text.includes("currency") ||
      text.includes("price") ||
      text.includes("dollar") ||
      text.includes("rupee") ||
      text.includes("euro") ||
      text.includes("pound") ||
      text.includes("lkr") ||
      text.includes("pay")
    ) {
      return `
        <p>💱 We support multiple global and local currencies:</p>
        <p>• <strong>USD ($), EUR (€), GBP (£), LKR (Rs.), AUD (A$)</strong><br>
           You can switch currencies instantly using the dropdown located in the navigation header bar!</p>
        <p>We accept Visa, MasterCard, American Express, Apple Pay, and Cash on Delivery islandwide.</p>
      `;
    }

    // 10. Greetings & Friendly Default
    if (
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey") ||
      text.includes("good morning") ||
      text.includes("good evening") ||
      text.includes("pawbot")
    ) {
      return `
        <p>Hello there, pet lover! 🐾 I'm <strong>PawBot</strong>, ready to assist you. What can I do for you and your furry friend right now?</p>
        <p>Feel free to choose a quick topic below or type any question!</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.4rem;">
          <button type="button" class="pawbot-cta-btn pawbot-action-book">📅 Book a Visit</button>
          <button type="button" class="pawbot-cta-btn pawbot-action-track">📦 Track an Order</button>
          <button type="button" class="pawbot-cta-btn pawbot-action-triage">🚨 Check Symptoms</button>
        </div>
      `;
    }

    // Fallback
    return `
      <p>Thanks for reaching out! 🐾 I can assist you with <strong>veterinary emergency triage</strong>, <strong>doctor appointments</strong>, <strong>order tracking</strong>, <strong>store discounts (PET10)</strong>, and <strong>clinic hours</strong>.</p>
      <p>Which one would you like to explore?</p>
      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.4rem;">
        <button type="button" class="pawbot-cta-btn pawbot-action-book">📅 Book Visit</button>
        <button type="button" class="pawbot-cta-btn pawbot-action-track">📦 Track Order</button>
        <button type="button" class="pawbot-cta-btn pawbot-action-triage">🚨 Symptom Check</button>
      </div>
    `;
  }

  function handlePawBotUserSubmit() {
    if (!pawbotInput || isBotTyping) return;
    const userText = pawbotInput.value.trim();
    if (!userText) return;

    // Append user bubble
    appendPawBotMessage("user", `<p>${escapeHtml(userText)}</p>`);
    pawbotInput.value = "";

    // Show typing indicator
    isBotTyping = true;
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "pawbot-typing";
    typingIndicator.id = "pawbot-active-typing";
    typingIndicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    pawbotMessages.appendChild(typingIndicator);
    pawbotMessages.scrollTop = pawbotMessages.scrollHeight;

    // Simulate natural AI thinking delay (600ms)
    setTimeout(() => {
      const activeIndicator = document.getElementById("pawbot-active-typing");
      if (activeIndicator) activeIndicator.remove();
      isBotTyping = false;

      const replyHtml = getPawBotReply(userText);
      appendPawBotMessage("bot", replyHtml);
      playPawBotChime();
    }, 600);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Bind PawBot Events
  if (pawbotTrigger) {
    pawbotTrigger.addEventListener("click", () => {
      if (pawbotWindow && pawbotWindow.classList.contains("open")) {
        closePawBot();
      } else {
        openPawBot();
      }
    });
  }
  if (pawbotCloseBtn) {
    pawbotCloseBtn.addEventListener("click", closePawBot);
  }
  if (footerPawbotBtn) {
    footerPawbotBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openPawBot();
    });
  }
  if (pawbotRestartBtn) {
    pawbotRestartBtn.addEventListener("click", () => {
      if (!pawbotMessages) return;
      pawbotMessages.innerHTML = `
        <div class="pawbot-msg bot-msg">
          <div class="pawbot-bubble">
            <p>Woof & Purr! 🐾 I'm <strong>PawBot</strong>, your Pet Place virtual care assistant. How can I help you and your pet today? Ask me about our veterinary doctors, emergency triage, store products, or booking an appointment!</p>
          </div>
          <span class="pawbot-time">Just now</span>
        </div>
      `;
      showToast("PawBot Reset", "Chat session cleared and restarted.", "info");
    });
  }
  if (pawbotForm) {
    pawbotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handlePawBotUserSubmit();
    });
  }
  pawbotQuickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const msg = chip.getAttribute("data-msg") || chip.textContent.trim();
      if (pawbotInput) pawbotInput.value = msg;
      handlePawBotUserSubmit();
    });
  });

  // =========================================================================
  // 17. Welcome Landing Page Gateway & Smooth Enter Transition
  // =========================================================================
  const landingPageEl = document.getElementById("landing-page");
  const mainAppEl = document.getElementById("main-app");
  const getStartedBtns = document.querySelectorAll(".btn-get-started");
  const featureEnterBtns = document.querySelectorAll(".btn-feature-enter");
  const featureCards = document.querySelectorAll(".landing__feature-item");
  const returnLandingBtn = document.getElementById("btn-return-landing");
  const drawerReturnLandingBtn = document.getElementById("drawer-return-landing");

  function enterMainApplication(targetHash = null) {
    if (!landingPageEl || !mainAppEl) return;

    landingPageEl.classList.add("landing-fade-out");

    setTimeout(() => {
      landingPageEl.style.display = "none";
      landingPageEl.classList.remove("landing-fade-out");

      mainAppEl.style.display = "block";
      mainAppEl.classList.add("main-app-fade-in");
      document.body.classList.add("in-main-app");

      sessionStorage.setItem("petplace_entered", "true");

      // Trigger recalculations for responsive elements & Swipers
      window.dispatchEvent(new Event("resize"));
      if (typeof ScrollReveal !== "undefined") {
        try {
          ScrollReveal().sync();
        } catch (err) {
          // Ignore if ScrollReveal instance is private
        }
      }

      if (targetHash && document.querySelector(targetHash)) {
        setTimeout(() => {
          const targetEl = document.querySelector(targetHash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      showToast("Welcome to Pet Place! 🐾", "Explore our full hospital, interactive tools, and store.", "success");
    }, 380);
  }

  function returnToLandingPage() {
    if (!landingPageEl || !mainAppEl) return;

    // Close mobile drawer if open
    const navLinks = document.getElementById("nav-links");
    const navBackdrop = document.getElementById("nav-backdrop");
    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
    if (navBackdrop && navBackdrop.classList.contains("active")) {
      navBackdrop.classList.remove("active");
    }
    document.body.style.overflow = "";

    mainAppEl.classList.add("main-app-fade-out");

    setTimeout(() => {
      mainAppEl.style.display = "none";
      mainAppEl.classList.remove("main-app-fade-out");
      mainAppEl.classList.remove("main-app-fade-in");
      document.body.classList.remove("in-main-app");

      landingPageEl.style.display = "block";
      landingPageEl.classList.add("landing-fade-in");

      sessionStorage.removeItem("petplace_entered");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        landingPageEl.classList.remove("landing-fade-in");
      }, 400);

      showToast("Welcome Landing", "Returned to introductory portal view.", "info");
    }, 300);
  }

  // Attach event listeners to all Get Started buttons
  getStartedBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      enterMainApplication();
    });
  });

  // Attach feature buttons with direct section jumping
  featureEnterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = btn.getAttribute("data-target");
      enterMainApplication(target);
    });
  });

  // Attach card clicks
  featureCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-feature-enter")) return;
      const target = card.getAttribute("data-target");
      enterMainApplication(target);
    });
  });

  // Return to landing page buttons
  if (returnLandingBtn) {
    returnLandingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      returnToLandingPage();
    });
  }
  if (drawerReturnLandingBtn) {
    drawerReturnLandingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      returnToLandingPage();
    });
  }

  // Gateway initialization check:
  // Show main app if session is already active OR url has a specific feature anchor
  const directFeatureAnchors = ["#about", "#service", "#services", "#televet-section", "#triage", "#passport", "#med-tracker", "#store", "#calculator", "#reviews", "#faq", "#lost-found", "#appointment", "#contact"];
  const currentAnchor = window.location.hash.toLowerCase();
  const hasEnteredInSession = sessionStorage.getItem("petplace_entered") === "true";

  if (hasEnteredInSession || directFeatureAnchors.includes(currentAnchor)) {
    if (landingPageEl) landingPageEl.style.display = "none";
    if (mainAppEl) mainAppEl.style.display = "block";
    document.body.classList.add("in-main-app");
  } else {
    if (landingPageEl) landingPageEl.style.display = "block";
    if (mainAppEl) mainAppEl.style.display = "none";
    document.body.classList.remove("in-main-app");
  }

  // =========================================================================
  // 19. TeleVet 24/7 Virtual Consultation Suite
  // =========================================================================
  let selectedDoctor = "Dr. Maya Senanayake";
  let televetTimerInterval = null;
  let televetSeconds = 0;
  let isMicMuted = false;
  let isCamOff = false;

  const docCards = document.querySelectorAll(".televet__doc-card");
  const startTeleVetBtn = document.getElementById("btn-start-televet");
  const televetModal = document.getElementById("televet-modal");
  const closeTeleVetBtn = document.getElementById("close-televet-modal");
  const televetEndCallBtn = document.getElementById("televet-btn-end");
  const televetDocNameEl = document.getElementById("televet-doc-name");
  const televetCallTimerEl = document.getElementById("televet-call-timer");
  const televetMicBtn = document.getElementById("televet-btn-mic");
  const televetCamBtn = document.getElementById("televet-btn-cam");
  const televetChatToggleBtn = document.getElementById("televet-btn-chat");
  const televetChatSidebar = document.getElementById("televet-chat-sidebar");
  const televetChatForm = document.getElementById("televet-chat-form");
  const televetChatInput = document.getElementById("televet-chat-input");
  const televetChatStream = document.getElementById("televet-chat-stream");
  const televetRxBtn = document.getElementById("televet-btn-rx");
  const televetRxDrawer = document.getElementById("televet-rx-drawer");
  const televetRxContent = document.getElementById("televet-rx-content");
  const printRxBtn = document.getElementById("btn-print-rx");
  const captionsEl = document.getElementById("televet-captions");

  docCards.forEach(card => {
    card.addEventListener("click", () => {
      docCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      selectedDoctor = card.getAttribute("data-doc");
      showToast("Doctor Selected", `${selectedDoctor} selected for video consultation.`, "info");
    });
  });

  function startTeleVetCall() {
    if (!televetModal) return;
    if (televetDocNameEl) televetDocNameEl.textContent = selectedDoctor;
    televetModal.classList.add("open");
    televetSeconds = 0;
    if (televetCallTimerEl) televetCallTimerEl.textContent = "00:00";

    clearInterval(televetTimerInterval);
    televetTimerInterval = setInterval(() => {
      televetSeconds++;
      const mins = String(Math.floor(televetSeconds / 60)).padStart(2, "0");
      const secs = String(televetSeconds % 60).padStart(2, "0");
      if (televetCallTimerEl) televetCallTimerEl.textContent = `${mins}:${secs}`;

      // Update doctor speaking simulation
      if (televetSeconds === 5 && captionsEl) {
        captionsEl.textContent = `"I've reviewed the allergy records for Milo. Could you show me his skin or eyes closely with your camera?"`;
      } else if (televetSeconds === 12 && captionsEl) {
        captionsEl.textContent = `"The mucosal tone looks healthy. I'm going to prescribe an oral antihistamine and an anti-inflammatory balm."`;
      }
    }, 1000);

    showToast("Virtual Consultation Connected 🟢", `You are now in a live session with ${selectedDoctor}.`, "success");
  }

  function endTeleVetCall() {
    clearInterval(televetTimerInterval);
    if (televetModal) televetModal.classList.remove("open");
    if (televetRxDrawer) televetRxDrawer.style.display = "none";
    showToast("Consultation Ended", "Video call finished. Clinical notes saved to your pet vault.", "info");
  }

  if (startTeleVetBtn) startTeleVetBtn.addEventListener("click", startTeleVetCall);
  if (closeTeleVetBtn) closeTeleVetBtn.addEventListener("click", endTeleVetCall);
  if (televetEndCallBtn) televetEndCallBtn.addEventListener("click", endTeleVetCall);

  if (televetMicBtn) {
    televetMicBtn.addEventListener("click", () => {
      isMicMuted = !isMicMuted;
      televetMicBtn.classList.toggle("active", !isMicMuted);
      televetMicBtn.innerHTML = isMicMuted ? '<i class="ri-mic-off-fill"></i>' : '<i class="ri-mic-fill"></i>';
      showToast("Microphone", isMicMuted ? "Your mic is muted." : "Your mic is active.", "info");
    });
  }

  if (televetCamBtn) {
    televetCamBtn.addEventListener("click", () => {
      isCamOff = !isCamOff;
      const pip = document.getElementById("televet-user-pip");
      if (pip) pip.style.opacity = isCamOff ? "0.2" : "1";
      televetCamBtn.innerHTML = isCamOff ? '<i class="ri-camera-off-fill"></i>' : '<i class="ri-camera-fill"></i>';
      showToast("Camera", isCamOff ? "Your camera is off." : "Your camera is transmitting.", "info");
    });
  }

  if (televetChatToggleBtn && televetChatSidebar) {
    televetChatToggleBtn.addEventListener("click", () => {
      const isOpen = televetChatSidebar.style.display !== "none";
      televetChatSidebar.style.display = isOpen ? "none" : "flex";
      televetChatToggleBtn.classList.toggle("active", !isOpen);
    });
  }

  if (televetChatForm && televetChatInput && televetChatStream) {
    televetChatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = televetChatInput.value.trim();
      if (!txt) return;

      const userBubble = document.createElement("div");
      userBubble.className = "chat-bubble user";
      userBubble.innerHTML = `<p>${escapeHtml(txt)}</p><span class="chat-time">Just now</span>`;
      televetChatStream.appendChild(userBubble);
      televetChatInput.value = "";
      televetChatStream.scrollTop = televetChatStream.scrollHeight;

      // Simulated auto-reply from Doctor
      setTimeout(() => {
        const docBubble = document.createElement("div");
        docBubble.className = "chat-bubble doc";
        docBubble.innerHTML = `<strong>${selectedDoctor}</strong><p>Understood. I am adding that observation to the electronic prescription now.</p><span class="chat-time">Just now</span>`;
        televetChatStream.appendChild(docBubble);
        televetChatStream.scrollTop = televetChatStream.scrollHeight;
      }, 900);
    });
  }

  if (televetRxBtn && televetRxDrawer && televetRxContent) {
    televetRxBtn.addEventListener("click", () => {
      const isVisible = televetRxDrawer.style.display !== "none";
      if (!isVisible) {
        televetRxDrawer.style.display = "block";
        televetRxContent.innerHTML = `
          <div style="background: var(--bg-card); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color); color: var(--text-dark);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.8rem; margin-bottom: 0.8rem;">
              <div><strong>Patient:</strong> Milo Alexander (Canine, 3y, 28.5kg)</div>
              <div><strong>Prescribing Vet:</strong> ${selectedDoctor} (BVSc, MS)</div>
            </div>
            <div style="margin-bottom: 0.8rem;">
              <h5 style="color: var(--primary-accent); margin-bottom: 0.3rem;">Prescribed Medications:</h5>
              <p>1. <strong>Apoquel 16mg Tablets:</strong> 1 tablet once daily with food for 14 days (Allergy Management).</p>
              <p>2. <strong>Soothing Hydrocortisone Topical Spray:</strong> Apply 2 sprays to affected skin twice daily.</p>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 0.5rem;">
              Digital Signature: <em>${selectedDoctor} — License #VET-LK-89412</em> • Dispense at Pet Place Central Pharmacy.
            </div>
          </div>
        `;
        showToast("e-Prescription Generated", "Official digital prescription created by doctor.", "success");
      } else {
        televetRxDrawer.style.display = "none";
      }
    });
  }

  if (printRxBtn) {
    printRxBtn.addEventListener("click", () => window.print());
  }

  // =========================================================================
  // 20. Digital Pet Passport & Health Vault
  // =========================================================================
  const DEFAULT_PET_DATA = {
    "pet-milo": {
      name: "Milo Alexander",
      species: "Canine",
      breed: "Golden Retriever",
      age: "March 14, 2023 (3 Years)",
      weight: "28.5 kg • Honey Gold",
      weightKg: 28.5,
      gender: "Male (Neutered)",
      microchip: "ISO 941-0000-2819-4821",
      allergy: "Chicken Protein, Pollen",
      avatar: "🐕",
      vaccines: [
        { name: "Rabies 3-Year", batch: "Batch #RB-2024-91", given: "Jan 15, 2024", due: "Jan 15, 2027", status: "green", statusText: "Valid ✓" },
        { name: "DHPP Core 5-in-1", batch: "Distemper & Parvo", given: "May 10, 2024", due: "May 10, 2025", status: "green", statusText: "Valid ✓" },
        { name: "Bordetella Oral", batch: "Kennel Cough Prevention", given: "Oct 05, 2024", due: "Oct 05, 2025", status: "green", statusText: "Valid ✓" },
        { name: "NexGard Spectra", batch: "Flea, Tick & Heartworm", given: "Last Month", due: "In 7 Days", status: "orange", statusText: "Due Soon ⏳" },
      ]
    },
    "pet-luna": {
      name: "Luna Celestia",
      species: "Feline",
      breed: "Siamese Cat",
      age: "July 20, 2024 (2 Years)",
      weight: "4.2 kg • Seal Point",
      weightKg: 4.2,
      gender: "Female (Spayed)",
      microchip: "ISO 941-0000-7712-3401",
      allergy: "Beef Byproducts",
      avatar: "🐈",
      vaccines: [
        { name: "Feline FVRCP Core", batch: "Rhinotracheitis & Calici", given: "Feb 01, 2024", due: "Feb 01, 2025", status: "green", statusText: "Valid ✓" },
        { name: "Feline Rabies", batch: "Batch #FR-2024-02", given: "Feb 01, 2024", due: "Feb 01, 2027", status: "green", statusText: "Valid ✓" },
        { name: "Revolution Plus", batch: "Flea & Heartworm Drops", given: "2 Weeks Ago", due: "In 16 Days", status: "green", statusText: "Valid ✓" },
      ]
    }
  };

  const PASSPORT_STORAGE_KEY = "pet_place_passport";

  function loadPetPassportData() {
    try {
      const savedData = localStorage.getItem(PASSPORT_STORAGE_KEY);

      if (!savedData) {
        return JSON.parse(JSON.stringify(DEFAULT_PET_DATA));
      }

      const savedPets = JSON.parse(savedData);

      if (!savedPets || typeof savedPets !== "object" || Array.isArray(savedPets)) {
        throw new Error("Invalid passport data format");
      }

      const pets = JSON.parse(JSON.stringify(DEFAULT_PET_DATA));

      // Merge saved defaults and any newly registered pets
      Object.keys(savedPets).forEach((petId) => {
        const savedPet = savedPets[petId];

        if (savedPet && typeof savedPet === "object" && !Array.isArray(savedPet)) {
          pets[petId] = {
            ...(pets[petId] || {}),
            ...savedPet,
            vaccines: Array.isArray(savedPet.vaccines)
              ? savedPet.vaccines
              : (pets[petId] ? pets[petId].vaccines : [])
          };
        }
      });

      return pets;
    } catch (error) {
      console.warn("Unable to load saved pet passport data:", error);
      return JSON.parse(JSON.stringify(DEFAULT_PET_DATA));
    }
  }

  function savePetPassportData() {
    try {
      localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(PET_DATA));
      return true;
    } catch (error) {
      console.error("Unable to save pet passport data:", error);
      return false;
    }
  }

  let PET_DATA = loadPetPassportData();

  let activePetId = "pet-milo";
  const petSelectorContainer = document.getElementById("passport-pet-selector");
  const ppTabBtns = document.querySelectorAll(".pp-tab-btn");
  const ppTabContents = document.querySelectorAll(".pp-tab-content");
  const editPassportBtn = document.getElementById("btn-edit-passport");
  const editPassportBookletBtn = document.getElementById("btn-edit-passport-booklet");
  const passportEditModal = document.getElementById("passport-edit-modal");
  const closePassportModal = document.getElementById("close-passport-modal");
  const passportEditForm = document.getElementById("passport-edit-form");
  const passportRegisterModal = document.getElementById("passport-register-modal");
  const closeRegisterModalBtn = document.getElementById("close-register-modal");
  const passportRegisterForm = document.getElementById("passport-register-form");
  const printPassportBtn = document.getElementById("btn-print-passport");
  const downloadCertBtn = document.getElementById("btn-download-cert");
  const addVaccineBtn = document.getElementById("btn-add-vaccine");

  function renderPetSelectorChips() {
    if (!petSelectorContainer) return;

    let html = "";
    Object.keys(PET_DATA).forEach((petId) => {
      const pet = PET_DATA[petId];
      const isActive = petId === activePetId;
      html += `
        <button type="button" class="pet-select-chip ${isActive ? 'active' : ''}" data-pet-id="${petId}">
          <span class="chip-avatar">${pet.avatar || '🐾'}</span>
          <div>
            <strong>${escapeHtml(pet.name)}</strong>
            <small>${escapeHtml(pet.breed || pet.species || '')}</small>
          </div>
        </button>
      `;
    });

    html += `
      <button type="button" class="pet-select-chip chip-add" id="btn-add-pet">
        <i class="ri-add-line"></i>
        <span>Register Pet</span>
      </button>
    `;

    petSelectorContainer.innerHTML = html;

    // Attach switch listener to all pet chips
    petSelectorContainer.querySelectorAll(".pet-select-chip[data-pet-id]").forEach(chip => {
      chip.addEventListener("click", () => {
        const pid = chip.getAttribute("data-pet-id");
        if (pid && PET_DATA[pid]) {
          renderPetPassport(pid);
          renderPetSelectorChips();
          showToast("Pet Switched", `Viewing health passport for ${PET_DATA[pid].name}.`, "info");
        }
      });
    });

    // Attach click listener to Register Pet button
    const addPetBtn = document.getElementById("btn-add-pet");
    if (addPetBtn) {
      addPetBtn.addEventListener("click", openRegisterModal);
    }
  }

  function renderPetPassport(petId) {
    const pet = PET_DATA[petId];
    if (!pet) return;
    activePetId = petId;

    const nameEl = document.getElementById("pp-name");
    const chipEl = document.getElementById("pp-microchip");
    const breedEl = document.getElementById("pp-breed");
    const ageEl = document.getElementById("pp-age");
    const genderEl = document.getElementById("pp-gender");
    const weightEl = document.getElementById("pp-weight");
    const allergyEl = document.getElementById("pp-allergy");
    const avatarEl = document.getElementById("passport-avatar-emoji");
    const tbody = document.getElementById("pp-vaccines-tbody");

    if (nameEl) nameEl.textContent = pet.name;
    if (chipEl) chipEl.textContent = pet.microchip;
    if (breedEl) breedEl.textContent = `${pet.species} / ${pet.breed}`;
    if (ageEl) ageEl.textContent = pet.age;
    if (genderEl) genderEl.textContent = pet.gender;
    if (weightEl) weightEl.textContent = pet.weight;
    if (allergyEl) allergyEl.innerHTML = `<i class="ri-alarm-warning-line"></i> Allergy: ${pet.allergy}`;
    if (avatarEl) avatarEl.textContent = pet.avatar || "🐾";

    if (tbody && pet.vaccines) {
      tbody.innerHTML = pet.vaccines.map(v => `
        <tr>
          <td><strong>${v.name}</strong><br><small>${v.batch}</small></td>
          <td>${v.given}</td>
          <td>${v.due}</td>
          <td><span class="status-pill ${v.status}">${v.statusText}</span></td>
        </tr>
      `).join("");
    }
  }

  // Initial render of chips and passport
  renderPetSelectorChips();
  renderPetPassport(activePetId);

  ppTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      ppTabBtns.forEach(b => b.classList.remove("active"));
      ppTabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const targetId = `tab-pp-${btn.getAttribute("data-tab")}`;
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");
    });
  });

  // Open Edit Profile Modal
  function openEditModal() {
    const pet = PET_DATA[activePetId];
    if (pet && passportEditModal) {
      const nInput = document.getElementById("edit-pp-name");
      const sSelect = document.getElementById("edit-pp-species");
      const bInput = document.getElementById("edit-pp-breed");
      const aInput = document.getElementById("edit-pp-age");
      const wInput = document.getElementById("edit-pp-weight");
      const cInput = document.getElementById("edit-pp-microchip");
      const alInput = document.getElementById("edit-pp-allergy");

      if (nInput) nInput.value = pet.name || "";
      if (sSelect) sSelect.value = pet.species || "Canine";
      if (bInput) bInput.value = pet.breed || "";
      if (aInput) aInput.value = pet.age || "";
      if (wInput) wInput.value = pet.weightKg || "";
      if (cInput) cInput.value = pet.microchip || "";
      if (alInput) alInput.value = pet.allergy || "";

      passportEditModal.classList.add("open");
    }
  }

  if (editPassportBtn) {
    editPassportBtn.addEventListener("click", openEditModal);
  }

  if (editPassportBookletBtn) {
    editPassportBookletBtn.addEventListener("click", openEditModal);
  }

  if (closePassportModal && passportEditModal) {
    closePassportModal.addEventListener("click", () => passportEditModal.classList.remove("open"));
  }

  if (passportEditModal) {
    passportEditModal.addEventListener("click", (e) => {
      if (e.target === passportEditModal) passportEditModal.classList.remove("open");
    });
  }

  // Handle Edit Form Submission
  if (passportEditForm) {
    passportEditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pet = PET_DATA[activePetId];
      if (pet) {
        pet.name = document.getElementById("edit-pp-name").value.trim();
        const spec = document.getElementById("edit-pp-species").value;
        pet.species = spec;
        if (spec === "Canine") pet.avatar = "🐕";
        else if (spec === "Feline") pet.avatar = "🐈";
        else if (spec === "Avian" || spec === "Bird") pet.avatar = "🦜";
        else if (spec === "Rabbit") pet.avatar = "🐇";
        else pet.avatar = "🐾";

        pet.breed = document.getElementById("edit-pp-breed").value.trim();
        pet.age = document.getElementById("edit-pp-age").value.trim();
        pet.weightKg = parseFloat(document.getElementById("edit-pp-weight").value) || pet.weightKg;
        pet.weight = `${pet.weightKg} kg`;
        pet.microchip = document.getElementById("edit-pp-microchip").value.trim();
        pet.allergy = document.getElementById("edit-pp-allergy").value.trim();

        savePetPassportData();
        renderPetSelectorChips();
        renderPetPassport(activePetId);
      }
      if (passportEditModal) passportEditModal.classList.remove("open");
      showToast("Profile Updated 🎉", "Pet health passport details successfully saved.", "success");
    });
  }

  // Open Register New Pet Modal
  function openRegisterModal() {
    if (passportRegisterModal) {
      if (passportRegisterForm) passportRegisterForm.reset();
      passportRegisterModal.classList.add("open");
    }
  }

  function closeRegisterModal() {
    if (passportRegisterModal) passportRegisterModal.classList.remove("open");
  }

  if (closeRegisterModalBtn) {
    closeRegisterModalBtn.addEventListener("click", closeRegisterModal);
  }

  if (passportRegisterModal) {
    passportRegisterModal.addEventListener("click", (e) => {
      if (e.target === passportRegisterModal) closeRegisterModal();
    });
  }

  // Handle Register New Pet Submission
  if (passportRegisterForm) {
    passportRegisterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-pp-name").value.trim();
      const species = document.getElementById("reg-pp-species").value;
      const breed = document.getElementById("reg-pp-breed").value.trim() || species;
      const age = document.getElementById("reg-pp-age").value.trim() || "1 Year";
      const weightVal = parseFloat(document.getElementById("reg-pp-weight").value) || 10.0;
      const gender = document.getElementById("reg-pp-gender").value;
      const color = document.getElementById("reg-pp-color").value.trim() || "Standard";
      let microchip = document.getElementById("reg-pp-microchip").value.trim();
      if (!microchip) {
        const randA = Math.floor(1000 + Math.random() * 9000);
        const randB = Math.floor(1000 + Math.random() * 9000);
        microchip = `ISO 941-0000-${randA}-${randB}`;
      }
      const allergy = document.getElementById("reg-pp-allergy").value.trim() || "None reported";

      let avatar = "🐾";
      let starterVaccines = [];

      if (species === "Canine") {
        avatar = "🐕";
        starterVaccines = [
          { name: "Rabies 3-Year", batch: "Batch #RB-2026-REG", given: "Today", due: "In 3 Years", status: "green", statusText: "Valid ✓" },
          { name: "DHPP Core 5-in-1", batch: "Distemper & Parvo", given: "Today", due: "In 1 Year", status: "green", statusText: "Valid ✓" },
          { name: "Bordetella Oral", batch: "Kennel Cough Guard", given: "Today", due: "In 1 Year", status: "green", statusText: "Valid ✓" }
        ];
      } else if (species === "Feline") {
        avatar = "🐈";
        starterVaccines = [
          { name: "Feline FVRCP Core", batch: "Rhinotracheitis & Calici", given: "Today", due: "In 1 Year", status: "green", statusText: "Valid ✓" },
          { name: "Feline Rabies", batch: "Batch #FR-2026-REG", given: "Today", due: "In 3 Years", status: "green", statusText: "Valid ✓" },
          { name: "Revolution Plus Drops", batch: "Flea & Parasite Guard", given: "Today", due: "In 30 Days", status: "green", statusText: "Valid ✓" }
        ];
      } else if (species === "Bird") {
        avatar = "🦜";
        starterVaccines = [
          { name: "Avian Polyomavirus", batch: "Batch #AP-2026", given: "Today", due: "In 1 Year", status: "green", statusText: "Valid ✓" },
          { name: "General Wellness & Feather Check", batch: "Clinical Screen", given: "Today", due: "In 6 Months", status: "green", statusText: "Valid ✓" }
        ];
      } else if (species === "Rabbit") {
        avatar = "🐇";
        starterVaccines = [
          { name: "Rabbit Haemorrhagic Disease (RHDV2)", batch: "Batch #RHD-2026", given: "Today", due: "In 1 Year", status: "green", statusText: "Valid ✓" },
          { name: "Myxomatosis Prevention", batch: "Bio-Guard", given: "Today", due: "In 1 Year", status: "green", statusText: "Valid ✓" }
        ];
      } else {
        avatar = "🐾";
        starterVaccines = [
          { name: "General Physical & Parasite Screen", batch: "Clinic Check", given: "Today", due: "In 1 Year", status: "green", statusText: "Valid ✓" }
        ];
      }

      const newPetId = "pet-" + Date.now();
      const newPet = {
        name: name,
        species: species,
        breed: breed,
        age: age,
        weight: `${weightVal} kg • ${color}`,
        weightKg: weightVal,
        gender: gender,
        microchip: microchip,
        allergy: allergy,
        avatar: avatar,
        vaccines: starterVaccines
      };

      PET_DATA[newPetId] = newPet;
      savePetPassportData();
      activePetId = newPetId;
      renderPetSelectorChips();
      renderPetPassport(newPetId);
      closeRegisterModal();

      showToast("Pet Registered! 🎉", `Official Pet Health Passport issued for ${name}.`, "success");
    });
  }

  if (printPassportBtn) {
    printPassportBtn.addEventListener("click", () => {
      window.print();
    });
  }

  if (downloadCertBtn) {
    downloadCertBtn.addEventListener("click", () => {
      showToast("Certificate Ready 📄", `Official IATA Travel Certificate for ${PET_DATA[activePetId].name} ready for download.`, "success");
      setTimeout(() => window.print(), 500);
    });
  }

  if (addVaccineBtn) {
    addVaccineBtn.addEventListener("click", () => {
      const vName = prompt("Enter Vaccine or Treatment Name (e.g. Kennel Cough Booster, Deworming):", "Deworming Protocol");
      if (vName) {
        const pet = PET_DATA[activePetId];
        if (pet) {
          pet.vaccines.unshift({
            name: vName,
            batch: "Batch #VSL-2026-NEW",
            given: "Today",
            due: "In 6 Months",
            status: "green",
            statusText: "Valid ✓"
          });
          renderPetPassport(activePetId);
          savePetPassportData();
          showToast("Vaccine Logged 💉", `${vName} logged to official passport!`, "success");
        }
      }
    });
  }

  // =========================================================================
  // 21. PetRx Medication Tracker
  // =========================================================================
  let DEFAULT_MEDS = [
    { id: "med-1", name: "Apoquel 16mg", category: "Allergy", time: "08:00 AM", dosage: "1 Tablet", withFood: "Give with breakfast", taken: true, takenTime: "8:12 AM" },
    { id: "med-2", name: "NexGard Spectra Chews", category: "Flea & Tick", time: "01:00 PM", dosage: "1 Soft Chew", withFood: "Monthly dose with treat", taken: false, takenTime: null },
    { id: "med-3", name: "Probiotic Digestive Paste", category: "Supplement", time: "07:30 PM", dosage: "3 ml Paste", withFood: "Give with dinner", taken: false, takenTime: null },
  ];

  let petMeds = JSON.parse(localStorage.getItem("pet_place_meds")) || DEFAULT_MEDS;
  const medScheduleList = document.getElementById("med-schedule-list");
  const medProgressFill = document.getElementById("med-progress-fill");
  const medProgressText = document.getElementById("med-progress-text");
  const openAddMedBtn = document.getElementById("btn-open-add-med");
  const medAddModal = document.getElementById("med-add-modal");
  const closeMedModal = document.getElementById("close-med-modal");
  const medAddForm = document.getElementById("med-add-form");

  function renderMedSchedule() {
    if (!medScheduleList) return;
    const completedCount = petMeds.filter(m => m.taken).length;
    const totalCount = petMeds.length;
    const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    if (medProgressFill) medProgressFill.style.width = `${pct}%`;
    if (medProgressText) medProgressText.textContent = `${completedCount} of ${totalCount} Completed (${pct}%)`;

    medScheduleList.innerHTML = petMeds.map(m => `
      <div class="med-dose-card ${m.taken ? "taken" : ""}">
        <div class="dose-left">
          <div class="dose-time-pill">${m.time}</div>
          <div class="dose-info">
            <h4>${m.name} <span class="dose-category-tag">${m.category}</span></h4>
            <p><strong>Dosage:</strong> ${m.dosage} • ${m.withFood} ${m.takenTime ? `• <em>Taken at ${m.takenTime}</em>` : ""}</p>
          </div>
        </div>
        <div>
          ${m.taken
            ? `<span class="dose-action-btn completed"><i class="ri-check-line"></i> Dose Taken</span>`
            : `<button type="button" class="dose-action-btn pending btn-mark-med-taken" data-med-id="${m.id}"><i class="ri-checkbox-circle-line"></i> Mark Taken</button>`
          }
        </div>
      </div>
    `).join("");

    // Wire Mark Taken
    medScheduleList.querySelectorAll(".btn-mark-med-taken").forEach(btn => {
      btn.addEventListener("click", () => {
        const mid = btn.getAttribute("data-med-id");
        const found = petMeds.find(m => m.id === mid);
        if (found) {
          found.taken = true;
          const now = new Date();
          found.takenTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          localStorage.setItem("pet_place_meds", JSON.stringify(petMeds));
          renderMedSchedule();
          showToast("Dose Completed! 🐾", `Great job giving ${found.name} on time!`, "success");
        }
      });
    });
  }

  renderMedSchedule();

  if (openAddMedBtn && medAddModal) {
    openAddMedBtn.addEventListener("click", () => medAddModal.classList.add("open"));
  }
  if (closeMedModal && medAddModal) {
    closeMedModal.addEventListener("click", () => medAddModal.classList.remove("open"));
  }

  if (medAddForm) {
    medAddForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("med-input-name").value.trim();
      const category = document.getElementById("med-input-category").value;
      const dosage = document.getElementById("med-input-dosage").value.trim();
      const timeVal = document.getElementById("med-input-time").value;
      const withFood = document.getElementById("med-input-withfood").value;

      petMeds.push({
        id: "med-" + Date.now(),
        name,
        category,
        time: timeVal,
        dosage,
        withFood,
        taken: false,
        takenTime: null
      });

      localStorage.setItem("pet_place_meds", JSON.stringify(petMeds));
      renderMedSchedule();
      medAddForm.reset();
      if (medAddModal) medAddModal.classList.remove("open");
      showToast("Medication Scheduled 💊", `${name} added to daily dose reminders.`, "success");
    });
  }

  // =========================================================================
  // 22. PawAlert Lost & Found Community Bulletin
  // =========================================================================
  const lfTabs = document.querySelectorAll(".lf-tab-btn");
  const lfSearchInput = document.getElementById("lf-search-input");
  const lfGrid = document.getElementById("lostfound-grid");
  const openReportPetBtn = document.getElementById("btn-open-report-pet");
  const lfReportModal = document.getElementById("lost-found-report-modal");
  const closeLfModal = document.getElementById("close-lf-modal");
  const lfReportForm = document.getElementById("lf-report-form");
  const flyerModal = document.getElementById("flyer-modal");
  const closeFlyerModal = document.getElementById("close-flyer-modal");
  const btnCloseFlyerView = document.getElementById("btn-close-flyer-view");
  const btnTriggerPrintFlyer = document.getElementById("btn-trigger-print-flyer");

  lfTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      lfTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.getAttribute("data-filter");
      const cards = lfGrid ? lfGrid.querySelectorAll(".lf-card") : [];

      cards.forEach(card => {
        const st = card.getAttribute("data-status");
        if (filter === "all" || st === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  if (lfSearchInput && lfGrid) {
    lfSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cards = lfGrid.querySelectorAll(".lf-card");
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? "flex" : "none";
      });
    });
  }

  function wireFlyerButtons() {
    document.querySelectorAll(".lf-btn-flyer").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-pet-name");
        const breed = btn.getAttribute("data-breed");
        const loc = btn.getAttribute("data-location");
        const reward = btn.getAttribute("data-reward");
        const phone = btn.getAttribute("data-phone");
        const img = btn.getAttribute("data-img");

        const fName = document.getElementById("flyer-name");
        const fBreed = document.getElementById("flyer-breed");
        const fDesc = document.getElementById("flyer-desc");
        const fReward = document.getElementById("flyer-reward-banner");
        const fPhone = document.getElementById("flyer-phone");
        const fImg = document.getElementById("flyer-img");

        if (fName) fName.textContent = name.toUpperCase();
        if (fBreed) fBreed.textContent = breed;
        if (fDesc) fDesc.textContent = `Last seen in ${loc}. Please check backyards, garages, and neighborhood parks. Call immediately!`;
        if (fReward) fReward.textContent = `${reward.toUpperCase()} FOR SAFE RETURN`;
        if (fPhone) fPhone.textContent = phone;
        if (fImg && img) fImg.src = img;

        if (flyerModal) flyerModal.classList.add("open");
      });
    });
  }

  wireFlyerButtons();

  if (closeFlyerModal && flyerModal) closeFlyerModal.addEventListener("click", () => flyerModal.classList.remove("open"));
  if (btnCloseFlyerView && flyerModal) btnCloseFlyerView.addEventListener("click", () => flyerModal.classList.remove("open"));
  if (btnTriggerPrintFlyer) {
    btnTriggerPrintFlyer.addEventListener("click", () => window.print());
  }

  if (openReportPetBtn && lfReportModal) {
    openReportPetBtn.addEventListener("click", () => lfReportModal.classList.add("open"));
  }
  if (closeLfModal && lfReportModal) {
    closeLfModal.addEventListener("click", () => lfReportModal.classList.remove("open"));
  }

  if (lfReportForm && lfGrid) {
    lfReportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const type = document.getElementById("lf-input-type").value;
      const species = document.getElementById("lf-input-species").value;
      const name = document.getElementById("lf-input-name").value.trim();
      const breed = document.getElementById("lf-input-breed").value.trim();
      const reward = document.getElementById("lf-input-reward").value.trim() || "Gratitude";
      const location = document.getElementById("lf-input-location").value.trim();
      const phone = document.getElementById("lf-input-phone").value.trim();
      const desc = document.getElementById("lf-input-desc").value.trim();

      const newCard = document.createElement("div");
      newCard.className = "lf-card";
      newCard.setAttribute("data-status", type);
      newCard.innerHTML = `
        <div class="lf-card__img-box">
          <span class="lf-badge ${type}">${type === "lost" ? "🚨 MISSING / LOST" : "🐾 FOUND & SAFE"}</span>
          ${reward !== "Gratitude" ? `<span class="lf-reward-tag">Reward: ${reward}</span>` : ""}
          <img src="assets/about-2.jpg" alt="${name}" />
        </div>
        <div class="lf-card__body">
          <div class="lf-card__meta">
            <h4>${name} (${species})</h4>
            <span class="lf-date"><i class="ri-time-line"></i> Just Now</span>
          </div>
          <p class="lf-desc">${desc || breed}</p>
          <div class="lf-info-chips">
            <span><i class="ri-map-pin-line"></i> ${location}</span>
            <span><i class="ri-phone-line"></i> Contact: ${phone}</span>
          </div>
          <div class="lf-card__actions">
            <button type="button" class="btn__outline lf-btn-flyer" data-pet-name="${name}" data-breed="${breed}" data-location="${location}" data-reward="${reward}" data-phone="${phone}" data-img="assets/about-2.jpg">
              <i class="ri-printer-line"></i> Print Flyer
            </button>
            <a href="tel:${phone}" class="btn__primary lf-btn-contact">
              <i class="ri-phone-fill"></i> Contact
            </a>
          </div>
        </div>
      `;

      lfGrid.prepend(newCard);
      wireFlyerButtons();
      lfReportForm.reset();
      if (lfReportModal) lfReportModal.classList.remove("open");
      showToast("PawAlert Broadcasted 📢", `Alert for ${name} has been shared across our community bulletin.`, "success");
    });
  }

  // Initial price sync on page ready
  updateAllPricesOnPage();

});
