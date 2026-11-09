// Temporary placeholder images (we can replace them with real ones later)
const img = (text) =>
  `https://placehold.co/400x300/17324d/ffffff?text=${encodeURIComponent(text)}`;

export const products = [
  // ===== Audio =====
  { id: 1, name: "Wireless Headphones", description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.", price: 35, stockQuantity: 12, category: "Audio", image: img("Headphones"), isActive: true, isFeatured: true, createdAt: "2026-10-01" },
  { id: 2, name: "Bluetooth Speaker", description: "Portable waterproof speaker with deep bass and 12-hour playtime.", price: 45, stockQuantity: 8, category: "Audio", image: img("Speaker"), isActive: true, isFeatured: false, createdAt: "2026-09-15" },
  { id: 3, name: "Wireless Earbuds", description: "Compact earbuds with charging case and touch controls.", price: 60, stockQuantity: 3, category: "Audio", image: img("Earbuds"), isActive: true, isFeatured: true, createdAt: "2026-10-20" },
  { id: 4, name: "Studio Microphone", description: "USB condenser microphone for streaming, podcasts and recording.", price: 85, stockQuantity: 0, category: "Audio", image: img("Microphone"), isActive: true, isFeatured: false, createdAt: "2026-08-10" },

  // ===== Laptops =====
  { id: 5, name: "Ultrabook Pro 14", description: "Lightweight 14-inch laptop with 16GB RAM and 512GB SSD.", price: 899, stockQuantity: 5, category: "Laptops", image: img("Ultrabook"), isActive: true, isFeatured: true, createdAt: "2026-10-25" },
  { id: 6, name: "Gaming Laptop X17", description: "17-inch gaming laptop with RTX graphics and 165Hz display.", price: 1499, stockQuantity: 2, category: "Laptops", image: img("Gaming Laptop"), isActive: true, isFeatured: false, createdAt: "2026-09-01" },
  { id: 7, name: "Student Laptop 15", description: "Affordable 15-inch laptop, perfect for study and daily tasks.", price: 450, stockQuantity: 15, category: "Laptops", image: img("Student Laptop"), isActive: true, isFeatured: false, createdAt: "2026-07-12" },
  { id: 8, name: "Business Laptop 13", description: "Secure and durable laptop with fingerprint reader and long battery.", price: 1100, stockQuantity: 7, category: "Laptops", image: img("Business Laptop"), isActive: true, isFeatured: false, createdAt: "2026-10-05" },

  // ===== Phones =====
  { id: 9, name: "Smartphone A55", description: "6.5-inch AMOLED display, 128GB storage and triple camera.", price: 320, stockQuantity: 20, category: "Phones", image: img("Smartphone A55"), isActive: true, isFeatured: true, createdAt: "2026-10-28" },
  { id: 10, name: "Smartphone Pro Max", description: "Flagship phone with 256GB storage and pro camera system.", price: 1050, stockQuantity: 4, category: "Phones", image: img("Pro Max"), isActive: true, isFeatured: false, createdAt: "2026-11-01" },
  { id: 11, name: "Budget Phone C10", description: "Reliable everyday phone with big battery and dual SIM.", price: 120, stockQuantity: 0, category: "Phones", image: img("Phone C10"), isActive: true, isFeatured: false, createdAt: "2026-06-20" },
  { id: 12, name: "Foldable Phone Z", description: "Innovative foldable phone with a large inner display.", price: 1350, stockQuantity: 6, category: "Phones", image: img("Foldable"), isActive: true, isFeatured: false, createdAt: "2026-09-30" },

  // ===== Accessories =====
  { id: 13, name: "Mechanical Keyboard", description: "RGB mechanical keyboard with blue switches.", price: 55, stockQuantity: 18, category: "Accessories", image: img("Keyboard"), isActive: true, isFeatured: false, createdAt: "2026-08-25" },
  { id: 14, name: "Wireless Mouse", description: "Ergonomic wireless mouse with silent clicks.", price: 18, stockQuantity: 30, category: "Accessories", image: img("Mouse"), isActive: true, isFeatured: false, createdAt: "2026-07-01" },
  { id: 15, name: "USB-C Hub 7-in-1", description: "Expand your laptop with HDMI, USB and SD card ports.", price: 29, stockQuantity: 25, category: "Accessories", image: img("USB-C Hub"), isActive: true, isFeatured: true, createdAt: "2026-10-10" },
  { id: 16, name: "Power Bank 20000mAh", description: "Fast-charging power bank for phones and tablets.", price: 25, stockQuantity: 14, category: "Accessories", image: img("Power Bank"), isActive: true, isFeatured: false, createdAt: "2026-11-03" },

  // ===== Gaming =====
  { id: 17, name: "Game Controller", description: "Wireless controller compatible with PC and consoles.", price: 40, stockQuantity: 10, category: "Gaming", image: img("Controller"), isActive: true, isFeatured: true, createdAt: "2026-10-15" },
  { id: 18, name: "Gaming Headset", description: "Surround sound headset with noise-cancelling mic.", price: 65, stockQuantity: 9, category: "Gaming", image: img("Gaming Headset"), isActive: true, isFeatured: false, createdAt: "2026-09-10" },
  { id: 19, name: "Gaming Monitor 27\"", description: "27-inch 144Hz monitor with 1ms response time.", price: 280, stockQuantity: 5, category: "Gaming", image: img("Monitor"), isActive: true, isFeatured: false, createdAt: "2026-11-05" },
  { id: 20, name: "Gaming Chair", description: "Ergonomic chair with lumbar support and adjustable armrests.", price: 190, stockQuantity: 11, category: "Gaming", image: img("Gaming Chair"), isActive: true, isFeatured: false, createdAt: "2026-08-01" },
];