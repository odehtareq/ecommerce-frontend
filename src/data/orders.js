export const orders = [
  {
    id: "ORD-1001",
    userId: 1,
    customerName: "Ahmad Customer",
    date: "2026-10-02",
    status: "delivered",
    items: [
      { productId: 1, name: "Wireless Headphones", price: 35, quantity: 1 },
      { productId: 14, name: "Wireless Mouse", price: 18, quantity: 2 },
    ],
    total: 71,
  },
  {
    id: "ORD-1002",
    userId: 1,
    customerName: "Ahmad Customer",
    date: "2026-10-15",
    status: "shipped",
    items: [{ productId: 9, name: "Smartphone A55", price: 320, quantity: 1 }],
    total: 320,
  },
  {
    id: "ORD-1003",
    userId: 1,
    customerName: "Ahmad Customer",
    date: "2026-10-28",
    status: "processing",
    items: [
      { productId: 13, name: "Mechanical Keyboard", price: 55, quantity: 1 },
      { productId: 15, name: "USB-C Hub 7-in-1", price: 29, quantity: 1 },
    ],
    total: 84,
  },
  {
    id: "ORD-1004",
    userId: 1,
    customerName: "Ahmad Customer",
    date: "2026-11-03",
    status: "pending",
    items: [{ productId: 17, name: "Game Controller", price: 40, quantity: 2 }],
    total: 80,
  },
  {
    id: "ORD-1005",
    userId: 1,
    customerName: "Ahmad Customer",
    date: "2026-09-20",
    status: "cancelled",
    items: [{ productId: 2, name: "Bluetooth Speaker", price: 45, quantity: 1 }],
    total: 50,
  },
  {
    id: "ORD-1006",
    userId: 3,
    customerName: "Lina Haddad",
    date: "2026-11-06",
    status: "pending",
    items: [{ productId: 5, name: "Ultrabook Pro 14", price: 899, quantity: 1 }],
    total: 899,
  },
];

export const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];