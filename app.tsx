import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, ShoppingBag, Minus, Plus, Trash2, 
  MapPin, User, Phone, CreditCard, ArrowRight, X, Check,
  Sparkles, Truck, Heart, Star, ChevronRight
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Emerald Velvet 3-Piece", price: 4500, oldPrice: 6000, category: "3-piece", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
  { id: 2, name: "Azure Sky 2-Piece Lawn", price: 2800, oldPrice: 3500, category: "2-piece", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
  { id: 3, name: "Rose Garden Embroidered", price: 5200, oldPrice: 6500, category: "3-piece", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 4, name: "Midnight Noir Formal", price: 3900, oldPrice: 4800, category: "2-piece", image: "https://images.unsplash.com/photo-1550614000-4b9519e02a48?auto=format&fit=crop&q=80&w=800", rating: 4.5 },
  { id: 5, name: "Pastel Pink Chiffon", price: 4200, oldPrice: 5000, category: "3-piece", image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
  { id: 6, name: "Golden Hour Silk", price: 3500, oldPrice: 4200, category: "2-piece", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800", rating: 4.4 },
  { id: 7, name: "Teal Block Print Suit", price: 3100, oldPrice: 3800, category: "3-piece", image: "https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
  { id: 8, name: "Summer Breeze Cotton", price: 2500, oldPrice: 3000, category: "2-piece", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800", rating: 4.3 },
];

const WHATSAPP_NUMBER = "923021735837";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", city: "" });
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        if (newQty < 1) return item;
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppOrder = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert("Please fill in all delivery details.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let message = `🛍️ *NEW LAWN SUITS ORDER*\n\n`;
    message += `*Customer Details:*\n`;
    message += `👤 Name: ${formData.name}\n`;
    message += `📞 Phone: ${formData.phone}\n`;
    message += `📍 Address: ${formData.address}, ${formData.city}\n\n`;
    message += `*Order Details:*\n`;
    cart.forEach(item => {
      message += `- ${item.name} (Qty: ${item.qty}) - Rs. ${item.price * item.qty}\n`;
    });
    message += `\n💰 *Total Bill: Rs. ${cartTotal}*`;
    message += `\n💵 Payment Method: Cash on Delivery`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setOrderPlaced(true);
  };

  const formatPrice = (price) => `Rs. ${price.toLocaleString()}`;
  const getDiscount = (old, current) => Math.round(((old - current) / old) * 100);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-800">
      
      {/* 1. Top Scrolling Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white py-2.5 overflow-hidden relative z-50 shadow-md">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-8 px-8 text-xs md:text-sm font-medium tracking-wide">
              <span className="flex items-center gap-1.5"><Truck size={14}/> Cash on Delivery Across Pakistan</span>
              <span className="text-yellow-300">✦</span>
              <span className="flex items-center gap-1.5"><Phone size={14}/> WhatsApp: 03021735837</span>
              <span className="text-yellow-300">✦</span>
              <span className="flex items-center gap-1.5"><Sparkles size={14}/> Premium 2-Piece & 3-Piece Lawn</span>
              <span className="text-yellow-300">✦</span>
              <span>🎁 Free Shipping Above Rs. 5000</span>
              <span className="text-yellow-300">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <ShoppingBag size={18} />
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              LAWN<span className="text-rose-500">COUTURE</span>
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-600">
            <button onClick={() => {setActiveCategory('all'); setIsCheckout(false);}} className={`hover:text-rose-500 transition ${activeCategory === 'all' && !isCheckout ? 'text-rose-500' : ''}`}>Home</button>
            <button onClick={() => {setActiveCategory('2-piece'); setIsCheckout(false);}} className={`hover:text-rose-500 transition ${activeCategory === '2-piece' ? 'text-rose-500' : ''}`}>2-Piece Suits</button>
            <button onClick={() => {setActiveCategory('3-piece'); setIsCheckout(false);}} className={`hover:text-rose-500 transition ${activeCategory === '3-piece' ? 'text-rose-500' : ''}`}>3-Piece Suits</button>
            <button className="text-rose-500 font-semibold flex items-center gap-1"><Sparkles size={14}/> New Arrivals</button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search suits..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 w-48 transition-all focus:w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 hover:bg-rose-50 rounded-full transition-colors group"
            >
              <ShoppingCart size={22} className="text-gray-700 group-hover:text-rose-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-200px)]">
        
        {!isCheckout && !orderPlaced && (
          <>
            {/* Hero Section */}
            <div className="relative mb-8 md:mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl"></div>
              <div className="relative max-w-xl">
                <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur text-rose-600 text-xs font-semibold rounded-full mb-4 shadow-sm">
                  ✨ Summer Collection 2026
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  Elegant Lawn Suits, <br/>
                  <span className="text-rose-500">Crafted for You</span>
                </h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  Discover our premium 2-piece & 3-piece lawn collection. Luxurious fabrics, timeless designs.
                </p>
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-rose-500 transition-colors shadow-lg"
                >
                  Shop Now <ArrowRight size={16}/>
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden relative mb-4">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-300 shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {activeCategory === 'all' ? 'All Collection' : activeCategory === '2-piece' ? '2-Piece Lawn' : 'Premium 3-Piece'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} products available</p>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All' },
                  { id: '2-piece', label: '2-Piece' },
                  { id: '3-piece', label: '3-Piece' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === tab.id 
                        ? 'bg-gray-900 text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.oldPrice > product.price && (
                        <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                          -{getDiscount(product.oldPrice, product.price)}%
                        </span>
                      )}
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm hover:bg-white transition-colors"
                      >
                        <Heart size={14} className={wishlist.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}/>
                      </button>
                      <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-xs md:text-sm font-semibold hover:bg-rose-500 transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                        >
                          <ShoppingCart size={14}/> Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-3 md:p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-1 mb-1.5">
                        <Star size={12} className="fill-amber-400 text-amber-400"/>
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-base md:text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                        <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                      </div>
                      <div className="mt-auto flex flex-col gap-2">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-gray-900 text-white py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-rose-500 transition-colors md:hidden"
                        >
                          Add to Cart
                        </button>
                        <a 
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in: ${product.name} (${formatPrice(product.price)})`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-500 text-white py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Phone size={12}/> Order on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400"/>
                </div>
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </>
        )}

        {/* Checkout Page */}
        {(isCheckout || orderPlaced) && (
          <div className="max-w-4xl mx-auto">
            {orderPlaced ? (
              <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-600" size={40}/>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Order Sent!</h2>
                <p className="text-gray-600 mb-6">Your order has been sent via WhatsApp. We'll confirm it shortly.</p>
                <button 
                  onClick={() => {setOrderPlaced(false); setIsCheckout(false); setCart([]);}}
                  className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setIsCheckout(false)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm">
                  ← Back to shopping
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h2>
                
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Form */}
                  <div className="md:col-span-3 bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin size={18} className="text-rose-500"/> Delivery Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Full Name</label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Enter your name"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Phone Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                          <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="03XX-XXXXXXX"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Delivery Address</label>
                        <textarea 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="House #, Street, Area"
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">City</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="e.g., Lahore, Karachi"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CreditCard size={18} className="text-rose-500"/> Payment Method
                        </h3>
                        <label className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl cursor-pointer">
                          <input type="radio" name="payment" defaultChecked className="text-green-600"/>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">Cash on Delivery (COD)</p>
                            <p className="text-xs text-gray-500">Pay when you receive your order</p>
                          </div>
                          <Truck size={20} className="text-green-600"/>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                      <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-3">
                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover"/>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                              <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.qty)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Subtotal</span>
                          <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Shipping</span>
                          <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                          <span>Total</span>
                          <span>{formatPrice(cartTotal)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleWhatsAppOrder}
                        className="w-full mt-5 bg-green-500 text-white py-3.5 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                      >
                        <Phone size={18}/> Place Order via WhatsApp
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-3">You'll be redirected to WhatsApp</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Cart Slide-over */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slideIn">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Shopping Cart</h3>
                <p className="text-xs text-gray-500">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20}/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={32} className="text-gray-400"/>
                  </div>
                  <p className="text-gray-500 mb-1">Your cart is empty</p>
                  <p className="text-xs text-gray-400">Add some beautiful suits!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-20 h-24 rounded-lg object-cover"/>
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h4>
                        <p className="text-sm font-bold text-rose-500 mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200">
                            <button onClick={() => updateQty(item.id, -1)} className="p-1.5 hover:bg-gray-100 rounded-l-lg">
                              <Minus size={12}/>
                            </button>
                            <span className="px-2 text-sm font-medium">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="p-1.5 hover:bg-gray-100 rounded-r-lg">
                              <Plus size={12}/>
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-gray-400 hover:text-rose-500">
                            <Trash2 size={14}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">{formatPrice(cartTotal)}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckout(true); }}
                  className="w-full bg-rose-500 text-white py-3.5 rounded-xl font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                >
                  Proceed to Checkout <ArrowRight size={16}/>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                  <ShoppingBag size={18} />
                </div>
                <h3 className="text-white font-bold text-lg">LAWNCOUTURE</h3>
              </div>
              <p className="text-sm text-gray-400">Premium lawn suits crafted with love. Delivering elegance across Pakistan.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveCategory('2-piece')} className="hover:text-rose-400">2-Piece Suits</button></li>
                <li><button onClick={() => setActiveCategory('3-piece')} className="hover:text-rose-400">3-Piece Suits</button></li>
                <li><a href="#" className="hover:text-rose-400">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Shipping Policy</li>
                <li>Returns & Exchange</li>
                <li>Size Guide</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone size={14}/> 03021735837</li>
                <li>WhatsApp Orders Available</li>
                <li>Cash on Delivery</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
            © 2026 LawnCouture. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
