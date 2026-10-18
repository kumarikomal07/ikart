
import { useMemo, useState } from "react";
import {
  Search, ShoppingCart, UserRound, Store, Smartphone, Shirt,
  House, Sparkles, Monitor, ChevronRight, Heart, Headphones,
  PackageCheck, ShieldCheck, Zap, ArrowRight, Menu, X, Star,
  Truck, CircleHelp, Clock3
} from "lucide-react";

const categories = [
  { name: "Mobiles", icon: Smartphone, color: "#e0edff" },
  { name: "Fashion", icon: Shirt, color: "#ffe8ee" },
  { name: "Electronics", icon: Monitor, color: "#e8e5ff" },
  { name: "Home", icon: House, color: "#ffefd9" },
  { name: "Beauty", icon: Sparkles, color: "#fce7f3" },
  { name: "Audio", icon: Headphones, color: "#dcfce7" },
];

const products = [
  {
    id: 1, name: "Premium Smartphone", category: "Mobiles",
    price: 12999, old: 18999, off: "32% OFF", rating: "4.5",
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: 2, name: "Studio Wireless Headphones", category: "Audio",
    price: 1499, old: 2999, off: "50% OFF", rating: "4.4",
    tag: "HOT DEAL",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: 3, name: "Classic Smart Watch", category: "Electronics",
    price: 1999, old: 3999, off: "50% OFF", rating: "4.3",
    tag: "TRENDING",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: 4, name: "Everyday Sneakers", category: "Fashion",
    price: 1299, old: 2499, off: "48% OFF", rating: "4.2",
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: 5, name: "Professional Camera", category: "Electronics",
    price: 24999, old: 32999, off: "24% OFF", rating: "4.7",
    tag: "TOP PICK",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: 6, name: "Minimal Desk Lamp", category: "Home",
    price: 899, old: 1499, off: "40% OFF", rating: "4.1",
    tag: "GREAT VALUE",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: 7, name: "Skincare Essentials", category: "Beauty",
    price: 699, old: 999, off: "30% OFF", rating: "4.3",
    tag: "FAN FAVOURITE",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: 8, name: "Portable Headphones", category: "Audio",
    price: 2199, old: 3499, off: "37% OFF", rating: "4.4",
    tag: "LIMITED DEAL",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=85",
  },
];

