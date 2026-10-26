import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, CATEGORIES, COLLECTIONS, INITIAL_REVIEWS, INITIAL_SETTINGS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Load initial states from localStorage if available
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('maak_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('maak_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('maak_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('maak_orders');
    return saved ? JSON.parse(saved) : [
      {
        orderId: "MD2026100001",
        customerName: "Pooja Verma",
        whatsapp: "9876543210",
        email: "pooja@example.com",
        address: "Flat 4B, Emerald Heights, MG Road, Kochi, 682016",
        items: [
          { id: "MD-ER-001", name: "Royal Crimson Kundan Jhumka Earrings", price: 199, quantity: 2, selectedColor: "Crimson Red" }
        ],
        amount: 398,
        deliveryCharge: 0,
        totalAmount: 398,
        paymentStatus: "Paid",
        orderStatus: "Processing",
        paymentMethod: "Razorpay Online",
        razorpayOrderId: "order_Kavitha1001",
        razorpayPaymentId: "pay_Kavitha1001_succ",
        date: "2026-10-01 14:30"
      }
    ];
  });

  const [customOrders, setCustomOrders] = useState(() => {
    const saved = localStorage.getItem('maak_custom_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [bulkOrders, setBulkOrders] = useState(() => {
    const saved = localStorage.getItem('maak_bulk_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('maak_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('maak_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('maak_admin_logged_in') === 'true';
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('maak_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('maak_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('maak_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('maak_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('maak_custom_orders', JSON.stringify(customOrders));
  }, [customOrders]);

  useEffect(() => {
    localStorage.setItem('maak_bulk_orders', JSON.stringify(bulkOrders));
  }, [bulkOrders]);

  useEffect(() => {
    localStorage.setItem('maak_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('maak_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('maak_admin_logged_in', isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  // Cart Operations
  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    setCart((prevCart) => {
      const colorToUse = selectedColor || (product.availableColors ? product.availableColors[0] : 'Default');
      const sizeToUse = selectedSize || (product.availableSizes ? product.availableSizes[0] : 'Standard');
      
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === colorToUse && item.selectedSize === sizeToUse
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity, selectedColor: colorToUse, selectedSize: sizeToUse }];
      }
    });
  };

  const removeFromCart = (id, selectedColor, selectedSize) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      )
    );
  };

  const updateCartQuantity = (id, selectedColor, selectedSize, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, selectedColor, selectedSize);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartDeliveryCharge = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= settings.freeDeliveryThreshold ? 0 : settings.standardDeliveryCharge;
  };

  const getCartGrandTotal = () => {
    return getCartSubtotal() + getCartDeliveryCharge();
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Order Operations
  const placeOrder = (orderDetails) => {
    const orderNumber = `MD${new Date().getFullYear()}${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleString(),
      orderStatus: "Processing",
      paymentStatus: orderDetails.paymentMethod === "Cash on Delivery" ? "Pending Payment" : "Paid",
      items: orderDetails.items || cart,
      subtotal: orderDetails.subtotal || getCartSubtotal(),
      deliveryCharge: orderDetails.deliveryCharge || getCartDeliveryCharge(),
      totalAmount: orderDetails.totalAmount || getCartGrandTotal(),
      customerName: orderDetails.customerName,
      whatsapp: orderDetails.whatsapp,
      email: orderDetails.email,
      address: `${orderDetails.house}, ${orderDetails.street}, ${orderDetails.area}, ${orderDetails.city}, ${orderDetails.state} - ${orderDetails.pincode}`,
      paymentMethod: orderDetails.paymentMethod,
      razorpayOrderId: orderDetails.razorpayOrderId || null,
      razorpayPaymentId: orderDetails.razorpayPaymentId || null,
      notes: orderDetails.notes || ""
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, newPaymentStatus = null) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.orderId === orderId
          ? {
              ...ord,
              orderStatus: newStatus,
              ...(newPaymentStatus ? { paymentStatus: newPaymentStatus } : {})
            }
          : ord
      )
    );
  };

  // Admin Product Management
  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // WhatsApp Message Generators
  const generateSingleProductWhatsAppUrl = (product, quantity = 1, color = null) => {
    const phone = settings.whatsappNumber;
    const colorText = color || product.color || 'Standard';
    const total = product.price * quantity;
    const message = `Hello MAAK DESIGNS,

I would like to order:

Product: ${product.name}
Product Code: ${product.id}
Color: ${colorText}
Quantity: ${quantity}
Price: ₹${product.price} each
Total: ₹${total}

Customer Name: 
Delivery Address: 

Thank you.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generateCartWhatsAppUrl = (customerInfo = {}) => {
    const phone = settings.whatsappNumber;
    const itemsText = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.id})\n   Color: ${item.selectedColor} | Qty: ${item.quantity} | Price: ₹${item.price} each`
      )
      .join('\n\n');

    const subtotal = getCartSubtotal();
    const delivery = getCartDeliveryCharge();
    const total = getCartGrandTotal();

    const name = customerInfo.customerName || '[Your Name]';
    const address = customerInfo.address || '[Your Delivery Address]';

    const message = `Hello MAAK DESIGNS,

I would like to place an order for the following items:

${itemsText}

Subtotal: ₹${subtotal}
Delivery Charge: ${delivery === 0 ? 'FREE' : `₹${delivery}`}
Grand Total: ₹${total}

Customer Name: ${name}
Delivery Address: ${address}

Thank you!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generateCustomOrderWhatsAppUrl = (formData) => {
    const phone = settings.whatsappNumber;
    const message = `Hello MAAK DESIGNS,

I would like to request a Customized Jewellery order:

Name: ${formData.name}
WhatsApp Number: ${formData.whatsapp}
Email: ${formData.email || 'N/A'}
Jewellery Type: ${formData.jewelleryType}
Preferred Colour: ${formData.preferredColour}
Preferred Size: ${formData.preferredSize || 'Standard'}
Quantity: ${formData.quantity}
Budget Range: ${formData.budgetRange}
Preferred Delivery Date: ${formData.deliveryDate || 'Flexible'}

Customization Details:
${formData.details}

Thank you!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generateBulkOrderWhatsAppUrl = (formData) => {
    const phone = settings.whatsappNumber;
    const message = `Hello MAAK DESIGNS,

I would like to request a Bulk / Wholesale Order:

Name: ${formData.name}
Business Name: ${formData.businessName || 'N/A'}
WhatsApp Number: ${formData.whatsapp}
Product / Interest: ${formData.product}
Estimated Quantity: ${formData.quantity}
Expected Budget: ${formData.budget}
Required Date: ${formData.requiredDate || 'As soon as possible'}

Message / Details:
${formData.message}

Thank you!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generateOrderConfirmationWhatsAppUrl = (order) => {
    const phone = settings.whatsappNumber;
    const message = `Hello MAAK DESIGNS,

My order has been placed successfully.

Order No: ${order.orderId}
Amount Paid: ₹${order.totalAmount}
Payment ID: ${order.razorpayPaymentId || 'COD / Online Verified'}

Please confirm my order.

Thank you.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories: CATEGORIES,
        collections: COLLECTIONS,
        reviews,
        settings,
        cart,
        wishlist,
        orders,
        customOrders,
        bulkOrders,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartSubtotal,
        getCartDeliveryCharge,
        getCartGrandTotal,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        setSettings,
        setReviews,
        setCustomOrders,
        setBulkOrders,
        generateSingleProductWhatsAppUrl,
        generateCartWhatsAppUrl,
        generateCustomOrderWhatsAppUrl,
        generateBulkOrderWhatsAppUrl,
        generateOrderConfirmationWhatsAppUrl
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
