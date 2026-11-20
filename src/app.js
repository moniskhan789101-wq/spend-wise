/* ==========================================================================
   SpendWise — Personal Expense Tracker (Vanilla JavaScript + LocalStorage)
   Beginner-friendly, modular, framework-free implementation
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Constants, Categories & Minimal Fintech SVG Icons
// --------------------------------------------------------------------------

const STORAGE_KEY = 'spendwise_transactions_v1';
const STORAGE_META_KEY = 'spendwise_meta_v1';

const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Housing & Rent',
  'Groceries',
  'Transport & Fuel',
  'Utilities & Bills',
  'Shopping',
  'Health & Medical',
  'Entertainment',
  'Education',
  'Travel',
  'Other Expense',
];

const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investments',
  'Business',
  'Gift & Bonus',
  'Other Income',
];

// Curated emerald-and-slate fintech palette for category visualizations
const CATEGORY_COLORS = {
  'Housing & Rent': '#065f46',
  'Food & Dining': '#059669',
  'Groceries': '#10b981',
  'Utilities & Bills': '#0d9488',
  'Transport & Fuel': '#0f766e',
  'Shopping': '#334155',
  'Health & Medical': '#475569',
  'Entertainment': '#64748b',
  'Education': '#0284c7',
  'Travel': '#d97706',
  'Other Expense': '#94a3b8',
};

const VIEW_TITLES = {
  overview: 'Overview',
  transactions: 'Transactions',
  analytics: 'Monthly Analytics',
};

// Clean 16px geometric SVG icons keyed by category name
const CATEGORY_ICON_PATHS = {
  'Food & Dining':
    '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  'Housing & Rent':
    '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'Groceries':
    '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  'Transport & Fuel':
    '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  'Utilities & Bills':
    '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'Shopping':
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'Health & Medical':
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  'Entertainment':
    '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="m10 9 5 3-5 3Z"/>',
  'Education':
    '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  'Travel':
    '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  'Salary':
    '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'Freelance':
    '<rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/>',
  'Investments':
    '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'Business':
    '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>',
  'Gift & Bonus':
    '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
};

const DEFAULT_ICON_PATH =
  '<circle cx="12" cy="12" r="9"/><path d="M12 8v8"/><path d="M8 12h8"/>';

function getCategoryIconSVG(category, size = 16) {
  const paths = CATEGORY_ICON_PATHS[category] || DEFAULT_ICON_PATH;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

const EDIT_ICON_SVG =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>';

const DELETE_ICON_SVG =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>';

// --------------------------------------------------------------------------
// 2. Application State
// --------------------------------------------------------------------------

const state = {
  transactions: [],
  activeView: 'overview',
  selectedMonth: 'all', // 'all' or 'YYYY-MM'
  filters: {
    search: '',
    type: 'all', // 'all' | 'income' | 'expense'
    category: 'all',
    sort: 'date-desc',
  },
  formType: 'expense',
  pendingConfirmAction: null,
};

// --------------------------------------------------------------------------
// 3. Currency & Date Formatting Helpers (Indian Rupees)
// --------------------------------------------------------------------------

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatINR(amount) {
  const num = Number(amount) || 0;
  return inrFormatter.format(num);
}

function formatINRCompact(amount) {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 10000000) {
    return `${sign}₹${(abs / 10000000).toFixed(1).replace(/\.0$/, '')}Cr`;
  }
  if (abs >= 100000) {
    return `${sign}₹${(abs / 100000).toFixed(1).replace(/\.0$/, '')}L`;
  }
  if (abs >= 1000) {
    return `${sign}₹${(abs / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return `${sign}₹${Math.round(abs)}`;
}

function getTodayISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplayDate(isoDate) {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate || '';
  const [y, m, d] = isoDate.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatMonthLabel(monthKey, shortFormat = false) {
  const [y, m] = monthKey.split('-').map(Number);
  const dateObj = new Date(y, m - 1, 1);
  return dateObj.toLocaleDateString('en-IN', {
    month: shortFormat ? 'short' : 'long',
    year: shortFormat ? '2-digit' : 'numeric',
  });
}

function getMonthKey(isoDate) {
  return isoDate.slice(0, 7); // 'YYYY-MM'
}

function generateId() {
  return `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// --------------------------------------------------------------------------
// 4. Demo Data Generator (Realistic Indian Personal Finance, 6 Months)
// --------------------------------------------------------------------------

function createDemoTransactions() {
  const now = new Date();

  function relDate(monthsAgo, dayOfMonth) {
    const target = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
    const maxDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    const safeDay = Math.min(dayOfMonth, maxDay);
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(safeDay).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return [
    // Current Month
    {
      id: 'demo_1',
      type: 'income',
      description: 'Monthly Tech Salary',
      amount: 92000,
      date: relDate(0, 1),
      category: 'Salary',
      note: 'Direct credit — HDFC Bank',
    },
    {
      id: 'demo_2',
      type: 'expense',
      description: '2BHK Apartment Rent',
      amount: 24500,
      date: relDate(0, 3),
      category: 'Housing & Rent',
      note: 'NEFT to landlord',
    },
    {
      id: 'demo_3',
      type: 'expense',
      description: 'BigBasket Monthly Groceries',
      amount: 5840,
      date: relDate(0, 5),
      category: 'Groceries',
      note: 'UPI via GPay',
    },
    {
      id: 'demo_4',
      type: 'expense',
      description: 'BESCOM Electricity & Broadband',
      amount: 3120,
      date: relDate(0, 7),
      category: 'Utilities & Bills',
      note: 'Auto-pay biller',
    },
    {
      id: 'demo_5',
      type: 'income',
      description: 'UI Consultation Freelance',
      amount: 18500,
      date: relDate(0, 9),
      category: 'Freelance',
      note: 'Client invoice #104',
    },
    {
      id: 'demo_6',
      type: 'expense',
      description: 'Metro Card & Uber Commute',
      amount: 2450,
      date: relDate(0, 11),
      category: 'Transport & Fuel',
      note: 'Daily office travel',
    },
    {
      id: 'demo_7',
      type: 'expense',
      description: 'Weekend Dinner at MTR & Cafe',
      amount: 2680,
      date: relDate(0, 14),
      category: 'Food & Dining',
      note: 'Dinner with friends',
    },
    {
      id: 'demo_8',
      type: 'expense',
      description: 'Apollo Pharmacy & Health Check',
      amount: 1950,
      date: relDate(0, 16),
      category: 'Health & Medical',
      note: 'Annual diagnostics',
    },
    {
      id: 'demo_9',
      type: 'expense',
      description: 'Myntra Winter Apparel',
      amount: 4299,
      date: relDate(0, 18),
      category: 'Shopping',
      note: 'UPI payment',
    },

    // 1 Month Ago
    {
      id: 'demo_10',
      type: 'income',
      description: 'Monthly Tech Salary',
      amount: 92000,
      date: relDate(1, 1),
      category: 'Salary',
      note: 'Direct credit — HDFC Bank',
    },
    {
      id: 'demo_11',
      type: 'income',
      description: 'Quarterly Equity Dividend',
      amount: 4200,
      date: relDate(1, 12),
      category: 'Investments',
      note: 'Zerodha portfolio payout',
    },
    {
      id: 'demo_12',
      type: 'expense',
      description: '2BHK Apartment Rent',
      amount: 24500,
      date: relDate(1, 3),
      category: 'Housing & Rent',
      note: 'NEFT to landlord',
    },
    {
      id: 'demo_13',
      type: 'expense',
      description: 'DMart & Local Vegetable Market',
      amount: 6420,
      date: relDate(1, 8),
      category: 'Groceries',
      note: 'Household essentials',
    },
    {
      id: 'demo_14',
      type: 'expense',
      description: 'Swiggy & Dining Out',
      amount: 4850,
      date: relDate(1, 15),
      category: 'Food & Dining',
      note: 'Team lunch & weekend meals',
    },
    {
      id: 'demo_15',
      type: 'expense',
      description: 'Coorg Weekend Road Trip',
      amount: 11800,
      date: relDate(1, 21),
      category: 'Travel',
      note: 'Homestay & fuel split',
    },
    {
      id: 'demo_16',
      type: 'expense',
      description: 'Electricity, Gas & Mobile Postpaid',
      amount: 3340,
      date: relDate(1, 24),
      category: 'Utilities & Bills',
      note: 'Monthly bills',
    },

    // 2 Months Ago
    {
      id: 'demo_17',
      type: 'income',
      description: 'Monthly Tech Salary',
      amount: 88000,
      date: relDate(2, 1),
      category: 'Salary',
      note: 'Direct credit — HDFC Bank',
    },
    {
      id: 'demo_18',
      type: 'expense',
      description: '2BHK Apartment Rent',
      amount: 24500,
      date: relDate(2, 2),
      category: 'Housing & Rent',
      note: 'NEFT to landlord',
    },
    {
      id: 'demo_19',
      type: 'expense',
      description: 'Online System Design Course',
      amount: 5499,
      date: relDate(2, 10),
      category: 'Education',
      note: 'Annual certification track',
    },
    {
      id: 'demo_20',
      type: 'expense',
      description: 'Supermarket & Dairy Subscription',
      amount: 5900,
      date: relDate(2, 14),
      category: 'Groceries',
      note: 'Country Delight + BigBasket',
    },
    {
      id: 'demo_21',
      type: 'expense',
      description: 'PVR IMAX & Concert Tickets',
      amount: 3200,
      date: relDate(2, 19),
      category: 'Entertainment',
      note: 'BookMyShow',
    },
    {
      id: 'demo_22',
      type: 'expense',
      description: 'Petrol & Cab Rides',
      amount: 3650,
      date: relDate(2, 25),
      category: 'Transport & Fuel',
      note: 'IndianOil & Rapido',
    },

    // 3 Months Ago
    {
      id: 'demo_23',
      type: 'income',
      description: 'Monthly Tech Salary',
      amount: 88000,
      date: relDate(3, 1),
      category: 'Salary',
      note: 'Direct credit',
    },
    {
      id: 'demo_24',
      type: 'income',
      description: 'Landing Page Freelance Sprint',
      amount: 15000,
      date: relDate(3, 16),
      category: 'Freelance',
      note: 'Milestone payment',
    },
    {
      id: 'demo_25',
      type: 'expense',
      description: '2BHK Apartment Rent',
      amount: 24500,
      date: relDate(3, 3),
      category: 'Housing & Rent',
      note: 'NEFT',
    },
    {
      id: 'demo_26',
      type: 'expense',
      description: 'Noise Cancelling Headphones',
      amount: 12999,
      date: relDate(3, 11),
      category: 'Shopping',
      note: 'Amazon India',
    },
    {
      id: 'demo_27',
      type: 'expense',
      description: 'Groceries & Cafes',
      amount: 7600,
      date: relDate(3, 20),
      category: 'Food & Dining',
      note: 'Monthly food expenses',
    },
    {
      id: 'demo_28',
      type: 'expense',
      description: 'Broadband & Electricity',
      amount: 2980,
      date: relDate(3, 22),
      category: 'Utilities & Bills',
      note: 'ACT Fibernet + BESCOM',
    },

    // 4 Months Ago
    {
      id: 'demo_29',
      type: 'income',
      description: 'Monthly Tech Salary',
      amount: 88000,
      date: relDate(4, 1),
      category: 'Salary',
      note: 'Direct credit',
    },
    {
      id: 'demo_30',
      type: 'expense',
      description: '2BHK Apartment Rent',
      amount: 24500,
      date: relDate(4, 3),
      category: 'Housing & Rent',
      note: 'NEFT',
    },
    {
      id: 'demo_31',
      type: 'expense',
      description: 'Monthly Groceries & Pantry',
      amount: 6150,
      date: relDate(4, 9),
      category: 'Groceries',
      note: 'Blinkit & BigBasket',
    },
    {
      id: 'demo_32',
      type: 'expense',
      description: 'Cult.fit & Dental Checkup',
      amount: 6200,
      date: relDate(4, 17),
      category: 'Health & Medical',
      note: 'Wellness & clinic visit',
    },
    {
      id: 'demo_33',
      type: 'expense',
      description: 'Restaurants & Coffee Shops',
      amount: 4100,
      date: relDate(4, 24),
      category: 'Food & Dining',
      note: 'Third Wave Coffee & dining',
    },

    // 5 Months Ago
    {
      id: 'demo_34',
      type: 'income',
      description: 'Monthly Tech Salary',
      amount: 85000,
      date: relDate(5, 1),
      category: 'Salary',
      note: 'Direct credit',
    },
    {
      id: 'demo_35',
      type: 'income',
      description: 'Performance Bonus',
      amount: 12000,
      date: relDate(5, 18),
      category: 'Gift & Bonus',
      note: 'Q2 recognition award',
    },
    {
      id: 'demo_36',
      type: 'expense',
      description: '2BHK Apartment Rent',
      amount: 23000,
      date: relDate(5, 2),
      category: 'Housing & Rent',
      note: 'NEFT',
    },
    {
      id: 'demo_37',
      type: 'expense',
      description: 'Flight Tickets — Home Visit',
      amount: 9450,
      date: relDate(5, 12),
      category: 'Travel',
      note: 'IndiGo round-trip',
    },
    {
      id: 'demo_38',
      type: 'expense',
      description: 'Groceries & Utilities',
      amount: 8250,
      date: relDate(5, 21),
      category: 'Groceries',
      note: 'Monthly essentials',
    },
  ];
}

// --------------------------------------------------------------------------
// 5. LocalStorage Persistence Layer
// --------------------------------------------------------------------------

function loadFromStorage() {
  try {
    const rawMeta = localStorage.getItem(STORAGE_META_KEY);
    const rawTx = localStorage.getItem(STORAGE_KEY);

    if (!rawMeta && !rawTx) {
      const demo = createDemoTransactions();
      state.transactions = demo;
      saveToStorage();
      return;
    }

    if (rawTx) {
      const parsed = JSON.parse(rawTx);
      if (Array.isArray(parsed)) {
        state.transactions = parsed.filter(
          (tx) =>
            tx &&
            typeof tx.id === 'string' &&
            (tx.type === 'income' || tx.type === 'expense') &&
            typeof tx.description === 'string' &&
            typeof tx.amount === 'number' &&
            Number.isFinite(tx.amount) &&
            typeof tx.date === 'string' &&
            typeof tx.category === 'string'
        );
        return;
      }
    }

    state.transactions = [];
  } catch {
    state.transactions = [];
    showToast('Storage warning', 'Could not read saved browser data. Starting fresh.', 'error');
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    localStorage.setItem(
      STORAGE_META_KEY,
      JSON.stringify({ initialized: true, updatedAt: new Date().toISOString() })
    );
  } catch {
    showToast('Storage error', 'Unable to save to browser LocalStorage.', 'error');
  }
}

// --------------------------------------------------------------------------
// 6. Data Filtering, Sorting & Analytics Calculations
// --------------------------------------------------------------------------

function getAvailableMonths() {
  const monthSet = new Set(state.transactions.map((tx) => getMonthKey(tx.date)));
  return Array.from(monthSet).sort((a, b) => b.localeCompare(a));
}

function getPeriodTransactions() {
  if (state.selectedMonth === 'all') {
    return state.transactions;
  }
  return state.transactions.filter((tx) => getMonthKey(tx.date) === state.selectedMonth);
}

function getFilteredLedgerTransactions() {
  const query = state.filters.search.trim().toLowerCase();
  const base = getPeriodTransactions();

  const filtered = base.filter((tx) => {
    if (state.filters.type !== 'all' && tx.type !== state.filters.type) {
      return false;
    }
    if (state.filters.category !== 'all' && tx.category !== state.filters.category) {
      return false;
    }
    if (query) {
      const haystack = `${tx.description} ${tx.category} ${tx.note || ''}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  switch (state.filters.sort) {
    case 'date-asc':
      sorted.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case 'amount-desc':
      sorted.sort((a, b) => b.amount - a.amount);
      break;
    case 'amount-asc':
      sorted.sort((a, b) => a.amount - b.amount);
      break;
    case 'date-desc':
    default:
      sorted.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
      break;
  }
  return sorted;
}

function computeSummary(transactions) {
  let income = 0;
  let expense = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  for (const tx of transactions) {
    if (tx.type === 'income') {
      income += tx.amount;
      incomeCount += 1;
    } else {
      expense += tx.amount;
      expenseCount += 1;
    }
  }

  const balance = income - expense;
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;
  const expenseRatio = income > 0 ? (expense / income) * 100 : 0;

  return {
    balance,
    income,
    expense,
    incomeCount,
    expenseCount,
    totalCount: transactions.length,
    savingsRate,
    expenseRatio,
  };
}

function computeCategoryBreakdown(transactions) {
  const map = new Map();
  let totalExpense = 0;

  for (const tx of transactions) {
    if (tx.type !== 'expense') continue;
    totalExpense += tx.amount;
    const prev = map.get(tx.category) || { category: tx.category, amount: 0, count: 0 };
    prev.amount += tx.amount;
    prev.count += 1;
    map.set(tx.category, prev);
  }

  const rows = Array.from(map.values())
    .sort((a, b) => b.amount - a.amount)
    .map((item) => ({
      ...item,
      percent: totalExpense > 0 ? (item.amount / totalExpense) * 100 : 0,
      color: CATEGORY_COLORS[item.category] || '#64748b',
    }));

  return { rows, totalExpense };
}

function computeMonthlySeries(allTransactions, maxMonths = 6) {
  const monthMap = new Map();

  for (const tx of allTransactions) {
    const key = getMonthKey(tx.date);
    const entry = monthMap.get(key) || {
      monthKey: key,
      income: 0,
      expense: 0,
      count: 0,
    };
    if (tx.type === 'income') {
      entry.income += tx.amount;
    } else {
      entry.expense += tx.amount;
    }
    entry.count += 1;
    monthMap.set(key, entry);
  }

  const keys = Array.from(monthMap.keys()).sort((a, b) => a.localeCompare(b));
  const recentKeys = keys.slice(-maxMonths);

  return recentKeys.map((key) => {
    const item = monthMap.get(key);
    const net = item.income - item.expense;
    const savingsRate = item.income > 0 ? (net / item.income) * 100 : 0;
    return {
      ...item,
      net,
      savingsRate,
      shortLabel: formatMonthLabel(key, true),
      fullLabel: formatMonthLabel(key, false),
    };
  });
}

// --------------------------------------------------------------------------
// 7. Pure Vanilla JS SVG Charts (Fintech Bar + Net Trend & Interactive Donut)
// --------------------------------------------------------------------------

const tooltipEl = document.getElementById('chart-tooltip');

function showChartTooltip(event, htmlContent) {
  tooltipEl.innerHTML = htmlContent;
  tooltipEl.hidden = false;
  moveChartTooltip(event);
}

function moveChartTooltip(event) {
  const offset = 14;
  const rect = tooltipEl.getBoundingClientRect();
  let left = event.clientX + offset;
  let top = event.clientY - rect.height - 10;

  if (left + rect.width > window.innerWidth - 12) {
    left = event.clientX - rect.width - offset;
  }
  if (top < 12) {
    top = event.clientY + offset;
  }

  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
}

function hideChartTooltip() {
  tooltipEl.hidden = true;
}

// Builds a clean SVG path for a bar with rounded top corners and crisp flat bottom
function buildRoundedTopBarPath(x, y, width, height, radius = 5) {
  if (height <= 0) return '';
  const r = Math.min(radius, width / 2, height);
  const bottom = y + height;
  return [
    `M ${x} ${bottom}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    `L ${x + width - r} ${y}`,
    `Q ${x + width} ${y} ${x + width} ${y + r}`,
    `L ${x + width} ${bottom}`,
    'Z',
  ].join(' ');
}

function renderIncomeVsExpenseBarChart(containerEl, series) {
  if (!series.length) {
    containerEl.innerHTML = `
      <div class="empty-state">
        <p class="empty-title">No monthly cashflow data yet</p>
        <p class="empty-desc">Add income or expense transactions to compare monthly trends.</p>
      </div>
    `;
    return;
  }

  const chartId = containerEl.id || 'bar';
  const width = 660;
  const height = 252;
  const pad = { top: 20, right: 18, bottom: 36, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const rawMax = Math.max(
    0,
    ...series.map((d) => Math.max(d.income, d.expense, Math.max(0, d.net)))
  );
  const effectiveMax = rawMax > 0 ? rawMax : 1000;
  const rawStep = (effectiveMax * 1.12) / 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(1, rawStep))));
  const niceStep = Math.ceil(rawStep / magnitude) * magnitude;
  const yMax = niceStep * 4;

  const gridLinesCount = 4;
  let gridSVG = '';
  for (let i = 0; i <= gridLinesCount; i++) {
    const ratio = i / gridLinesCount;
    const y = pad.top + plotH - ratio * plotH;
    const val = yMax * ratio;
    const lineClass = i === 0 ? 'chart-baseline' : 'chart-grid-line';
    gridSVG += `
      <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" class="${lineClass}" />
      <text x="${pad.left - 10}" y="${y + 4}" text-anchor="end" class="chart-axis-text">${formatINRCompact(val)}</text>
    `;
  }

  const groupWidth = plotW / series.length;
  const barWidth = Math.min(26, Math.max(12, groupWidth * 0.24));
  const barGap = 6;

  let barsSVG = '';
  const netPoints = [];

  series.forEach((item, index) => {
    const groupX = pad.left + index * groupWidth;
    const centerX = groupX + groupWidth / 2;

    const incH = item.income > 0 ? Math.max(4, (item.income / yMax) * plotH) : 0;
    const expH = item.expense > 0 ? Math.max(4, (item.expense / yMax) * plotH) : 0;

    const incX = centerX - barWidth - barGap / 2;
    const expX = centerX + barGap / 2;
    const incY = pad.top + plotH - incH;
    const expY = pad.top + plotH - expH;

    // Track net surplus point clamped cleanly inside plot area
    const clampedNet = Math.max(0, Math.min(yMax, item.net));
    const netY = pad.top + plotH - (clampedNet / yMax) * plotH;
    netPoints.push({ x: centerX, y: netY });

    const isSelected = state.selectedMonth === item.monthKey;

    barsSVG += `
      <g class="chart-hit-group" data-month-idx="${index}" tabindex="0" role="button" aria-label="${escapeHTML(item.fullLabel)}: Income ${formatINR(item.income)}, Expenses ${formatINR(item.expense)}">
        <rect
          x="${groupX + 5}"
          y="${pad.top}"
          width="${Math.max(0, groupWidth - 10)}"
          height="${plotH}"
          rx="8"
          class="chart-hit-rect"
          ${isSelected ? 'style="fill: rgba(5, 150, 105, 0.085);"' : ''}
        />
        ${
          incH > 0
            ? `<path d="${buildRoundedTopBarPath(incX, incY, barWidth, incH, 5)}" fill="url(#incGrad-${chartId})" class="chart-bar" />`
            : ''
        }
        ${
          expH > 0
            ? `<path d="${buildRoundedTopBarPath(expX, expY, barWidth, expH, 5)}" fill="url(#expGrad-${chartId})" class="chart-bar" />`
            : ''
        }
        <text
          x="${centerX}"
          y="${height - 10}"
          text-anchor="middle"
          class="chart-month-text"
          ${isSelected ? 'style="fill: #047857; font-weight: 700;"' : ''}
        >${escapeHTML(item.shortLabel)}</text>
      </g>
    `;
  });

  // Net cashflow trend polyline + crisp dots (when >= 2 months exist)
  let netOverlaySVG = '';
  if (netPoints.length >= 2) {
    const polyPoints = netPoints.map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
    const dotsSVG = netPoints
      .map((pt) => `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="3.6" class="chart-net-dot" />`)
      .join('');
    netOverlaySVG = `
      <polyline points="${polyPoints}" class="chart-net-line" />
      ${dotsSVG}
    `;
  }

  containerEl.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="bar-chart-svg" role="img" aria-label="Monthly income versus expenses bar chart with net savings line">
      <defs>
        <linearGradient id="incGrad-${chartId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
        <linearGradient id="expGrad-${chartId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#cbd5e1" />
          <stop offset="100%" stop-color="#94a3b8" />
        </linearGradient>
      </defs>
      ${gridSVG}
      ${barsSVG}
      ${netOverlaySVG}
    </svg>
  `;

  containerEl.querySelectorAll('.chart-hit-group').forEach((groupEl) => {
    const idx = Number(groupEl.dataset.monthIdx);
    const item = series[idx];

    const tooltipHTML = `
      <div class="tooltip-title">${escapeHTML(item.fullLabel)}</div>
      <div class="tooltip-row"><span>Income</span><strong>${formatINR(item.income)}</strong></div>
      <div class="tooltip-row"><span>Expenses</span><strong>${formatINR(item.expense)}</strong></div>
      <div class="tooltip-divider"></div>
      <div class="tooltip-row"><span>Net Surplus</span><strong>${item.net >= 0 ? '+' : '-'}${formatINR(Math.abs(item.net))}</strong></div>
      <div class="tooltip-row"><span>Savings Rate</span><strong>${item.savingsRate.toFixed(1)}%</strong></div>
    `;

    groupEl.addEventListener('mouseenter', (e) => showChartTooltip(e, tooltipHTML));
    groupEl.addEventListener('mousemove', (e) => moveChartTooltip(e));
    groupEl.addEventListener('mouseleave', hideChartTooltip);
    groupEl.addEventListener('click', () => {
      state.selectedMonth = state.selectedMonth === item.monthKey ? 'all' : item.monthKey;
      hideChartTooltip();
      renderApp();
    });
    groupEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        state.selectedMonth = state.selectedMonth === item.monthKey ? 'all' : item.monthKey;
        renderApp();
      }
    });
  });
}

function renderExpenseDonutChart(donutContainerEl, listContainerEl, breakdown) {
  const { rows, totalExpense } = breakdown;

  if (!rows.length) {
    donutContainerEl.innerHTML = `
      <svg viewBox="0 0 190 190" class="donut-svg" role="img" aria-label="No expenses recorded">
        <circle cx="95" cy="95" r="68" fill="none" stroke="#f1f5f4" stroke-width="22" />
        <text x="95" y="90" text-anchor="middle" class="donut-center-label">Total Spent</text>
        <text x="95" y="110" text-anchor="middle" class="donut-center-value">₹0</text>
      </svg>
    `;
    listContainerEl.innerHTML = `
      <p class="empty-desc">No expenses found for this period. Add an expense to see category shares.</p>
    `;
    return;
  }

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const slicesSVG = rows
    .map((item, idx) => {
      const sliceLength = (item.percent / 100) * circumference;
      const gap = rows.length > 1 ? 2.4 : 0;
      const dashLength = Math.max(1.5, sliceLength - gap);
      const dashOffset = -accumulatedOffset;
      accumulatedOffset += sliceLength;

      return `
        <circle
          cx="95"
          cy="95"
          r="${radius}"
          fill="none"
          stroke="${item.color}"
          stroke-width="22"
          stroke-dasharray="${dashLength} ${circumference - dashLength}"
          stroke-dashoffset="${dashOffset}"
          transform="rotate(-90 95 95)"
          class="donut-slice"
          data-cat-idx="${idx}"
        />
      `;
    })
    .join('');

  donutContainerEl.innerHTML = `
    <svg viewBox="0 0 190 190" class="donut-svg" role="img" aria-label="Category expense breakdown donut chart">
      <circle cx="95" cy="95" r="${radius}" fill="none" stroke="#f1f5f4" stroke-width="22" />
      ${slicesSVG}
      <text id="donut-c-label" x="95" y="84" text-anchor="middle" class="donut-center-label">Total Spent</text>
      <text id="donut-c-value" x="95" y="105" text-anchor="middle" class="donut-center-value">${formatINRCompact(totalExpense)}</text>
      <text id="donut-c-sub" x="95" y="122" text-anchor="middle" class="donut-center-sub">${rows.length} ${rows.length === 1 ? 'category' : 'categories'}</text>
    </svg>
  `;

  const centerLabelEl = donutContainerEl.querySelector('#donut-c-label');
  const centerValueEl = donutContainerEl.querySelector('#donut-c-value');
  const centerSubEl = donutContainerEl.querySelector('#donut-c-sub');

  const setCenterReadout = (item) => {
    if (!item) {
      centerLabelEl.textContent = 'Total Spent';
      centerValueEl.textContent = formatINRCompact(totalExpense);
      centerSubEl.textContent = `${rows.length} ${rows.length === 1 ? 'category' : 'categories'}`;
      return;
    }
    const shortCat = item.category.length > 14 ? `${item.category.slice(0, 13)}…` : item.category;
    centerLabelEl.textContent = shortCat;
    centerValueEl.textContent = formatINRCompact(item.amount);
    centerSubEl.textContent = `${item.percent.toFixed(1)}% share`;
  };

  donutContainerEl.querySelectorAll('.donut-slice').forEach((sliceEl) => {
    const idx = Number(sliceEl.dataset.catIdx);
    const item = rows[idx];
    const tooltipHTML = `
      <div class="tooltip-title">${escapeHTML(item.category)}</div>
      <div class="tooltip-row"><span>Spent</span><strong>${formatINR(item.amount)}</strong></div>
      <div class="tooltip-row"><span>Share</span><strong>${item.percent.toFixed(1)}%</strong></div>
      <div class="tooltip-row"><span>Entries</span><strong>${item.count}</strong></div>
    `;
    sliceEl.addEventListener('mouseenter', (e) => {
      setCenterReadout(item);
      showChartTooltip(e, tooltipHTML);
    });
    sliceEl.addEventListener('mousemove', (e) => moveChartTooltip(e));
    sliceEl.addEventListener('mouseleave', () => {
      setCenterReadout(null);
      hideChartTooltip();
    });
    sliceEl.addEventListener('click', () => {
      hideChartTooltip();
      jumpToCategoryFilter(item.category);
    });
  });

  // Render top 5 categories with clean inline mini-bars
  const topRows = rows.slice(0, 5);
  listContainerEl.innerHTML = topRows
    .map(
      (item, idx) => `
      <button type="button" class="category-mini-row" data-cat-filter="${escapeHTML(item.category)}" data-cat-idx="${idx}">
        <span class="category-mini-top">
          <span class="category-mini-left">
            <span class="cat-color-box" style="background-color: ${item.color};" aria-hidden="true"></span>
            <span class="cat-name-text">${escapeHTML(item.category)}</span>
          </span>
          <span class="category-mini-right tabular-nums">
            <span class="cat-amount-text">${formatINRCompact(item.amount)}</span>
            <span class="cat-pct-text">${item.percent.toFixed(0)}%</span>
          </span>
        </span>
        <span class="category-mini-track" aria-hidden="true">
          <span class="category-mini-fill" style="width: ${Math.max(4, item.percent)}%; background-color: ${item.color};"></span>
        </span>
      </button>
    `
    )
    .join('');

  listContainerEl.querySelectorAll('.category-mini-row').forEach((btn) => {
    const idx = Number(btn.dataset.catIdx);
    const item = rows[idx];
    const matchingSlice = donutContainerEl.querySelector(`.donut-slice[data-cat-idx="${idx}"]`);

    btn.addEventListener('mouseenter', () => {
      setCenterReadout(item);
      if (matchingSlice) matchingSlice.classList.add('is-hovered');
    });
    btn.addEventListener('mouseleave', () => {
      setCenterReadout(null);
      if (matchingSlice) matchingSlice.classList.remove('is-hovered');
    });
    btn.addEventListener('click', () => {
      jumpToCategoryFilter(btn.dataset.catFilter);
    });
  });
}

function jumpToCategoryFilter(categoryName) {
  state.filters.type = 'expense';
  state.filters.category = categoryName;
  state.filters.search = '';
  setActiveView('transactions');
}

// --------------------------------------------------------------------------
// 8. DOM Rendering Functions
// --------------------------------------------------------------------------

function renderMonthSelector() {
  const selectEl = document.getElementById('global-month-select');
  const months = getAvailableMonths();

  if (state.selectedMonth !== 'all' && !months.includes(state.selectedMonth)) {
    state.selectedMonth = 'all';
  }

  const optionsHTML = [
    `<option value="all"${state.selectedMonth === 'all' ? ' selected' : ''}>All Months</option>`,
    ...months.map(
      (m) =>
        `<option value="${m}"${state.selectedMonth === m ? ' selected' : ''}>${escapeHTML(formatMonthLabel(m))}</option>`
    ),
  ].join('');

  selectEl.innerHTML = optionsHTML;
}

function renderKPIs(periodTransactions) {
  const summary = computeSummary(periodTransactions);

  const balanceEl = document.getElementById('kpi-balance');
  const balanceSubEl = document.getElementById('kpi-balance-sub');
  const savingsBarEl = document.getElementById('kpi-savings-bar');
  const incomeEl = document.getElementById('kpi-income');
  const incomeSubEl = document.getElementById('kpi-income-sub');
  const expenseEl = document.getElementById('kpi-expense');
  const expenseSubEl = document.getElementById('kpi-expense-sub');
  const countEl = document.getElementById('kpi-count');
  const countSubEl = document.getElementById('kpi-count-sub');

  balanceEl.textContent = formatINR(summary.balance);
  balanceEl.classList.toggle('kpi-negative', summary.balance < 0);
  balanceSubEl.textContent =
    summary.income > 0
      ? `Net savings rate: ${summary.savingsRate.toFixed(1)}%`
      : 'Add income to track savings rate';

  if (savingsBarEl) {
    const clampedPct = Math.max(0, Math.min(100, summary.savingsRate));
    savingsBarEl.style.width = `${clampedPct}%`;
  }

  incomeEl.textContent = formatINR(summary.income);
  incomeSubEl.textContent = `${summary.incomeCount} income ${summary.incomeCount === 1 ? 'entry' : 'entries'}`;

  expenseEl.textContent = formatINR(summary.expense);
  expenseSubEl.textContent =
    summary.income > 0
      ? `${summary.expenseRatio.toFixed(1)}% of total income spent`
      : `${summary.expenseCount} expense ${summary.expenseCount === 1 ? 'entry' : 'entries'}`;

  countEl.textContent = String(summary.totalCount);
  countSubEl.textContent = `${summary.incomeCount} income · ${summary.expenseCount} expenses`;
}

// Renders responsive fintech transaction cards (clean aligned grid on desktop, card layout on mobile)
function buildTransactionListHTML(transactions, emptyConfig) {
  if (!transactions.length) {
    return `
      <div class="empty-state">
        <span class="empty-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
          </svg>
        </span>
        <p class="empty-title">${escapeHTML(emptyConfig.title)}</p>
        <p class="empty-desc">${escapeHTML(emptyConfig.description)}</p>
        <div class="empty-actions">
          ${emptyConfig.actionsHTML}
        </div>
      </div>
    `;
  }

  const cardsHTML = transactions
    .map((tx) => {
      const isIncome = tx.type === 'income';
      const signedAmount = `${isIncome ? '+' : '-'}${formatINR(tx.amount)}`;
      const typeText = isIncome ? 'Income' : 'Expense';
      const displayDate = formatDisplayDate(tx.date);
      const noteHTML = tx.note
        ? `<div class="tx-desc-note">${escapeHTML(tx.note)}</div>`
        : '';

      return `
        <article class="tx-card">
          <div class="tx-main">
            <span class="tx-cat-icon ${isIncome ? 'income' : 'expense'}" aria-hidden="true">
              ${getCategoryIconSVG(tx.category, 17)}
            </span>
            <div class="tx-details">
              <div class="tx-desc-primary">${escapeHTML(tx.description)}</div>
              ${noteHTML}
              <div class="tx-mobile-meta">${escapeHTML(tx.category)} · ${displayDate}</div>
            </div>
          </div>

          <div class="tx-col-cat">${escapeHTML(tx.category)}</div>

          <div class="tx-col-date tabular-nums">${displayDate}</div>

          <div class="tx-col-amount">
            <span class="tx-amount tabular-nums ${isIncome ? 'income' : 'expense'}">${signedAmount}</span>
            <span class="tx-type-caption ${isIncome ? 'income' : ''}">${typeText}</span>
          </div>

          <div class="tx-col-actions">
            <button type="button" class="action-link" data-edit-id="${escapeHTML(tx.id)}" aria-label="Edit ${escapeHTML(tx.description)}">
              ${EDIT_ICON_SVG}
              <span>Edit</span>
            </button>
            <button type="button" class="action-link delete" data-delete-id="${escapeHTML(tx.id)}" aria-label="Delete ${escapeHTML(tx.description)}">
              ${DELETE_ICON_SVG}
              <span>Delete</span>
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <div class="tx-list" role="region" aria-label="Transaction records">
      <div class="tx-list-header" aria-hidden="true">
        <span>Transaction</span>
        <span>Category</span>
        <span>Date</span>
        <span class="col-right">Amount (INR)</span>
        <span class="col-right">Actions</span>
      </div>
      ${cardsHTML}
    </div>
  `;
}

function wireTableActionButtons(containerEl) {
  containerEl.querySelectorAll('[data-edit-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openEditTransactionModal(btn.dataset.editId);
    });
  });

  containerEl.querySelectorAll('[data-delete-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      requestDeleteTransaction(btn.dataset.deleteId);
    });
  });

  containerEl.querySelectorAll('[data-empty-add]').forEach((btn) => {
    btn.addEventListener('click', () => openAddTransactionModal());
  });

  containerEl.querySelectorAll('[data-empty-demo]').forEach((btn) => {
    btn.addEventListener('click', () => loadDemoDataDirect());
  });

  containerEl.querySelectorAll('[data-empty-reset]').forEach((btn) => {
    btn.addEventListener('click', () => resetLedgerFilters());
  });
}

function renderOverview(periodTransactions) {
  const series = computeMonthlySeries(state.transactions, 6);
  const breakdown = computeCategoryBreakdown(periodTransactions);

  renderIncomeVsExpenseBarChart(document.getElementById('overview-bar-chart'), series);
  renderExpenseDonutChart(
    document.getElementById('overview-donut-chart'),
    document.getElementById('overview-category-list'),
    breakdown
  );

  const periodLabel =
    state.selectedMonth === 'all' ? 'all months' : formatMonthLabel(state.selectedMonth);
  document.getElementById('overview-donut-subtitle').textContent =
    `Spending share for ${periodLabel}`;
  document.getElementById('recent-subtitle').textContent =
    `Latest transactions for ${periodLabel}`;

  const recent = [...periodTransactions]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .slice(0, 6);

  const recentContainer = document.getElementById('overview-recent-container');
  recentContainer.innerHTML = buildTransactionListHTML(recent, {
    title: 'No transactions yet',
    description:
      'Record your first income or expense in Indian Rupees, or load demo data to explore analytics.',
    actionsHTML: `
      <button type="button" class="btn btn-primary" data-empty-add>Add Transaction</button>
      <button type="button" class="btn btn-secondary" data-empty-demo>Load Demo Data</button>
    `,
  });
  wireTableActionButtons(recentContainer);
}

function renderCategoryFilterDropdown() {
  const selectEl = document.getElementById('filter-category');
  let categories = [];

  if (state.filters.type === 'income') {
    categories = INCOME_CATEGORIES;
  } else if (state.filters.type === 'expense') {
    categories = EXPENSE_CATEGORIES;
  } else {
    categories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  }

  if (state.filters.category !== 'all' && !categories.includes(state.filters.category)) {
    state.filters.category = 'all';
  }

  selectEl.innerHTML = [
    `<option value="all"${state.filters.category === 'all' ? ' selected' : ''}>All Categories</option>`,
    ...categories.map(
      (cat) =>
        `<option value="${escapeHTML(cat)}"${state.filters.category === cat ? ' selected' : ''}>${escapeHTML(cat)}</option>`
    ),
  ].join('');
}

function renderTransactionsLedger() {
  renderCategoryFilterDropdown();

  document.getElementById('filter-search').value = state.filters.search;
  document.getElementById('filter-sort').value = state.filters.sort;
  document.querySelectorAll('[data-type-filter]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.typeFilter === state.filters.type);
  });

  const hasActiveFilter =
    state.filters.search.trim() !== '' ||
    state.filters.type !== 'all' ||
    state.filters.category !== 'all' ||
    state.filters.sort !== 'date-desc';
  document.getElementById('btn-reset-filters').hidden = !hasActiveFilter;

  const filtered = getFilteredLedgerTransactions();
  const summary = computeSummary(filtered);

  const periodLabel =
    state.selectedMonth === 'all' ? 'All Months' : formatMonthLabel(state.selectedMonth);

  document.getElementById('ledger-count-summary').textContent =
    `${periodLabel} · ${filtered.length} ${filtered.length === 1 ? 'transaction' : 'transactions'}`;

  document.getElementById('filtered-meta-text').textContent =
    `${filtered.length} matching · Income ${formatINR(summary.income)} · Expenses ${formatINR(summary.expense)}`;
  document.getElementById('filtered-net-text').textContent =
    `Net: ${summary.balance >= 0 ? '+' : '-'}${formatINR(Math.abs(summary.balance))}`;

  const tableContainer = document.getElementById('transactions-table-container');
  tableContainer.innerHTML = buildTransactionListHTML(filtered, {
    title: hasActiveFilter ? 'No matching transactions' : 'Your ledger is empty',
    description: hasActiveFilter
      ? 'Try clearing or adjusting your search query, type, or category filters.'
      : 'Start tracking your finances by adding a new transaction.',
    actionsHTML: hasActiveFilter
      ? `<button type="button" class="btn btn-secondary" data-empty-reset>Reset Filters</button>`
      : `
        <button type="button" class="btn btn-primary" data-empty-add>Add Transaction</button>
        <button type="button" class="btn btn-secondary" data-empty-demo>Load Demo Data</button>
      `,
  });
  wireTableActionButtons(tableContainer);
}

function renderAnalytics(periodTransactions) {
  const summary = computeSummary(periodTransactions);
  const breakdown = computeCategoryBreakdown(periodTransactions);
  const series = computeMonthlySeries(state.transactions, 6);

  const savingsEl = document.getElementById('analytics-savings-rate');
  const savingsBarEl = document.getElementById('analytics-savings-bar');
  savingsEl.textContent = `${summary.savingsRate.toFixed(1)}%`;
  savingsEl.classList.toggle('kpi-positive', summary.savingsRate > 0);
  savingsEl.classList.toggle('kpi-negative', summary.savingsRate < 0);
  document.getElementById('analytics-savings-desc').textContent =
    summary.income > 0
      ? `${formatINR(summary.balance)} net retained from ${formatINR(summary.income)}`
      : 'Add income records to compute savings rate';
  if (savingsBarEl) {
    savingsBarEl.style.width = `${Math.max(0, Math.min(100, summary.savingsRate))}%`;
  }

  const topCat = breakdown.rows[0];
  document.getElementById('analytics-top-category').textContent = topCat ? topCat.category : '—';
  document.getElementById('analytics-top-category-sub').textContent = topCat
    ? `${formatINR(topCat.amount)} · ${topCat.percent.toFixed(1)}% of expenses`
    : 'No expenses recorded in this period';

  const avgExpense =
    summary.expenseCount > 0 ? summary.expense / summary.expenseCount : 0;
  document.getElementById('analytics-avg-expense').textContent = formatINR(avgExpense);
  document.getElementById('analytics-avg-expense-sub').textContent =
    `Across ${summary.expenseCount} expense ${summary.expenseCount === 1 ? 'transaction' : 'transactions'}`;

  renderIncomeVsExpenseBarChart(document.getElementById('analytics-bar-chart'), series);

  // Category-wise Expense Breakdown
  const catContainer = document.getElementById('analytics-category-breakdown');
  if (!breakdown.rows.length) {
    catContainer.innerHTML = `
      <div class="empty-state">
        <p class="empty-title">No expense categories yet</p>
        <p class="empty-desc">Once you log expenses, your category breakdown will appear here.</p>
      </div>
    `;
  } else {
    catContainer.innerHTML = `
      <div class="breakdown-list">
        ${breakdown.rows
          .map(
            (item) => `
          <button type="button" class="breakdown-item" data-analytics-cat="${escapeHTML(item.category)}">
            <div class="breakdown-top">
              <div class="breakdown-title-wrap">
                <span class="breakdown-cat-icon" aria-hidden="true">${getCategoryIconSVG(item.category, 15)}</span>
                <span class="breakdown-name">${escapeHTML(item.category)}</span>
                <span class="breakdown-count">· ${item.count} ${item.count === 1 ? 'item' : 'items'}</span>
              </div>
              <div class="breakdown-figures tabular-nums">
                <strong>${formatINR(item.amount)}</strong>
                <span class="cat-pct-text">${item.percent.toFixed(1)}%</span>
              </div>
            </div>
            <div class="breakdown-bar-track">
              <div class="breakdown-bar-fill" style="width: ${Math.max(2, item.percent)}%; background-color: ${item.color};"></div>
            </div>
          </button>
        `
          )
          .join('')}
      </div>
    `;

    catContainer.querySelectorAll('[data-analytics-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        jumpToCategoryFilter(btn.dataset.analyticsCat);
      });
    });
  }

  // Monthly Performance Table
  const monthlyContainer = document.getElementById('analytics-monthly-table');
  const allMonthsSeries = computeMonthlySeries(state.transactions, 12).reverse();
  if (!allMonthsSeries.length) {
    monthlyContainer.innerHTML = `
      <div class="empty-state">
        <p class="empty-title">No monthly history yet</p>
        <p class="empty-desc">Monthly income, expense, and net surplus rows will populate automatically.</p>
      </div>
    `;
  } else {
    monthlyContainer.innerHTML = `
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th class="col-right">Income</th>
              <th class="col-right">Expenses</th>
              <th class="col-right">Net</th>
            </tr>
          </thead>
          <tbody>
            ${allMonthsSeries
              .map(
                (m) => `
              <tr>
                <td class="tx-desc-primary">${escapeHTML(m.fullLabel)}</td>
                <td class="col-right tabular-nums tx-type-income">${formatINR(m.income)}</td>
                <td class="col-right tabular-nums">${formatINR(m.expense)}</td>
                <td class="col-right tabular-nums tx-amount ${m.net >= 0 ? 'income' : 'expense'}">
                  ${m.net >= 0 ? '+' : '-'}${formatINR(Math.abs(m.net))}
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

function renderApp() {
  renderMonthSelector();
  const periodTransactions = getPeriodTransactions();
  renderKPIs(periodTransactions);

  document.querySelectorAll('.view-section').forEach((section) => {
    const isTarget = section.id === `view-${state.activeView}`;
    section.hidden = !isTarget;
    section.classList.toggle('active', isTarget);
  });

  document.querySelectorAll('.nav-item').forEach((btn) => {
    const isActive = btn.dataset.view === state.activeView;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });
  document.getElementById('page-title').textContent =
    VIEW_TITLES[state.activeView] || 'Overview';

  if (state.activeView === 'overview') {
    renderOverview(periodTransactions);
  } else if (state.activeView === 'transactions') {
    renderTransactionsLedger();
  } else if (state.activeView === 'analytics') {
    renderAnalytics(periodTransactions);
  }
}

function setActiveView(viewName) {
  if (!VIEW_TITLES[viewName]) return;
  state.activeView = viewName;
  closeMobileSidebar();
  renderApp();
}

// --------------------------------------------------------------------------
// 9. Add / Edit Transaction Modal & Input Validation
// --------------------------------------------------------------------------

const txModalEl = document.getElementById('transaction-modal');
const txFormEl = document.getElementById('transaction-form');
const txIdInput = document.getElementById('tx-id');
const txDescInput = document.getElementById('tx-description');
const txAmountInput = document.getElementById('tx-amount');
const txDateInput = document.getElementById('tx-date');
const txCategorySelect = document.getElementById('tx-category');
const txNoteInput = document.getElementById('tx-note');

function populateFormCategories(type, selectedCategory = '') {
  const list = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  txCategorySelect.innerHTML = [
    `<option value="">Select a category</option>`,
    ...list.map(
      (cat) =>
        `<option value="${escapeHTML(cat)}"${cat === selectedCategory ? ' selected' : ''}>${escapeHTML(cat)}</option>`
    ),
  ].join('');
}

function setFormTransactionType(type, keepCategory = '') {
  state.formType = type === 'income' ? 'income' : 'expense';
  document.getElementById('type-btn-expense').classList.toggle('active', state.formType === 'expense');
  document.getElementById('type-btn-income').classList.toggle('active', state.formType === 'income');
  populateFormCategories(state.formType, keepCategory);
  clearFieldError('category');
}

function clearAllFormErrors() {
  ['description', 'amount', 'date', 'category'].forEach(clearFieldError);
}

function setFieldError(field, message) {
  const errEl = document.getElementById(`error-${field}`);
  const inputEl = document.getElementById(`tx-${field}`);
  if (errEl) errEl.textContent = message;
  if (inputEl) inputEl.classList.add('is-invalid');
}

function clearFieldError(field) {
  const errEl = document.getElementById(`error-${field}`);
  const inputEl = document.getElementById(`tx-${field}`);
  if (errEl) errEl.textContent = '';
  if (inputEl) inputEl.classList.remove('is-invalid');
}

function validateTransactionForm() {
  clearAllFormErrors();
  let isValid = true;

  const description = txDescInput.value.trim();
  const amountVal = parseFloat(txAmountInput.value);
  const dateVal = txDateInput.value.trim();
  const categoryVal = txCategorySelect.value;

  if (!description) {
    setFieldError('description', 'Please enter a transaction description.');
    isValid = false;
  } else if (description.length < 2) {
    setFieldError('description', 'Description must be at least 2 characters.');
    isValid = false;
  } else if (description.length > 80) {
    setFieldError('description', 'Description cannot exceed 80 characters.');
    isValid = false;
  }

  if (txAmountInput.value.trim() === '' || !Number.isFinite(amountVal)) {
    setFieldError('amount', 'Please enter a valid amount in INR.');
    isValid = false;
  } else if (amountVal <= 0) {
    setFieldError('amount', 'Amount must be greater than ₹0.');
    isValid = false;
  } else if (amountVal > 999999999) {
    setFieldError('amount', 'Amount is too large. Enter a realistic figure.');
    isValid = false;
  }

  if (!dateVal || !/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
    setFieldError('date', 'Please choose a valid transaction date.');
    isValid = false;
  } else {
    const [y, m, d] = dateVal.split('-').map(Number);
    const parsed = new Date(y, m - 1, d);
    if (
      parsed.getFullYear() !== y ||
      parsed.getMonth() !== m - 1 ||
      parsed.getDate() !== d
    ) {
      setFieldError('date', 'The selected date is not valid.');
      isValid = false;
    }
  }

  const allowedCategories =
    state.formType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  if (!categoryVal || !allowedCategories.includes(categoryVal)) {
    setFieldError('category', 'Please select a category.');
    isValid = false;
  }

  return isValid
    ? {
        type: state.formType,
        description,
        amount: Math.round(amountVal * 100) / 100,
        date: dateVal,
        category: categoryVal,
        note: txNoteInput.value.trim(),
      }
    : null;
}

function openAddTransactionModal() {
  clearAllFormErrors();
  txIdInput.value = '';
  txDescInput.value = '';
  txAmountInput.value = '';
  txDateInput.value = getTodayISO();
  txNoteInput.value = '';
  setFormTransactionType('expense');

  document.getElementById('modal-title').textContent = 'Add Transaction';
  document.getElementById('btn-submit-tx').textContent = 'Add Transaction';

  txModalEl.hidden = false;
  txDescInput.focus();
}

function openEditTransactionModal(id) {
  const existing = state.transactions.find((tx) => tx.id === id);
  if (!existing) {
    showToast('Not found', 'That transaction could not be found.', 'error');
    return;
  }

  clearAllFormErrors();
  txIdInput.value = existing.id;
  txDescInput.value = existing.description;
  txAmountInput.value = String(existing.amount);
  txDateInput.value = existing.date;
  txNoteInput.value = existing.note || '';
  setFormTransactionType(existing.type, existing.category);

  document.getElementById('modal-title').textContent = 'Edit Transaction';
  document.getElementById('btn-submit-tx').textContent = 'Save Changes';

  txModalEl.hidden = false;
  txDescInput.focus();
}

function closeTransactionModal() {
  txModalEl.hidden = true;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const payload = validateTransactionForm();
  if (!payload) {
    showToast('Validation error', 'Please check the highlighted form fields.', 'error');
    return;
  }

  const editId = txIdInput.value;
  if (editId) {
    const idx = state.transactions.findIndex((tx) => tx.id === editId);
    if (idx !== -1) {
      state.transactions[idx] = { id: editId, ...payload };
      saveToStorage();
      closeTransactionModal();
      renderApp();
      showToast('Transaction updated', `${payload.description} (${formatINR(payload.amount)}) saved.`, 'success');
    }
  } else {
    const newTx = { id: generateId(), ...payload };
    state.transactions.unshift(newTx);
    const txMonth = getMonthKey(payload.date);
    if (state.selectedMonth !== 'all' && state.selectedMonth !== txMonth) {
      state.selectedMonth = txMonth;
    }
    saveToStorage();
    closeTransactionModal();
    renderApp();
    showToast('Transaction added', `${payload.description} (${formatINR(payload.amount)}) recorded.`, 'success');
  }
}

// --------------------------------------------------------------------------
// 10. Custom Confirmation Modal (Delete, Clear All, Load Demo)
// --------------------------------------------------------------------------

const confirmModalEl = document.getElementById('confirm-modal');

function openConfirmDialog({ title, message, confirmLabel, isDanger = true, onConfirm }) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;
  const acceptBtn = document.getElementById('btn-accept-confirm');
  acceptBtn.textContent = confirmLabel;
  acceptBtn.className = isDanger ? 'btn btn-danger' : 'btn btn-primary';
  state.pendingConfirmAction = onConfirm;
  confirmModalEl.hidden = false;
  acceptBtn.focus();
}

function closeConfirmDialog() {
  confirmModalEl.hidden = true;
  state.pendingConfirmAction = null;
}

function requestDeleteTransaction(id) {
  const tx = state.transactions.find((item) => item.id === id);
  if (!tx) return;

  openConfirmDialog({
    title: 'Delete Transaction',
    message: `Are you sure you want to delete "${tx.description}" (${formatINR(tx.amount)})? This action cannot be undone.`,
    confirmLabel: 'Delete',
    isDanger: true,
    onConfirm: () => {
      state.transactions = state.transactions.filter((item) => item.id !== id);
      saveToStorage();
      renderApp();
      showToast('Transaction deleted', `"${tx.description}" was removed.`, 'info');
    },
  });
}

function loadDemoDataDirect() {
  state.transactions = createDemoTransactions();
  state.selectedMonth = 'all';
  resetLedgerFilters(false);
  saveToStorage();
  renderApp();
  showToast('Demo data loaded', `Loaded ${state.transactions.length} sample INR transactions.`, 'success');
}

function requestLoadDemoData() {
  if (state.transactions.length === 0) {
    loadDemoDataDirect();
    return;
  }

  openConfirmDialog({
    title: 'Load Demo Data',
    message:
      'Loading demo data will replace your current transactions with 38 realistic Indian Rupee sample entries across 6 months.',
    confirmLabel: 'Load Demo Data',
    isDanger: false,
    onConfirm: loadDemoDataDirect,
  });
}

function requestClearAllData() {
  if (state.transactions.length === 0) {
    showToast('Already empty', 'There are no transactions to clear.', 'info');
    return;
  }

  openConfirmDialog({
    title: 'Clear All Data',
    message: `This will permanently delete all ${state.transactions.length} transactions stored in your browser. Are you sure?`,
    confirmLabel: 'Clear Everything',
    isDanger: true,
    onConfirm: () => {
      state.transactions = [];
      state.selectedMonth = 'all';
      resetLedgerFilters(false);
      saveToStorage();
      renderApp();
      showToast('Data cleared', 'All transactions were permanently removed.', 'info');
    },
  });
}

// --------------------------------------------------------------------------
// 11. CSV Export & Filter Reset
// --------------------------------------------------------------------------

function exportTransactionsCSV() {
  const rows =
    state.activeView === 'transactions'
      ? getFilteredLedgerTransactions()
      : getPeriodTransactions();

  if (!rows.length) {
    showToast('Nothing to export', 'Add transactions before exporting a CSV file.', 'error');
    return;
  }

  const header = ['Date', 'Type', 'Description', 'Category', 'Amount (INR)', 'Note'];
  const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

  const lines = [
    header.join(','),
    ...rows.map((tx) =>
      [
        tx.date,
        tx.type === 'income' ? 'Income' : 'Expense',
        tx.description,
        tx.category,
        tx.amount.toFixed(2),
        tx.note || '',
      ]
        .map(csvEscape)
        .join(',')
    ),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `spendwise-transactions-${getTodayISO()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('CSV exported', `Downloaded ${rows.length} transactions.`, 'success');
}

function resetLedgerFilters(shouldRender = true) {
  state.filters.search = '';
  state.filters.type = 'all';
  state.filters.category = 'all';
  state.filters.sort = 'date-desc';
  if (shouldRender) {
    renderApp();
  }
}

// --------------------------------------------------------------------------
// 12. Toast Notification System
// --------------------------------------------------------------------------

function getToastIconSVG(variant) {
  if (variant === 'success') {
    return '<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  }
  if (variant === 'error') {
    return '<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
  }
  return '<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
}

function showToast(title, message, variant = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${variant}`;
  toast.setAttribute('role', 'status');

  toast.innerHTML = `
    <div class="toast-leading">
      ${getToastIconSVG(variant)}
      <div class="toast-body">
        <span class="toast-label">${escapeHTML(title)}</span>
        <span class="toast-msg">${escapeHTML(message)}</span>
      </div>
    </div>
    <button type="button" class="toast-close" aria-label="Dismiss notification">&times;</button>
  `;

  const removeToast = () => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  };

  toast.querySelector('.toast-close').addEventListener('click', removeToast);
  container.appendChild(toast);
  window.setTimeout(removeToast, 3600);
}

// --------------------------------------------------------------------------
// 13. Mobile Sidebar Drawer Controls
// --------------------------------------------------------------------------

const sidebarEl = document.getElementById('sidebar');
const sidebarBackdropEl = document.getElementById('sidebar-backdrop');

function openMobileSidebar() {
  sidebarEl.classList.add('open');
  sidebarBackdropEl.classList.add('open');
}

function closeMobileSidebar() {
  sidebarEl.classList.remove('open');
  sidebarBackdropEl.classList.remove('open');
}

// --------------------------------------------------------------------------
// 14. Event Wiring & Initialization
// --------------------------------------------------------------------------

function bindEvents() {
  // Sidebar navigation
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => setActiveView(btn.dataset.view));
  });

  document.querySelector('.brand-link').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveView('overview');
  });

  // Jump-to-view links inside cards
  document.querySelectorAll('[data-jump-view]').forEach((btn) => {
    btn.addEventListener('click', () => setActiveView(btn.dataset.jumpView));
  });

  // Mobile sidebar open/close
  document.getElementById('open-sidebar-btn').addEventListener('click', openMobileSidebar);
  document.getElementById('close-sidebar-btn').addEventListener('click', closeMobileSidebar);
  sidebarBackdropEl.addEventListener('click', closeMobileSidebar);

  // Top bar global month filter
  document.getElementById('global-month-select').addEventListener('change', (e) => {
    state.selectedMonth = e.target.value;
    renderApp();
  });

  // Top bar primary CTA
  document.getElementById('btn-open-add-modal').addEventListener('click', openAddTransactionModal);

  // Sidebar data actions
  document.getElementById('btn-export-csv').addEventListener('click', exportTransactionsCSV);
  document.getElementById('btn-load-demo').addEventListener('click', requestLoadDemoData);
  document.getElementById('btn-clear-all').addEventListener('click', requestClearAllData);

  // Ledger filters
  document.querySelectorAll('[data-type-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.filters.type = btn.dataset.typeFilter;
      renderTransactionsLedger();
    });
  });

  document.getElementById('filter-search').addEventListener('input', (e) => {
    state.filters.search = e.target.value;
    renderTransactionsLedger();
  });

  document.getElementById('filter-category').addEventListener('change', (e) => {
    state.filters.category = e.target.value;
    renderTransactionsLedger();
  });

  document.getElementById('filter-sort').addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    renderTransactionsLedger();
  });

  document.getElementById('btn-reset-filters').addEventListener('click', () => {
    resetLedgerFilters(true);
  });

  // Add / Edit Transaction modal events
  document.getElementById('type-btn-expense').addEventListener('click', () => {
    setFormTransactionType('expense');
  });
  document.getElementById('type-btn-income').addEventListener('click', () => {
    setFormTransactionType('income');
  });

  txDescInput.addEventListener('input', () => clearFieldError('description'));
  txAmountInput.addEventListener('input', () => clearFieldError('amount'));
  txDateInput.addEventListener('change', () => clearFieldError('date'));
  txCategorySelect.addEventListener('change', () => clearFieldError('category'));

  txFormEl.addEventListener('submit', handleFormSubmit);
  document.getElementById('btn-close-modal').addEventListener('click', closeTransactionModal);
  document.getElementById('btn-cancel-modal').addEventListener('click', closeTransactionModal);
  txModalEl.addEventListener('click', (e) => {
    if (e.target === txModalEl) closeTransactionModal();
  });

  // Confirmation modal events
  document.getElementById('btn-close-confirm').addEventListener('click', closeConfirmDialog);
  document.getElementById('btn-cancel-confirm').addEventListener('click', closeConfirmDialog);
  document.getElementById('btn-accept-confirm').addEventListener('click', () => {
    const action = state.pendingConfirmAction;
    closeConfirmDialog();
    if (typeof action === 'function') {
      action();
    }
  });
  confirmModalEl.addEventListener('click', (e) => {
    if (e.target === confirmModalEl) closeConfirmDialog();
  });

  // Keyboard Escape closes open modals or mobile sidebar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!confirmModalEl.hidden) {
        closeConfirmDialog();
      } else if (!txModalEl.hidden) {
        closeTransactionModal();
      } else if (sidebarEl.classList.contains('open')) {
        closeMobileSidebar();
      }
    }
  });
}

function initSpendWise() {
  loadFromStorage();
  bindEvents();
  renderApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpendWise);
} else {
  initSpendWise();
}
