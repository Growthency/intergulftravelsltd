import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    // Hub / page meta
    metaTitle: 'Reports & Export',
    hubTitle: 'Reports & Export',
    hubSubtitle:
      'Accounting statements for Inter Gulf Travels. Open a report, set the dates, then export to Excel, PDF or print.',

    // Report names & descriptions
    trialBalanceTitle: 'Trial Balance',
    trialBalanceDesc: 'Every active head with its debit / credit balance. Totals must agree.',
    dayBookTitle: 'Day Book',
    dayBookDesc: 'All vouchers posted on a chosen day, with particulars and amounts.',
    incomeExpenseTitle: 'Income & Expense',
    incomeExpenseDesc: 'Profit & loss for a date range — income heads against expense heads.',
    balanceSheetTitle: 'Balance Sheet',
    balanceSheetDesc: 'Assets against liabilities and equity as of a date.',
    dueAgingTitle: 'Due / Aging',
    dueAgingDesc: 'Customers carrying an outstanding balance, largest due first.',

    // Nav / common
    allReports: 'All reports',
    allBranches: 'All branches',
    balanced: 'Balanced',
    outOfBalance: 'Out of balance',

    // Account type labels (keyed by enum)
    typeAsset: 'Asset',
    typeLiability: 'Liability',
    typeIncome: 'Income',
    typeExpense: 'Expense',
    typeEquity: 'Equity',

    // Trial Balance
    tbEmptyTitle: 'No balances to show',
    tbEmptyHint:
      'Once account heads carry opening balances or posted vouchers, the trial balance will appear here.',
    tbExportTitle: 'Trial Balance',
    thCode: 'Code',
    thAccountHead: 'Account Head',
    thType: 'Type',
    thDebit: 'Debit',
    thCredit: 'Credit',
    total: 'Total',
    asOf: 'as of',

    // Day Book
    dbEmptyTitle: 'No vouchers on this day',
    dbEmptyHint: 'No transactions were posted on {date} for {branch}.',
    dbExportTitle: 'Day Book',
    voucherCountOne: 'voucher',
    voucherCountMany: 'vouchers',
    thVoucher: 'Voucher',
    thDrAccount: 'Dr — Account',
    thCrAccount: 'Cr — Account',
    thNarration: 'Narration',
    thAmount: 'Amount',
    totalForDay: 'Total for the day',

    // Income & Expense
    ieEmptyTitle: 'No income or expenses in this period',
    ieEmptyHint: 'Nothing was posted between {from} and {to} for {branch}.',
    ieExportTitle: 'Income & Expense Statement',
    income: 'Income',
    expense: 'Expense',
    noIncomeRecorded: 'No income recorded.',
    noExpenseRecorded: 'No expense recorded.',
    netProfit: 'Net Profit',
    netLoss: 'Net Loss',

    // Balance Sheet
    bsEmptyTitle: 'Nothing on the balance sheet yet',
    bsEmptyHint:
      'Asset, liability and equity balances will appear here once vouchers are posted.',
    bsExportTitle: 'Balance Sheet',
    assets: 'Assets',
    liabilitiesAndEquity: 'Liabilities & Equity',
    retainedProfit: 'Retained earnings (profit)',
    retainedLoss: 'Retained earnings (loss)',
    noLiabEquityRecorded: 'No liabilities or equity recorded.',
    noAssetsRecorded: 'No assets recorded.',

    // Due / Aging
    dueEmptyTitle: 'No outstanding dues',
    dueEmptyHint: 'Customers with a remaining balance will be listed here, largest due first.',
    dueExportTitle: 'Customer Dues / Aging',
    thCustomer: 'Customer',
    thPhone: 'Phone',
    thBranch: 'Branch',
    thDue: 'Due',
    customerCountOne: 'customer',
    customerCountMany: 'customers',
    totalDue: 'total due',
    totalOutstanding: 'Total outstanding',

    // Filters
    filterDate: 'Date',
    filterAsOfDate: 'As of date',
    filterFrom: 'From',
    filterTo: 'To',
    filterBranch: 'Branch',
  },
  bn: {
    // Hub / page meta
    metaTitle: 'রিপোর্ট ও এক্সপোর্ট',
    hubTitle: 'রিপোর্ট ও এক্সপোর্ট',
    hubSubtitle:
      'ইন্টার গালফ ট্রাভেলস-এর হিসাব বিবরণী। একটি রিপোর্ট খুলুন, তারিখ নির্ধারণ করুন, তারপর এক্সেল, পিডিএফ বা প্রিন্টে এক্সপোর্ট করুন।',

    // Report names & descriptions
    trialBalanceTitle: 'ট্রায়াল ব্যালেন্স',
    trialBalanceDesc: 'প্রতিটি সক্রিয় হিসাব খাত তার ডেবিট / ক্রেডিট ব্যালেন্স সহ। মোট অবশ্যই মিলতে হবে।',
    dayBookTitle: 'দিনলিপি',
    dayBookDesc: 'নির্বাচিত একটি দিনে পোস্ট হওয়া সব ভাউচার, বিবরণ ও পরিমাণসহ।',
    incomeExpenseTitle: 'আয় ও ব্যয়',
    incomeExpenseDesc: 'একটি তারিখ পরিসরের লাভ-ক্ষতি — আয় খাতের বিপরীতে ব্যয় খাত।',
    balanceSheetTitle: 'ব্যালেন্স শিট',
    balanceSheetDesc: 'একটি তারিখ অনুযায়ী সম্পদের বিপরীতে দায় ও মূলধন।',
    dueAgingTitle: 'বকেয়া / এজিং',
    dueAgingDesc: 'বকেয়া ব্যালেন্স বহনকারী গ্রাহকরা, সবচেয়ে বেশি বকেয়া আগে।',

    // Nav / common
    allReports: 'সব রিপোর্ট',
    allBranches: 'সব শাখা',
    balanced: 'সমতাপূর্ণ',
    outOfBalance: 'সমতাহীন',

    // Account type labels (keyed by enum)
    typeAsset: 'সম্পদ',
    typeLiability: 'দায়',
    typeIncome: 'আয়',
    typeExpense: 'ব্যয়',
    typeEquity: 'মূলধন',

    // Trial Balance
    tbEmptyTitle: 'দেখানোর মতো কোনো ব্যালেন্স নেই',
    tbEmptyHint:
      'হিসাব খাতগুলোতে প্রারম্ভিক ব্যালেন্স বা পোস্ট করা ভাউচার এলে এখানে ট্রায়াল ব্যালেন্স দেখা যাবে।',
    tbExportTitle: 'ট্রায়াল ব্যালেন্স',
    thCode: 'কোড',
    thAccountHead: 'হিসাব খাত',
    thType: 'ধরন',
    thDebit: 'ডেবিট',
    thCredit: 'ক্রেডিট',
    total: 'মোট',
    asOf: 'তারিখ অনুযায়ী',

    // Day Book
    dbEmptyTitle: 'এই দিনে কোনো ভাউচার নেই',
    dbEmptyHint: '{branch}-এর জন্য {date} তারিখে কোনো লেনদেন পোস্ট করা হয়নি।',
    dbExportTitle: 'দিনলিপি',
    voucherCountOne: 'ভাউচার',
    voucherCountMany: 'ভাউচার',
    thVoucher: 'ভাউচার',
    thDrAccount: 'ডেবিট — হিসাব',
    thCrAccount: 'ক্রেডিট — হিসাব',
    thNarration: 'বিবরণ',
    thAmount: 'পরিমাণ',
    totalForDay: 'দিনের মোট',

    // Income & Expense
    ieEmptyTitle: 'এই সময়কালে কোনো আয় বা ব্যয় নেই',
    ieEmptyHint: '{branch}-এর জন্য {from} থেকে {to}-এর মধ্যে কিছু পোস্ট করা হয়নি।',
    ieExportTitle: 'আয় ও ব্যয় বিবরণী',
    income: 'আয়',
    expense: 'ব্যয়',
    noIncomeRecorded: 'কোনো আয় লিপিবদ্ধ নেই।',
    noExpenseRecorded: 'কোনো ব্যয় লিপিবদ্ধ নেই।',
    netProfit: 'নিট মুনাফা',
    netLoss: 'নিট ক্ষতি',

    // Balance Sheet
    bsEmptyTitle: 'এখনও ব্যালেন্স শিটে কিছু নেই',
    bsEmptyHint: 'ভাউচার পোস্ট হলে এখানে সম্পদ, দায় ও মূলধনের ব্যালেন্স দেখা যাবে।',
    bsExportTitle: 'ব্যালেন্স শিট',
    assets: 'সম্পদ',
    liabilitiesAndEquity: 'দায় ও মূলধন',
    retainedProfit: 'সঞ্চিত মুনাফা (লাভ)',
    retainedLoss: 'সঞ্চিত মুনাফা (ক্ষতি)',
    noLiabEquityRecorded: 'কোনো দায় বা মূলধন লিপিবদ্ধ নেই।',
    noAssetsRecorded: 'কোনো সম্পদ লিপিবদ্ধ নেই।',

    // Due / Aging
    dueEmptyTitle: 'কোনো বকেয়া নেই',
    dueEmptyHint: 'অবশিষ্ট ব্যালেন্সধারী গ্রাহকরা এখানে তালিকাভুক্ত হবে, সবচেয়ে বেশি বকেয়া আগে।',
    dueExportTitle: 'গ্রাহক বকেয়া / এজিং',
    thCustomer: 'গ্রাহক',
    thPhone: 'ফোন',
    thBranch: 'শাখা',
    thDue: 'বকেয়া',
    customerCountOne: 'গ্রাহক',
    customerCountMany: 'গ্রাহক',
    totalDue: 'মোট বকেয়া',
    totalOutstanding: 'মোট বকেয়া',

    // Filters
    filterDate: 'তারিখ',
    filterAsOfDate: 'যে তারিখ অনুযায়ী',
    filterFrom: 'থেকে',
    filterTo: 'পর্যন্ত',
    filterBranch: 'শাখা',
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