const money = (value) => "₹" + value.toLocaleString("en-IN");

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function notify(text) {
    setMessage(text);
    window.clearTimeout(window.ikartToast);
    window.ikartToast = window.setTimeout(() => setMessage(""), 2600);
  }

  function scrollToProducts() {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function chooseCategory(name) {
    setCategory(name);
    setSearch("");
    setMenuOpen(false);
    scrollToProducts();
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      return existing
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...current, { ...product, qty: 1 }];
    });

    notify(`${product.name} added to cart`);
  }

  function toggleWishlist(product) {
    const isSaved = wishlist.includes(product.id);

    setWishlist((current) =>
      isSaved
        ? current.filter((id) => id !== product.id)
        : [...current, product.id]
    );

    notify(isSaved ? "Removed from wishlist" : "Added to wishlist");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f6fb] text-slate-800">
      {/* Announcement bar */}
      <div className="bg-[#102b59] px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        <Zap size={14} className="mr-1 inline text-yellow-300" />
        BIG SHOPPING DAYS — Discover deals you'll love!
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 lg:gap-7 lg:px-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            onClick={() => {
              setCategory("All");
              setSearch("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="shrink-0 text-left"
          >
            <span className="text-3xl font-black tracking-[-2px] text-[#1763db]">
              i<span className="text-[#ff9f1c]">kart</span>
            </span>
            <span className="block text-[9px] font-bold tracking-[2px] text-slate-400">
              SHOP MORE. LIVE BETTER.
            </span>
          </button>

          <div className="hidden min-w-0 flex-1 items-center rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-400 md:flex">
            <Search size={20} className="mr-3 shrink-0 text-blue-600" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCategory("All");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") scrollToProducts();
              }}
              placeholder="Search products, brands and more..."
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={17} />
              </button>
            )}
          </div>

          <button
            onClick={() => notify("Login and account features are coming soon.")}
            className="hidden items-center gap-2 rounded-xl px-3 py-2.5 font-semibold transition hover:bg-blue-50 hover:text-blue-700 sm:flex"
          >
            <UserRound size={20} />
            <span>Login</span>
          </button>

          <button
            onClick={() => notify("Seller registration is coming soon.")}
            className="hidden items-center gap-2 whitespace-nowrap rounded-xl px-2 py-2.5 text-sm font-semibold hover:bg-blue-50 hover:text-blue-700 lg:flex"
          >
            <Store size={20} />
            Seller
          </button>

          <button
            onClick={() =>
              notify(
                `Cart: ${cartCount} item(s) · Total ${money(cartTotal)}`
              )
            }
            className="relative flex shrink-0 items-center gap-2 rounded-xl bg-[#1763db] px-3 py-2.5 font-bold text-white shadow-sm transition hover:bg-blue-800 sm:px-4"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {cartCount}
            </span>
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <div className="flex items-center rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-blue-400">
            <Search size={19} className="mr-2 shrink-0 text-blue-600" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCategory("All");
              }}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="border-t bg-white p-4 md:hidden">
            <button
              onClick={() => {
                setMenuOpen(false);
                notify("Login feature coming soon.");
              }}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-blue-50"
            >
              <UserRound size={19} /> Login / My Account
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                notify("Seller registration coming soon.");
              }}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-blue-50"
            >
              <Store size={19} /> Become a Seller
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Hero banner */}
        <section className="relative my-5 grid overflow-hidden rounded-3xl bg-gradient-to-br from-[#102b59] via-[#1763db] to-[#40a5f5] text-white shadow-xl md:my-7 md:min-h-[390px] md:grid-cols-[1.1fr_0.9fr]">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10 sm:h-96 sm:w-96" />
          <div className="pointer-events-none absolute bottom-0 right-[20%] h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-14 lg:py-14">
            <span className="mb-5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-50">
              <Sparkles size={14} className="mr-1 inline text-yellow-300" />
              Your shopping season starts here
            </span>

            <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Little prices.
              <br />
              <span className="text-yellow-300">Big happiness.</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-blue-100 sm:text-base">
              Discover trending finds, everyday essentials and deals made for
              you. Your next favourite is just a click away.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={scrollToProducts}
                className="rounded-xl bg-yellow-300 px-6 py-3.5 font-extrabold text-[#102b59] shadow-lg transition hover:-translate-y-0.5 hover:bg-yellow-200"
              >
                Shop the deals <ArrowRight size={18} className="ml-2 inline" />
              </button>
              <button
                onClick={() => chooseCategory("Electronics")}
                className="rounded-xl border border-white/40 px-5 py-3.5 font-semibold transition hover:bg-white/10"
              >
                Explore electronics
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-blue-100">
              <span>
                <ShieldCheck size={15} className="mr-1 inline text-yellow-300" />
                Easy shopping
              </span>
              <span>
                <Truck size={15} className="mr-1 inline text-yellow-300" />
                Great finds
              </span>
              <span>
                <Heart size={15} className="mr-1 inline text-yellow-300" />
                Made for you
              </span>
            </div>
          </div>

          <div className="relative hidden min-h-[340px] items-center justify-center md:flex">
            <div className="absolute h-72 w-72 rounded-full bg-white/10 blur-2xl lg:h-80 lg:w-80" />
            <div className="absolute h-64 w-64 rounded-full border border-white/20 lg:h-72 lg:w-72" />

            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&auto=format&fit=crop&q=85"
              alt="Featured smartphone"
              className="relative z-10 h-60 w-60 rounded-[2rem] object-cover shadow-2xl transition duration-500 hover:rotate-2 hover:scale-105 lg:h-72 lg:w-72"
            />

            <div className="absolute bottom-[12%] left-0 z-20 rounded-2xl border border-white/50 bg-white p-4 text-slate-800 shadow-xl">
              <p className="text-xs font-semibold text-slate-500">
                Featured deals
              </p>
              <p className="mt-1 text-2xl font-black text-blue-700">₹499+</p>
              <p className="text-xs font-bold text-emerald-600">
                Find your next favourite
              </p>
            </div>

            <div className="absolute right-[4%] top-[12%] z-20 rotate-6 rounded-xl bg-yellow-300 px-4 py-3 text-sm font-black text-blue-950 shadow-lg">
              UP TO 50% OFF
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-5 rounded-2xl border border-slate-100 bg-white px-4 py-6 shadow-sm sm:px-7">
          <div className="mb-5 flex items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-lg font-extrabold sm:text-xl">
                Shop by category
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Find exactly what you're looking for
              </p>
            </div>
            <button
              onClick={() => chooseCategory("All")}
              className="hidden items-center gap-1 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100 sm:flex"
            >
              VIEW ALL <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-5">
            {categories.map(({ name, icon: Icon, color }) => (
              <button
                key={name}
                onClick={() => chooseCategory(name)}
                className={`group flex flex-col items-center rounded-xl p-2 transition hover:bg-slate-50 ${
                  category === name ? "bg-blue-50 ring-1 ring-blue-200" : ""
                }`}
              >
                <span
                  style={{ backgroundColor: color }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg sm:h-20 sm:w-20"
                >
                  <Icon size={29} strokeWidth={1.7} className="text-slate-800" />
                </span>
                <span className="mt-3 text-xs font-bold sm:text-sm">{name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Truck size={24} />
            </span>
            <div>
              <p className="text-sm font-extrabold">Convenient shopping</p>
              <p className="mt-1 text-xs text-slate-500">Browse from anywhere</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck size={24} />
            </span>
            <div>
              <p className="text-sm font-extrabold">A better experience</p>
              <p className="mt-1 text-xs text-slate-500">Simple, intuitive design</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Zap size={24} />
            </span>
            <div>
              <p className="text-sm font-extrabold">Deals worth finding</p>
              <p className="mt-1 text-xs text-slate-500">Discover hand-picked finds</p>
            </div>
          </div>
        </section>

        {/* Product listing */}
        <section
          id="products"
          className="mb-6 scroll-mt-36 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-4 py-5 sm:px-6 lg:px-7">
            <div className="flex items-center gap-3">
              <span className="hidden h-11 w-1.5 rounded-full bg-blue-600 sm:block" />
              <div>
                <h2 className="text-xl font-extrabold sm:text-2xl">
                  {category === "All" ? "Trending deals" : `${category} picks`}
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Good finds. Better prices. Just for you.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:flex">
                <Clock3 size={14} /> Explore today's picks
              </span>
              <button
                onClick={() => {
                  setCategory("All");
                  setSearch("");
                }}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                View all <ChevronRight size={16} className="ml-1 inline" />
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <Search size={38} className="mx-auto mb-3 text-slate-300" />
              <h3 className="font-bold">No products found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try another search term or category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 sm:grid-cols-3 sm:gap-4 sm:p-5 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const saved = wishlist.includes(product.id);
                const quantity =
                  cart.find((item) => item.id === product.id)?.qty || 0;

                return (
                  <article
                    key={product.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-4"
                  >
                    <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/70 sm:h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-110"
                      />

                      <span className="absolute left-2 top-2 rounded-md bg-emerald-600 px-2 py-1 text-[9px] font-extrabold text-white sm:text-[10px]">
                        {product.off}
                      </span>

                      <button
                        onClick={() => toggleWishlist(product)}
                        aria-label={
                          saved ? "Remove from wishlist" : "Add to wishlist"
                        }
                        className={`absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm transition hover:scale-110 ${
                          saved
                            ? "text-rose-500"
                            : "text-slate-400 hover:text-rose-500"
                        }`}
                      >
                        <Heart
                          size={17}
                          fill={saved ? "currentColor" : "none"}
                        />
                      </button>

                      <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[9px] font-bold text-slate-500 shadow-sm">
                        {product.tag}
                      </span>
                    </div>

                    <div className="px-1 pb-1 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {product.category}
                      </p>

                      <h3 className="mt-1 min-h-10 text-sm font-bold leading-5 text-slate-800 transition group-hover:text-blue-700 sm:text-[15px]">
                        {product.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-1">
                        <span className="flex items-center gap-1 rounded bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
                          {product.rating}
                          <Star size={10} fill="currentColor" />
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Rating
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-lg font-black text-slate-900">
                          {money(product.price)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {money(product.old)}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-bold text-emerald-600">
                        You save {money(product.old - product.price)}
                      </p>

                      <button
                        onClick={() => addToCart(product)}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1763db] py-2.5 text-xs font-bold text-white transition hover:bg-[#104db5] sm:text-sm"
                      >
                        <ShoppingCart size={16} />
                        {quantity ? `Add more (${quantity})` : "Add to cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Promotional banner */}
        <section className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-r from-[#fff0cf] via-[#ffdf9a] to-[#ffd2a6] p-6 sm:p-9 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <span className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-700">
                The Ikart promise
              </span>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Your next favourite is waiting.
              </h2>
              <p className="mt-2 text-sm text-slate-700 sm:text-base">
                Discover something useful, beautiful or just fun.
              </p>
            </div>

            <button
              onClick={() => {
                setCategory("All");
                setSearch("");
                scrollToProducts();
              }}
              className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              Explore products{" "}
              <ArrowRight size={17} className="ml-2 inline" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#10213d] text-white">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <span className="text-3xl font-black tracking-[-2px]">
              i<span className="text-yellow-300">kart</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
              A little inspiration, a lot of discovery. Find everyday
              favourites in one place.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {["Mobiles", "Fashion", "Electronics", "Home"].map((name) => (
                <button
                  key={name}
                  onClick={() => chooseCategory(name)}
                  className="block transition hover:text-yellow-300"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold">Customer care</h3>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <p><CircleHelp size={16} className="mr-2 inline" /> Help & support</p>
              <p><PackageCheck size={16} className="mr-2 inline" /> Orders & delivery</p>
              <p><ShieldCheck size={16} className="mr-2 inline" /> Shopping information</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Stay in the loop</h3>
            <p className="mt-3 text-sm text-slate-300">
              Fresh finds and shopping inspiration.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                notify("Thanks for your interest! Newsletter integration can be added next.");
                event.currentTarget.reset();
              }}
              className="mt-3 flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-blue-300"
              />
              <button
                aria-label="Subscribe"
                className="rounded-lg bg-yellow-300 px-3 text-slate-900 transition hover:bg-yellow-200"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
          © 2026 Ikart · Built with React · Demo storefront
        </div>
      </footer>

      {/* Toast notification */}
      {message && (
        <div
          role="status"
          className="fixed bottom-5 right-4 z-50 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-2xl"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            ✓
          </span>
          <span>{message}</span>
          <button
            onClick={() => setMessage("")}
            aria-label="Close notification"
            className="ml-2 text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
